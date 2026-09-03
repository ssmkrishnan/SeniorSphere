import { Router } from 'express';
import { prisma } from '../db.js';
export const residentRouter = Router();
// GET /api/resident/profile
residentRouter.get('/profile', async (req, res) => {
    try {
        const resident = await prisma.resident.findFirst();
        if (!resident) {
            return res.status(404).json({ error: 'Resident not found' });
        }
        return res.json({ success: true, data: resident });
    }
    catch (error) {
        console.error('Error fetching resident:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});
// PUT /api/resident/profile
residentRouter.put('/profile', async (req, res) => {
    try {
        const resident = await prisma.resident.findFirst();
        if (!resident) {
            return res.status(404).json({ error: 'Resident not found' });
        }
        const { nameEn, nameTa, dob, gender, bloodGroup, medicalConditions, allergies, currentMedications, room, block } = req.body;
        const updated = await prisma.resident.update({
            where: { id: resident.id },
            data: {
                ...(nameEn && { nameEn }),
                ...(nameTa && { nameTa }),
                ...(dob && { dob }),
                ...(gender && { gender }),
                ...(bloodGroup && { bloodGroup }),
                ...(medicalConditions && { medicalConditions }),
                ...(allergies && { allergies }),
                ...(currentMedications && { currentMedications }),
                ...(room && { room }),
                ...(block && { block })
            }
        });
        return res.json({ success: true, data: updated });
    }
    catch (error) {
        console.error('Error updating resident profile:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});
