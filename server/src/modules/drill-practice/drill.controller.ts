import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class DrillController {

  static async getTopics(req: Request, res: Response) {
    try {
      const topics = await prisma.topic.findMany({
        include: {
          _count: { select: { questions: true } }
        },
        orderBy: {
          order: 'asc'
        }
      });
      res.json(topics);
    } catch (error) {
      res.status(500).json({ error: 'Nie udało się pobrać tematów' });
    }
  }

  static async getQuiz(req: Request, res: Response) {
    const { topicId } = req.params;
    try {
      const questions = await prisma.question.findMany({
        where: { topicId },
        take: 20
      });

      const shuffled = questions.sort(() => 0.5 - Math.random()).slice(0, 5);

      const sanitizedQuestions = shuffled.map(q => {
        const { correctAnswer, ...rest } = q;
        return rest;
      });

      res.json(sanitizedQuestions);
    } catch (error) {
      res.status(500).json({ error: 'Błąd generowania quizu' });
    }
  }

  static async submitAnswer(req: Request, res: Response) {
    const { questionId, selectedAnswer } = req.body;
    // @ts-ignore - user jest dodawany przez passport
    const userId = req.user?.id;

    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    try {
      const question = await prisma.question.findUnique({ where: { id: questionId } });
      if (!question) return res.status(404).json({ error: 'Pytanie nie istnieje' });

      const isCorrect = question.correctAnswer === selectedAnswer;

      await prisma.userAnswer.create({
        data: {
          userId,
          questionId,
          isCorrect
        }
      });

      if (isCorrect) {
        await prisma.userProgress.update({
          where: { userId },
          data: {
            xp: { increment: 10 + (question.difficulty * 2) },
            lastActive: new Date()
          }
        });
      }

      res.json({
        correct: isCorrect,
        correctAnswer: question.correctAnswer,
        explanation: question.explanation,
        xpGained: isCorrect ? 10 + (question.difficulty * 2) : 0
      });

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Błąd przetwarzania odpowiedzi' });
    }
  }
}