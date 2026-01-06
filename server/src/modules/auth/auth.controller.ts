import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '@prisma/client';

export class AuthController {
  
  /**
   * Obsługuje powrót z Google. Generuje JWT i przekierowuje na Frontend.
   */
  static async handleGoogleCallback(req: Request, res: Response) {
    try {
      // Req.user jest ustawiane przez middleware passporta
      const user = req.user as User;

      if (!user) {
        return res.status(401).json({ message: 'Authentication failed' });
      }

      const secret = process.env.JWT_SECRET;
      if (!secret) throw new Error('JWT_SECRET is not defined');

      // Generowanie tokena JWT ważnego 1 dzień
      const token = jwt.sign(
        { 
          id: user.id, 
          email: user.email, 
          googleId: user.googleId 
        },
        secret,
        { expiresIn: '1d' }
      );

      // Przekierowanie na frontend z tokenem w parametrze URL
      // Frontend (React) odbierze ten token i zapisze go w localStorage/cookies
      const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
      res.redirect(`${frontendUrl}/auth/success?token=${token}`);
      
    } catch (error) {
      console.error('Auth Callback Error:', error);
      res.redirect('http://localhost:5173/login?error=auth_failed');
    }
  }
}