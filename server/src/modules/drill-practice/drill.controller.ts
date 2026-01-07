import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class DrillController {
  
  // Pobierz wszystkie dostępne tematy
  static async getTopics(req: Request, res: Response) {
    try {
      const topics = await prisma.topic.findMany({
        include: {
          _count: { select: { questions: true } }
        }
      });
      res.json(topics);
    } catch (error) {
      res.status(500).json({ error: 'Nie udało się pobrać tematów' });
    }
  }

  // Pobierz quiz dla danego tematu (losowe 5 pytań)
  static async getQuiz(req: Request, res: Response) {
    const { topicId } = req.params;
    try {
      // Pobieramy pytania. W prawdziwej produkcji użylibyśmy RAW SQL do losowania (RANDOM()),
      // ale Prisma nie wspiera tego natywnie, więc pobierzemy i przemieszamy w JS (dla małej skali ok).
      const questions = await prisma.question.findMany({
        where: { topicId },
        take: 20 // Pobieramy pulę
      });

      // Algorytm Fisher-Yates shuffle
      const shuffled = questions.sort(() => 0.5 - Math.random()).slice(0, 5);

      // Usuwamy poprawną odpowiedź z obiektu wysyłanego do klienta (żeby nie podglądał w DevTools!)
      const sanitizedQuestions = shuffled.map(q => {
        const { correctAnswer, ...rest } = q; 
        return rest;
      });

      res.json(sanitizedQuestions);
    } catch (error) {
      res.status(500).json({ error: 'Błąd generowania quizu' });
    }
  }

  // Sprawdź odpowiedź i nalicz XP
  static async submitAnswer(req: Request, res: Response) {
    const { questionId, selectedAnswer } = req.body;
    // @ts-ignore - user jest dodawany przez passport
    const userId = req.user?.id;

    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    try {
      const question = await prisma.question.findUnique({ where: { id: questionId } });
      if (!question) return res.status(404).json({ error: 'Pytanie nie istnieje' });

      const isCorrect = question.correctAnswer === selectedAnswer;

      // Zapisujemy odpowiedź użytkownika
      await prisma.userAnswer.create({
        data: {
          userId,
          questionId,
          isCorrect
        }
      });

      // Jeśli poprawna, dodajemy XP i aktualizujemy statystyki
      if (isCorrect) {
        await prisma.userProgress.update({
          where: { userId },
          data: {
            xp: { increment: 10 + (question.difficulty * 2) }, // Więcej XP za trudne pytania
            lastActive: new Date()
            // Tutaj można dodać logikę Streaka
          }
        });
      }

      res.json({
        correct: isCorrect,
        correctAnswer: question.correctAnswer, // Teraz możemy zdradzić odpowiedź
        explanation: question.explanation,
        xpGained: isCorrect ? 10 + (question.difficulty * 2) : 0
      });

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Błąd przetwarzania odpowiedzi' });
    }
  }
}