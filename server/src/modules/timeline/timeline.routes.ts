import { Router } from 'express';
import passport from 'passport';
import { TimelineController } from './timeline.controller';

const router = Router();
router.use(passport.authenticate('jwt', { session: false }));

router.get('/', TimelineController.getEvents);

export default router;