import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class TimeDetectiveController {

    async getRandomScenario(req: Request, res: Response) {
        try {
            const excludeIds = req.query.exclude ? (req.query.exclude as string).split(',') : [];

            const availableCount = await prisma.timeDetectiveScenario.count({
                where: {
                    id: { notIn: excludeIds }
                }
            });

            let randomScenario;
            let poolReset = false;

            if (availableCount > 0) {
                const skip = Math.floor(Math.random() * availableCount);
                randomScenario = await prisma.timeDetectiveScenario.findFirst({
                    where: {
                        id: { notIn: excludeIds }
                    },
                    skip: skip
                });
            } else {
                poolReset = true;
                const allCount = await prisma.timeDetectiveScenario.count();
                const skip = Math.floor(Math.random() * allCount);
                randomScenario = await prisma.timeDetectiveScenario.findFirst({
                    skip: skip
                });
            }

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
