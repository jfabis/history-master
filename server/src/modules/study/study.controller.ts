import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class StudyController {
  static async getCards(req: Request, res: Response) {
    const { topicId } = req.params;
    try {
      const cards = await prisma.studyCard.findMany({
        where: { topicId }
      });
      res.json(cards);
    } catch (error) {
      res.status(500).json({ error: 'Błąd pobierania kart' });
    }
  }
}