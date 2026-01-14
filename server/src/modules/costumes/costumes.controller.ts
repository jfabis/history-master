import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class CostumesController {

    // Pobierz losowy strój
    static async getRandomCostume(req: Request, res: Response) {
        try {
            const excludeIds = req.query.exclude ? (req.query.exclude as string).split(',') : [];

            // 1. Sprawdź ile strojów jest dostępnych po wykluczeniu
            const availableCount = await prisma.historicalCostume.count({
                where: {
                    id: { notIn: excludeIds }
                }
            });

            console.log(`[Costumes] Available: ${availableCount}, Excluded: ${excludeIds.length}`);

            let randomCostume;
            let poolReset = false;

            if (availableCount > 0) {
                // Jeśli są dostępne niewykluczone stroje, losuj z nich
                const skip = Math.floor(Math.random() * availableCount);
                randomCostume = await prisma.historicalCostume.findFirst({
                    where: {
                        id: { notIn: excludeIds }
                    },
                    skip: skip
                });
            } else {
                // JEŚLI WYCZERPANO PULĘ - reset
                console.log('[Costumes] Pool exhausted, resetting cycle!');
                poolReset = true;

                const allCount = await prisma.historicalCostume.count();
                const skip = Math.floor(Math.random() * allCount);
                randomCostume = await prisma.historicalCostume.findFirst({
                    skip: skip
                });
            }

            if (!randomCostume) {
                return res.status(404).json({ error: 'Nie znaleziono żadnych strojów (baza pusta?)' });
            }

            return res.json({
                ...randomCostume,
                poolReset // Flaga dla frontendu
            });

        } catch (error) {
            console.error('Błąd podczas pobierania losowego stroju:', error);
            return res.status(500).json({ error: 'Błąd serwera' });
        }
    }

    // Pobierz wszystkie stroje
    static async getAllCostumes(req: Request, res: Response) {
        try {
            const costumes = await prisma.historicalCostume.findMany();
            return res.json(costumes);
        } catch (error) {
            return res.status(500).json({ error: 'Błąd serwera' });
        }
    }
}
