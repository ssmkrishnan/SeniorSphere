import { Router } from 'express';
import { prisma } from '../db.js';

export const complaintsRouter = Router();

// GET /api/complaints
complaintsRouter.get('/', async (req, res) => {
  try {
    const { status } = req.query;

    const whereClause: any = {};
    if (status && status !== 'all') {
      whereClause.status = String(status);
    }

    const complaints = await prisma.complaint.findMany({
      where: whereClause,
      orderBy: { createdAt: 'desc' }
    });

    return res.json({ success: true, data: complaints });
  } catch (error) {
    console.error('Error fetching complaints:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST /api/complaints
complaintsRouter.post('/', async (req, res) => {
  try {
    const { categoryKey, titleEn, titleTa, descriptionEn, descriptionTa, photoUrl } = req.body;
    const resident = await prisma.resident.findFirst();

    if (!resident) {
      return res.status(404).json({ error: 'Resident not found' });
    }

    const complaint = await prisma.complaint.create({
      data: {
        residentId: resident.id,
        categoryKey: categoryKey || 'room',
        titleEn: titleEn || 'Maintenance Issue',
        titleTa: titleTa || 'பராமரிப்பு பிரச்சனை',
        descriptionEn: descriptionEn || '',
        descriptionTa: descriptionTa || '',
        photoUrl: photoUrl || null,
        status: 'in_progress'
      }
    });

    return res.status(201).json({ success: true, data: complaint });
  } catch (error) {
    console.error('Error creating complaint:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

// PATCH /api/complaints/:id/status
complaintsRouter.patch('/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updated = await prisma.complaint.update({
      where: { id },
      data: { status }
    });

    return res.json({ success: true, data: updated });
  } catch (error) {
    console.error('Error updating complaint status:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});
