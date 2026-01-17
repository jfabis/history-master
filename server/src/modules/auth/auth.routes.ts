import { Router } from 'express';
import passport from 'passport';
import { AuthController } from './auth.controller';

const router = Router();

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'], session: false, prompt: 'select_account' }));
router.get('/google/callback', passport.authenticate('google', { session: false, failureRedirect: '/login?error=failed' }), AuthController.handleGoogleCallback);

router.post('/register', AuthController.register);
router.post('/login', passport.authenticate('local', { session: false }), AuthController.login);
router.post('/refresh', AuthController.refreshToken);

export default router;