import { Router } from 'express';
import passport from 'passport';
import { UsersController } from './users.controller';

const router = Router();

router.use(passport.authenticate('jwt', { session: false }));

router.get('/me', UsersController.getProfile);
router.put('/password', UsersController.changePassword);
router.post('/xp', UsersController.addXP);

export default router;