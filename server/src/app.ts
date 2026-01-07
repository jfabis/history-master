import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import passport from 'passport';

// Konfiguracja Passport musi być zaimportowana przed trasami
import './config/passport';

import authRoutes from './modules/auth/auth.routes';
import drillRoutes from './modules/drill-practice/drill.routes';
import studyRoutes from './modules/study/study.routes';
import timelineRoutes from './modules/timeline/timeline.routes'; // <--- Nowy import

const app = express();

app.use(helmet());
app.use(express.json());

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}));

app.use(passport.initialize());

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date() });
});

// Rejestracja tras
app.use('/auth', authRoutes);
app.use('/api/drill', drillRoutes);
app.use('/api/study', studyRoutes);
app.use('/api/timeline', timelineRoutes); // <--- Nowa trasa

app.use((req, res) => {
  res.status(404).json({ message: 'Resource not found' });
});

export default app;