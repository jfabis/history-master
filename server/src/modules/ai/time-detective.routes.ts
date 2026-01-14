import { Router } from 'express';
import passport from 'passport';
import { TimeDetectiveController } from './time-detective.controller';

const router = Router();
const timeDetectiveController = new TimeDetectiveController();

// Wszystkie trasy tutaj są chronione (wymagają logowania)
router.use(passport.authenticate('jwt', { session: false }));

router.get('/random', timeDetectiveController.getRandomScenario);

export default router;
