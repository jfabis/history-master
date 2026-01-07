import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class TimelineController {
  static async getEvents(req: Request, res: Response) {
    try {
      const events = await prisma.timelineEvent.findMany({
        orderBy: { sortOrder: 'asc' } // Sortujemy chronologicznie
      });
      res.json(events);
    } catch (error) {
      res.status(500).json({ error: 'Błąd pobierania osi czasu' });
    }
  }
}