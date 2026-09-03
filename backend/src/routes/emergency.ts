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
    return res.json({ success: true, data: activeAlert });
  } catch (error) {
    console.error('Error getting active emergency:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST /api/emergency/alert
emergencyRouter.post('/alert', async (req, res) => {
  try {
    const { type = 'sos' } = req.body;
    const resident = await prisma.resident.findFirst();

    if (!resident) {
      return res.status(404).json({ error: 'Resident not found' });
    }

    const alert = await prisma.emergencyAlert.create({
      data: {
        residentId: resident.id,
        type,
        status: 'ACTIVE',
        location: `${resident.room}, ${resident.block}`,
        medicalSummary: resident.medicalConditions,
        sharedWith: 'Staff, Doctor, Family',
        sharedCount: '3/5'
      },
      include: { resident: true }
    });

    // Seed immediate acknowledgements simulation (Nurse & Doctor)
    await prisma.staffAcknowledgement.createMany({
      data: [
        {
          alertId: alert.id,
          staffNameEn: 'Nurse Kavita',
          staffNameTa: 'நர்ஸ் கவிதா',
          roleEn: 'Duty Nurse',
          roleTa: 'பணி செவிலியர்'
        },
        {
          alertId: alert.id,
          staffNameEn: 'Duty Doctor',
          staffNameTa: 'டியூட்டி மருத்துவர்',
          roleEn: 'Resident Physician',
          roleTa: 'மருத்துவர்'
        }
      ]
    });

    const fullAlert = await prisma.emergencyAlert.findUnique({
      where: { id: alert.id },
      include: { acknowledgements: true, resident: true }
    });

    // Format WhatsApp & SMS dispatch payloads
    const whatsappNotification = NotificationService.formatWhatsAppPayload({
      room: resident.room,
      residentNameEn: resident.nameEn,
      residentNameTa: resident.nameTa,
      medicalInfo: resident.medicalConditions,
      location: `${resident.room}, ${resident.block}`
    });

    const smsNotification = NotificationService.formatSmsPayload({
      room: resident.room,
      residentNameEn: resident.nameEn
    });

    // Real-time broadcast over WebSocket
    socketService.broadcast('EMERGENCY_ALERT_TRIGGERED', {
      alert: fullAlert,
      notifications: {
        whatsapp: whatsappNotification,
        sms: smsNotification
      }
    });

    return res.status(201).json({
      success: true,
      data: fullAlert,
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
        staffNameEn: staffNameEn || 'Care Staff',
        staffNameTa: staffNameTa || 'பராமரிப்பாளர்',
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
