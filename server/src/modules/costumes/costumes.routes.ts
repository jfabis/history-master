import { Router } from 'express';
import { CostumesController } from './costumes.controller';

const router = Router();

router.get('/random', CostumesController.getRandomCostume);
router.get('/', CostumesController.getAllCostumes);

export default router;
