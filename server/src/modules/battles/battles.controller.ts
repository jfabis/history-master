import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class BattlesController {

    // Pobierz losową bitwę
    static async getRandomBattle(req: Request, res: Response) {
        try {
            const excludeIds = req.query.exclude ? (req.query.exclude as string).split(',') : [];

            // 1. Sprawdź ile bitew jest dostępnych po wykluczeniu
            const availableCount = await prisma.historicalBattle.count({
                where: {
                    id: { notIn: excludeIds }
                }
            });

            console.log(`[Battles] Available: ${availableCount}, Excluded: ${excludeIds.length}`);

            let randomBattle;
            let poolReset = false;

            if (availableCount > 0) {
                // Jeśli są dostępne niewykluczone bitwy, losuj z nich
                const skip = Math.floor(Math.random() * availableCount);
                randomBattle = await prisma.historicalBattle.findFirst({
                    where: {
                        id: { notIn: excludeIds }
                    },
                    skip: skip
                });
            } else {
                // JEŚLI WYCZERPANO PULĘ (availableCount === 0)
                // Resetujemy cykl - losujemy ze wszystkich (ignorując exclude)
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

            // Zwracamy bitwę z opcjami
            const options = [randomBattle.winner, randomBattle.loser];
            // Mieszamy opcje
            options.sort(() => Math.random() - 0.5);

            return res.json({
                ...randomBattle,
                options,
                poolReset // Flaga dla frontendu, że pula została zresetowana
            });

        } catch (error: any) {
            console.error('Error fetching random scenario:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    // Pobierz wszystkie bitwy (dla debugingu lub listy)
    static async getAllBattles(req: Request, res: Response) {
        try {
            const battles = await prisma.historicalBattle.findMany();
            return res.json(battles);
        } catch (error) {
            return res.status(500).json({ error: 'Błąd serwera' });
        }
    }
}
