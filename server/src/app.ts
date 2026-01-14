import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import passport from 'passport';
import './config/passport';

import authRoutes from './modules/auth/auth.routes';
import drillRoutes from './modules/drill-practice/drill.routes';
import studyRoutes from './modules/study/study.routes';
import timelineRoutes from './modules/timeline/timeline.routes';
import usersRoutes from './modules/users/users.routes';
import aiRoutes from './modules/ai/ai.routes';
import battlesRoutes from './modules/battles/battles.routes';
import costumesRoutes from './modules/costumes/costumes.routes';
import timeDetectiveRoutes from './modules/ai/time-detective.routes';

const app = express();

app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`[${req.method}] ${req.originalUrl} - ${res.statusCode} (${duration}ms)`);
  });
  next();
});

app.use(helmet({
  crossOriginOpenerPolicy: false,
}));
app.use(express.json());

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}));

app.use(passport.initialize());

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date() });
});

app.use('/auth', authRoutes);
app.use('/api/drill', drillRoutes);
app.use('/api/study', studyRoutes);
app.use('/api/timeline', timelineRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/battles', battlesRoutes);
app.use('/api/costumes', costumesRoutes);
app.use('/api/time-detective', timeDetectiveRoutes);

app.use((req, res) => {
  res.status(404).json({ message: 'Resource not found' });
});

export default app;