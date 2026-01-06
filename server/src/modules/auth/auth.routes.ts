import { Router } from 'express';
import passport from 'passport';
import { AuthController } from './auth.controller';

const router = Router();

// 1. Inicjacja logowania: przekierowuje użytkownika do Google
router.get(
  '/google',
  passport.authenticate('google', { 
    scope: ['profile', 'email'],
    session: false // Używamy JWT, więc sesje serwerowe są zbędne w API
  })
);

// 2. Callback: Google odsyła użytkownika tutaj
router.get(
  '/google/callback',
  passport.authenticate('google', { 
    session: false,
    failureRedirect: 'http://localhost:5173/login?error=failed' 
  }),
  AuthController.handleGoogleCallback
);

export default router;