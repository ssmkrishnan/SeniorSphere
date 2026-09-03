import { Router } from 'express';
import { prisma } from '../db.js';
export const residentRouter = Router();
// GET /api/resident/profile
residentRouter.get('/profile', async (req, res) => {
    try {
        const resident = await prisma.resident.findFirst({
            orderBy: { createdAt: 'desc' }
        });
        return res.json({ success: true, data: resident || null });
    }
    catch (error) {
        console.error('Error fetching resident:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});
// POST or PUT /api/resident/profile
const saveResidentHandler = async (req, res) => {
    try {
        const { nameEn, nameTa, dob, gender, bloodGroup, medicalConditions, allergies, currentMedications, room, block, avatarUrl } = req.body;
        const resident = await prisma.resident.findFirst({
            orderBy: { createdAt: 'desc' }
        });
        if (!resident) {
            // Create fresh resident from user input
            const created = await prisma.resident.create({
                data: {
                    nameEn: nameEn || '',
                    nameTa: nameTa || nameEn || '',
                    dob: dob || '',
                    gender: gender || '',
                    bloodGroup: bloodGroup || '',
                    medicalConditions: medicalConditions || '',
                    allergies: allergies || '',
                    currentMedications: currentMedications || '',
                    room: room || '',
                    block: block || '',
                    avatarUrl: avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
                }
            });
            return res.status(201).json({ success: true, data: created });
        }
        // Update existing resident record
        const updated = await prisma.resident.update({
            where: { id: resident.id },
            data: {
                ...(nameEn !== undefined && { nameEn }),
                ...(nameTa !== undefined && { nameTa }),
                ...(dob !== undefined && { dob }),
                ...(gender !== undefined && { gender }),
                ...(bloodGroup !== undefined && { bloodGroup }),
                ...(medicalConditions !== undefined && { medicalConditions }),
                ...(allergies !== undefined && { allergies }),
                ...(currentMedications !== undefined && { currentMedications }),
                ...(room !== undefined && { room }),
                ...(block !== undefined && { block }),
                ...(avatarUrl !== undefined && { avatarUrl })
            }
        });
        return res.json({ success: true, data: updated });
    }
    catch (error) {
        console.error('Error saving resident profile:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
residentRouter.put('/profile', saveResidentHandler);
residentRouter.post('/profile', saveResidentHandler);
