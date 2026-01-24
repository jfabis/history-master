import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class TimeDetectiveController {

    async getRandomScenario(req: Request, res: Response) {
        try {
            const excludeIds = req.query.exclude ? (req.query.exclude as string).split(',') : [];

            const availableScenarios = await prisma.timeDetectiveScenario.findMany({
                where: { id: { notIn: excludeIds } },
                select: { id: true }
            });

            console.log(`[TimeDetective] Available IDs: ${availableScenarios.length}, Excluded: ${excludeIds.length}`);

            let selectedId: string;
            let poolReset = false;

            if (availableScenarios.length > 0) {
                const randomIndex = Math.floor(Math.random() * availableScenarios.length);
                selectedId = availableScenarios[randomIndex].id;
            } else {
                console.log('[TimeDetective] Pool exhausted, resetting cycle!');
                poolReset = true;
                const allScenarios = await prisma.timeDetectiveScenario.findMany({ select: { id: true } });

                if (allScenarios.length === 0) return res.status(404).json({ error: 'No scenarios found' });

                const randomIndex = Math.floor(Math.random() * allScenarios.length);
                selectedId = allScenarios[randomIndex].id;
            }

            const randomScenario = await prisma.timeDetectiveScenario.findUnique({
                where: { id: selectedId }
            });

            if (!randomScenario) {
                return res.status(404).json({ error: 'Scenario not found' });
            }

            const eras = await prisma.timeDetectiveScenario.findMany({
                select: { era: true },
                distinct: ['era']
            });

            res.json({
                scenario: randomScenario,
                allEras: eras.map(e => e.era),
                poolReset
            });
        } catch (error: any) {
            console.error('Error fetching random scenario:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}
