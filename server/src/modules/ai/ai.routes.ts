import { Router } from 'express';
import passport from 'passport';
import { AIController } from './ai.controller';
const router = Router();

router.use(passport.authenticate('jwt', { session: false }));

router.post('/generate', AIController.generate);
router.get('/history', AIController.getHistory);


export default router;