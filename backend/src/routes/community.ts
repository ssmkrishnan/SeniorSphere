import { Router } from 'express';
import { prisma } from '../db.js';

export const communityRouter = Router();

// GET /api/community/birthdays
communityRouter.get('/birthdays', async (req, res) => {
  try {
    const birthdays = await prisma.communityBirthday.findMany();
    return res.json({ success: true, data: birthdays });
  } catch (error) {
    console.error('Error fetching birthdays:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET /api/community/gallery
communityRouter.get('/gallery', async (req, res) => {
  try {
    const gallery = await prisma.galleryItem.findMany();
    return res.json({ success: true, data: gallery });
  } catch (error) {
    console.error('Error fetching gallery:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});
