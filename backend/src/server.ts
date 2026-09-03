import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { socketService } from './services/socketService.js';

// Route imports
import { residentRouter } from './routes/resident.js';
import { emergencyRouter } from './routes/emergency.js';
import { complaintsRouter } from './routes/complaints.js';
import { activitiesRouter } from './routes/activities.js';
import { servicesRouter } from './routes/services.js';
import { communityRouter } from './routes/community.js';
import { entertainmentRouter } from './routes/entertainment.js';

dotenv.config();

const app = express();
const server = createServer(app);

const PORT = process.env.PORT || 5001;
const CORS_ORIGIN = process.env.CORS_ORIGIN || '*';

// Middleware
app.use(cors({ origin: CORS_ORIGIN, credentials: true }));
app.use(express.json());

// Initialize WebSockets for real-time SOS alerts
socketService.init(server);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'HEALTHY',
    service: 'SeniorSphere Backend API',
    database: 'PostgreSQL',
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api/resident', residentRouter);
app.use('/api/emergency', emergencyRouter);
app.use('/api/complaints', complaintsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/services', servicesRouter);
app.use('/api/community', communityRouter);
app.use('/api/entertainment', entertainmentRouter);

// Start Server
server.listen(PORT, () => {
  console.log(`[SeniorSphere Backend] HTTP & WebSocket Server running on port ${PORT}`);
  console.log(`[SeniorSphere Backend] Health check: http://localhost:${PORT}/api/health`);
});
