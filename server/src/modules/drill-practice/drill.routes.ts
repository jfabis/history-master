import { Router } from 'express';
import passport from 'passport';
import { DrillController } from './drill.controller';

const router = Router();

// Zabezpieczamy wszystkie trasy - użytkownik musi być zalogowany
router.use(passport.authenticate('jwt', { session: false }));

router.get('/topics', DrillController.getTopics);
router.get('/:topicId/quiz', DrillController.getQuiz);
router.post('/answer', DrillController.submitAnswer);

export default router;
