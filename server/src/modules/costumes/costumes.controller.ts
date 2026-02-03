import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class CostumesController {

    static async getRandomCostume(req: Request, res: Response) {
        try {
            const excludeIds = req.query.exclude ? (req.query.exclude as string).split(',') : [];

            const availableCostumes = await prisma.historicalCostume.findMany({
                where: {
                    id: { notIn: excludeIds }
                },
                select: { id: true }
            });

            console.log(`[Costumes] Available IDs: ${availableCostumes.length}, Excluded: ${excludeIds.length}`);

            let selectedId: string;
            let poolReset = false;

            if (availableCostumes.length > 0) {
                const randomIndex = Math.floor(Math.random() * availableCostumes.length);
                selectedId = availableCostumes[randomIndex].id;
            } else {
                console.log('[Costumes] Pool exhausted, resetting cycle!');
                poolReset = true;

                const allCostumes = await prisma.historicalCostume.findMany({
                    select: { id: true }
                });

                if (allCostumes.length === 0) {
                    return res.status(404).json({ error: 'Baza strojów jest pusta' });
                }

                const randomIndex = Math.floor(Math.random() * allCostumes.length);
                selectedId = allCostumes[randomIndex].id;
            }

            const randomCostume = await prisma.historicalCostume.findUnique({
                where: { id: selectedId }
            });

            if (!randomCostume) {
                return res.status(500).json({ error: 'Błąd pobierania wylosowanego stroju' });
            }

            return res.json({
                ...randomCostume,
                poolReset
            });

        } catch (error) {
            console.error('Błąd podczas pobierania losowego stroju:', error);
            return res.status(500).json({ error: 'Błąd serwera' });
        }
    }

    static async getAllCostumes(req: Request, res: Response) {
        try {
            const costumes = await prisma.historicalCostume.findMany();
            return res.json(costumes);
        } catch (error) {
            return res.status(500).json({ error: 'Błąd serwera' });
        }
    }
}
