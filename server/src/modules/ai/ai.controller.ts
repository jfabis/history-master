import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { GoogleVertexAIAdapter } from '../../shared/adapters/image-gen.adapter';

const prisma = new PrismaClient();
const aiAdapter = new GoogleVertexAIAdapter();

export class AIController {

  static async generate(req: Request, res: Response) {
    try {
      // @ts-ignore
      const userId = req.user?.id;
      const { era, subject, style, mode, prompt } = req.body;

      if (!userId) return res.status(401).json({ error: 'Unauthorized' });

      // Skoro usunęliśmy szablony z adaptera, prompt MUSI być dostarczony
      if (!prompt) {
        return res.status(400).json({ error: 'Prompt is required. Hardcoded templates have been removed.' });
      }

      console.log(`[AI Controller] Generating with mode: ${mode}, prompt length: ${prompt.length}`);

      const imageUrl = await aiAdapter.generateImage({ prompt, mode });

      const asset = await prisma.generatedAsset.create({
        data: {
          prompt: prompt.substring(0, 100) + '...', // Skracamy do logów
          imageUrl: imageUrl,
          provider: 'Google Vertex AI',
        }
      });

      res.json(asset);

    } catch (error) {
      console.error('AI Generation Error:', error);
      res.status(500).json({ error: 'Nie udało się wygenerować wizji.' });
    }
  }

  static async getHistory(req: Request, res: Response) {
    try {
      const assets = await prisma.generatedAsset.findMany({
        take: 10,
        orderBy: { createdAt: 'desc' }
      });
      res.json(assets);
    } catch (error) {
      res.status(500).json({ error: 'Błąd pobierania historii' });
    }
  }
}