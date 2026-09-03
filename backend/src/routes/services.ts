import { Router } from 'express';
import { prisma } from '../db.js';

export const servicesRouter = Router();

// POST /api/services/request
servicesRouter.post('/request', async (req, res) => {
  try {
    const { serviceType, notes } = req.body;
    const resident = await prisma.resident.findFirst();

    if (!resident) {
      return res.status(404).json({ error: 'Resident not found' });
    }

    const serviceReq = await prisma.serviceRequest.create({
      data: {
        residentId: resident.id,
        serviceType: serviceType || 'general',
        notes: notes || '',
        status: 'PENDING'
      }
    });

    return res.status(201).json({ success: true, data: serviceReq });
  } catch (error) {
    console.error('Error submitting service request:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST /api/counselling/request
servicesRouter.post('/counselling/request', async (req, res) => {
  try {
    const { categoryKey, notes } = req.body;
    const resident = await prisma.resident.findFirst();

    if (!resident) {
      return res.status(404).json({ error: 'Resident not found' });
    }

    const counselling = await prisma.counsellingRequest.create({
      data: {
        residentId: resident.id,
        categoryKey: categoryKey || 'pension',
        notes: notes || '',
        status: 'PENDING'
      }
    });

    return res.status(201).json({ success: true, data: counselling });
  } catch (error) {
    console.error('Error submitting counselling request:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});
