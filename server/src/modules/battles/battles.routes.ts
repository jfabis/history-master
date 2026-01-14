import { Router } from 'express';
import { BattlesController } from './battles.controller';

const router = Router();

router.get('/random', BattlesController.getRandomBattle);
router.get('/', BattlesController.getAllBattles);

export default router;
