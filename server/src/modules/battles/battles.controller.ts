import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class BattlesController {

    static async getRandomBattle(req: Request, res: Response) {
        try {
            const excludeIds = req.query.exclude ? (req.query.exclude as string).split(',') : [];

            const availableCount = await prisma.historicalBattle.count({
                where: {
                    id: { notIn: excludeIds }
                }
            });

            console.log(`[Battles] Available: ${availableCount}, Excluded: ${excludeIds.length}`);

            let randomBattle;
            let poolReset = false;

            if (availableCount > 0) {
                const skip = Math.floor(Math.random() * availableCount);
                randomBattle = await prisma.historicalBattle.findFirst({
                    where: {
                        id: { notIn: excludeIds }
                    },
                    skip: skip
                });
            } else {
                console.log('[Battles] Pool exhausted, resetting cycle!');
                poolReset = true;

                const allCount = await prisma.historicalBattle.count();
                const skip = Math.floor(Math.random() * allCount);
                randomBattle = await prisma.historicalBattle.findFirst({
                    skip: skip
                });
            }

            if (!randomBattle) {
                return res.status(404).json({ error: 'Nie znaleziono żadnych bitew (baza pusta?)' });
            }

            const options = [randomBattle.winner, randomBattle.loser];
            options.sort(() => Math.random() - 0.5);

            return res.json({
                ...randomBattle,
                options,
                poolReset
            });

        } catch (error: any) {
            console.error('Error fetching random scenario:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    static async getAllBattles(req: Request, res: Response) {
        try {
            const battles = await prisma.historicalBattle.findMany();
            return res.json(battles);
        } catch (error) {
            return res.status(500).json({ error: 'Błąd serwera' });
        }
    }
}
