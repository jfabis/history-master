import { Router } from 'express';
import passport from 'passport';
import { TimeDetectiveController } from './time-detective.controller';

const router = Router();
const timeDetectiveController = new TimeDetectiveController();

router.use(passport.authenticate('jwt', { session: false }));

router.get('/random', timeDetectiveController.getRandomScenario);

export default router;
