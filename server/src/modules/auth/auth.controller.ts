import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient();

export class AuthController {

  private static async generateTokens(user: { id: string, email: string, displayName?: string | null }) {
    const accessTokenSecret = process.env.JWT_SECRET || 'secret';
    const accessToken = jwt.sign(
      { id: user.id, email: user.email },
      accessTokenSecret,
      { expiresIn: '1h' }
    );

    const refreshTokenString = crypto.randomBytes(40).toString('hex');
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 30); 

    await prisma.refreshToken.create({
      data: {
        token: refreshTokenString,
        userId: user.id,
        expiresAt: expiresAt
      }
    });

    return { accessToken, refreshToken: refreshTokenString };
  }

  static async handleGoogleCallback(req: Request, res: Response) {
    try {
      const user = req.user as User;
      if (!user) return res.status(401).json({ message: 'Authentication failed' });

      const { accessToken, refreshToken } = await AuthController.generateTokens(user);

      const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';

      res.setHeader("Content-Security-Policy", "script-src 'self' 'unsafe-inline'");

      const html = `
        <!DOCTYPE html>
        <html>
          <head>
            <title>Autoryzacja Google</title>
            <meta charset="utf-8">
            <style>
              body { font-family: 'Georgia', serif; text-align: center; padding: 40px; background: #fdfbf7; color: #2c241b; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; margin: 0; }
              .loader { border: 4px solid #f3f3f3; border-top: 4px solid #8b1e1e; border-radius: 50%; width: 40px; height: 40px; animation: spin 1s linear infinite; margin-bottom: 20px; }
              @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
              h1 { font-size: 24px; margin-bottom: 10px; }
              p { color: #5c4d3c; margin-bottom: 20px; }
              .error { color: #d32f2f; font-weight: bold; background: #ffebee; padding: 10px; border-radius: 4px; margin-top: 20px; }
              
              #manual-btn { display: none; background: #8b1e1e; color: #fff; border: none; padding: 10px 20px; font-weight: bold; cursor: pointer; border-radius: 4px; margin-top: 10px; }
              #manual-btn:hover { background: #5c1414; }
            </style>
          </head>
          <body>
            <div class="loader"></div>
            <h1>Autoryzacja zakończona!</h1>
            <p>Trwa przekazywanie sesji...</p>
            
            <button id="manual-btn" onclick="sendToken()">Kliknij tutaj, jeśli okno się nie zamknie</button>

            <script>
              const accessToken = '${accessToken}';
              const refreshToken = '${refreshToken}';
              
              function sendToken() {
                if (window.opener) {
                  window.opener.postMessage({ 
                    type: 'GOOGLE_AUTH_SUCCESS', 
                    token: accessToken,
                    refreshToken: refreshToken
                  }, '*');
                  setTimeout(() => window.close(), 500);
                } else {
                  document.querySelector('.loader').style.display = 'none';
                  document.body.innerHTML += '<div class="error">Błąd: Nie wykryto okna głównego aplikacji. Jeśli zamknąłeś główną stronę, zaloguj się ponownie.</div>';
                }
              }

              window.onload = sendToken;
              
              setTimeout(() => {
                document.getElementById('manual-btn').style.display = 'block';
              }, 3000);
            </script>
          </body>
        </html>
      `;

      res.send(html);

    } catch (error) {
      console.error(error);
      res.redirect('http://localhost:5173/login?error=auth_failed');
    }
  }

  static async register(req: Request, res: Response) {
    const { email, password, displayName } = req.body;

    if (!email || !password || !displayName) {
      return res.status(400).json({ error: 'Wypełnij wszystkie pola.' });
    }

    try {
      const existingUser = await prisma.user.findUnique({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ error: 'Użytkownik o tym emailu już istnieje.' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          displayName,
          progress: { create: { xp: 0, level: 1 } }
        }
      });

      const tokens = await AuthController.generateTokens(newUser);

      res.json({
        token: tokens.accessToken,
        refreshToken: tokens.refreshToken,
        user: { email: newUser.email, displayName: newUser.displayName }
      });

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Błąd rejestracji.' });
    }
  }

  static async login(req: Request, res: Response) {
    const user = req.user as User;
    if (!user) return res.status(401).json({ error: 'Błąd logowania.' });

    const tokens = await AuthController.generateTokens(user);

    res.json({
      token: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      user: { email: user.email, displayName: user.displayName }
    });
  }

  static async refreshToken(req: Request, res: Response) {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({ error: 'Refresh Token is required' });
    }

    try {
      const savedToken = await prisma.refreshToken.findUnique({
        where: { token: refreshToken },
        include: { user: true }
      });

      if (!savedToken || savedToken.revoked || new Date() > savedToken.expiresAt) {
        return res.status(403).json({ error: 'Invalid or expired refresh token' });
      }

      await prisma.refreshToken.update({
        where: { id: savedToken.id },
        data: { revoked: true } 
      });

      const newTokens = await AuthController.generateTokens(savedToken.user);

      res.json({
        token: newTokens.accessToken,
        refreshToken: newTokens.refreshToken
      });

    } catch (error) {
      console.error('Refresh Token Error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}