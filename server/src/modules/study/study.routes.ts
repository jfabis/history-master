import { Router } from 'express';
import passport from 'passport';
import { StudyController } from './study.controller';

const router = Router();
router.use(passport.authenticate('jwt', { session: false }));

router.get('/:topicId/cards', StudyController.getCards);

export default router;