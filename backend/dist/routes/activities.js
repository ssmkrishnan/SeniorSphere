import { Router } from 'express';
import { prisma } from '../db.js';
export const activitiesRouter = Router();
// GET /api/activities/today
activitiesRouter.get('/today', async (req, res) => {
    try {
        const activities = await prisma.activity.findMany({
            orderBy: { time: 'asc' }
        });
        return res.json({ success: true, data: activities });
    }
    catch (error) {
        console.error('Error fetching activities:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});
