import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import passport from 'passport';
import './config/passport'; // Import konfiguracji passporta (musi być przed trasami)

import authRoutes from './modules/auth/auth.routes';

const app = express();

// --- Middlewares ---

// Zabezpieczenia nagłówków HTTP
app.use(helmet());

// Parsowanie JSON
app.use(express.json());

// CORS - Zezwolenie na połączenia z Frontendu (Vite)
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true, // Wymagane jeśli w przyszłości użyjemy ciasteczek
}));

// Inicjalizacja Passporta
app.use(passport.initialize());

// --- Routes ---

// API Health Check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date() });
});

// Moduły
app.use('/auth', authRoutes);

// Obsługa błędów 404
app.use((req, res) => {
  res.status(404).json({ message: 'Resource not found' });
});

export default app;