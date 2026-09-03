import { Router } from 'express';
import { prisma } from '../db.js';
import { socketService } from '../services/socketService.js';
import { NotificationService } from '../services/notificationService.js';

export const emergencyRouter = Router();

// GET /api/emergency/active
emergencyRouter.get('/active', async (req, res) => {
  try {
    const activeAlert = await prisma.emergencyAlert.findFirst({
      where: { status: 'ACTIVE' },
      include: { acknowledgements: true, resident: true },
      orderBy: { createdAt: 'desc' }
    });
    return res.json({ success: true, data: activeAlert || null });
  } catch (error) {
    console.error('Error getting active emergency:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST /api/emergency/alert
emergencyRouter.post('/alert', async (req, res) => {
  try {
    const { type = 'sos', residentName, room, block, medicalConditions } = req.body;
    let resident = await prisma.resident.findFirst({
      orderBy: { createdAt: 'desc' }
    });

    if (!resident) {
      resident = await prisma.resident.create({
        data: {
          nameEn: residentName || 'Resident',
          nameTa: residentName || 'குடியிருப்பாளர்',
          dob: '',
          gender: '',
          bloodGroup: '',
          room: room || 'Room 203',
          block: block || 'Block A',
          medicalConditions: medicalConditions || '',
          allergies: '',
          currentMedications: '',
          avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
        }
      });
    }

    const loc = `${resident.room || room || 'Room 203'}, ${resident.block || block || 'Lotus Block'}`;
    const medSummary = resident.medicalConditions || medicalConditions || 'None specified';

    const alert = await prisma.emergencyAlert.create({
      data: {
        residentId: resident.id,
        type,
        status: 'ACTIVE',
        location: loc,
        medicalSummary: medSummary,
        sharedWith: 'Staff, Doctor, Family',
        sharedCount: '3/5'
      },
      include: { acknowledgements: true, resident: true }
    });

    // Format WhatsApp & SMS dispatch payloads based on user's real input
    const whatsappNotification = NotificationService.formatWhatsAppPayload({
      room: resident.room || 'Room 203',
      residentNameEn: resident.nameEn || 'Resident',
      residentNameTa: resident.nameTa || 'குடியிருப்பாளர்',
      medicalInfo: medSummary,
      location: loc
    });

    const smsNotification = NotificationService.formatSmsPayload({
      room: resident.room || 'Room 203',
      residentNameEn: resident.nameEn || 'Resident'
    });

    // Real-time broadcast over WebSocket
    socketService.broadcast('EMERGENCY_ALERT_TRIGGERED', {
      alert,
      notifications: {
        whatsapp: whatsappNotification,
        sms: smsNotification
      }
    });

    return res.status(201).json({
      success: true,
      data: alert,
      notifications: {
        whatsapp: whatsappNotification,
        sms: smsNotification
      }
    });
  } catch (error) {
    console.error('Error triggering emergency alert:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST /api/emergency/:id/cancel
emergencyRouter.post('/:id/cancel', async (req, res) => {
  try {
    const { id } = req.params;

    const alert = await prisma.emergencyAlert.update({
      where: { id },
      data: {
        status: 'CANCELLED',
        cancelledAt: new Date()
      }
    });

    socketService.broadcast('EMERGENCY_ALERT_CANCELLED', { alertId: id });
    return res.json({ success: true, data: alert });
  } catch (error) {
    console.error('Error cancelling alert:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST /api/emergency/:id/acknowledge
emergencyRouter.post('/:id/acknowledge', async (req, res) => {
  try {
    const { id } = req.params;
    const { staffNameEn, staffNameTa, roleEn, roleTa } = req.body;

    const ack = await prisma.staffAcknowledgement.create({
      data: {
        alertId: id,
        staffNameEn: staffNameEn || 'Duty Staff',
        staffNameTa: staffNameTa || 'பணி ஊழியர்',
        roleEn: roleEn || 'Staff',
        roleTa: roleTa || 'ஊழியர்'
      }
    });

    socketService.broadcast('EMERGENCY_ALERT_ACKNOWLEDGED', { alertId: id, acknowledgement: ack });
    return res.json({ success: true, data: ack });
  } catch (error) {
    console.error('Error acknowledging alert:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});
