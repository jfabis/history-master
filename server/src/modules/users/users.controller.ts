import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export class UsersController {

  static async getProfile(req: Request, res: Response) {
    try {
      // @ts-ignore
      const userId = req.user?.id;

      if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const user = await prisma.user.findUnique({
        where: { id: userId },
        include: {
          progress: true,
        },
      });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Logika Dni Aktywności (niezależnie od streaka)
      if (user.progress) {
        const now = new Date();
        const lastActive = new Date(user.progress.lastActive);

        // Sprawdź czy to ten sam dzień kalendarzowy (ignoruj czas)
        const isSameDay =
          now.getFullYear() === lastActive.getFullYear() &&
          now.getMonth() === lastActive.getMonth() &&
          now.getDate() === lastActive.getDate();

        if (!isSameDay) {
          // Nowy dzień! Inkrementuj licznik
          console.log(`[UserProgress] New active day for ${user.email}. Incrementing totalActiveDays.`);
          const updatedProgress = await prisma.userProgress.update({
            where: { id: user.progress.id },
            data: {
              totalActiveDays: { increment: 1 },
              lastActive: now
            }
          });
          user.progress = updatedProgress; // Zaktualizuj obiekt w pamięci przed wysłaniem
        } else {
          // Ten sam dzień - zaktualizuj tylko lastActive (opcjonalne, ale dobre dla analityki)
          await prisma.userProgress.update({
            where: { id: user.progress.id },
            data: { lastActive: now }
          });
        }
      }

      const totalAnswers = await prisma.userAnswer.count({ where: { userId } });
      const correctAnswers = await prisma.userAnswer.count({ where: { userId, isCorrect: true } });
      const accuracy = totalAnswers > 0 ? Math.round((correctAnswers / totalAnswers) * 100) : 0;

      const { password, ...userData } = user;

      res.json({
        ...userData,
        hasPassword: !!password,
        stats: {
          totalAnswers,
          correctAnswers,
          accuracy
        }
      });
    } catch (error) {
      console.error('Error fetching user profile:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async changePassword(req: Request, res: Response) {
    try {
      // @ts-ignore
      const userId = req.user?.id;
      const { currentPassword, newPassword } = req.body;

      if (!userId) return res.status(401).json({ error: 'Unauthorized' });

      if (!newPassword || newPassword.length < 6) {
        return res.status(400).json({ error: 'Nowe hasło musi mieć min. 6 znaków' });
      }

      const user = await prisma.user.findUnique({ where: { id: userId } });
      if (!user) return res.status(404).json({ error: 'User not found' });

      if (user.password) {
        if (!currentPassword) {
          return res.status(400).json({ error: 'Podaj obecne hasło' });
        }
        const isValid = await bcrypt.compare(currentPassword, user.password);
        if (!isValid) {
          return res.status(400).json({ error: 'Obecne hasło jest nieprawidłowe' });
        }
      } else {
        return res.status(400).json({ error: 'Konta Google nie mogą zmieniać hasła tutaj.' });
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);

      await prisma.user.update({
        where: { id: userId },
        data: { password: hashedPassword }
      });

      res.json({ message: 'Hasło zostało zmienione pomyślnie' });

    } catch (error) {
      console.error('Error changing password:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async addXP(req: Request, res: Response) {
    try {
      // @ts-ignore
      const userId = req.user?.id;
      const { amount, reason } = req.body;

      if (!userId) return res.status(401).json({ error: 'Unauthorized' });
      if (!amount || typeof amount !== 'number') {
        return res.status(400).json({ error: 'Invalid XP amount' });
      }

      // Aktualizacja lub utworzenie postępu
      const progress = await prisma.userProgress.upsert({
        where: { userId },
        create: {
          userId,
          xp: amount,
          level: 1,
          lastActive: new Date()
        },
        update: {
          xp: { increment: amount },
          lastActive: new Date()
        }
      });

      // Prosta logika levelowania (co 1000 XP)
      const newLevel = Math.floor(progress.xp / 1000) + 1;

      if (newLevel > progress.level) {
        await prisma.userProgress.update({
          where: { userId },
          data: { level: newLevel }
        });
      }

      res.json({
        message: 'XP added successfully',
        currentXP: progress.xp,
        level: newLevel,
        gained: amount
      });

    } catch (error) {
      console.error('Error adding XP:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}