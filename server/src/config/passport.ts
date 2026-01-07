import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  throw new Error('Missing Google Client ID or Secret in .env file');
}

// 1. Strategia Google (Logowanie)
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL || '/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0].value;
        if (!email) return done(new Error('No email found'));

        const user = await prisma.user.upsert({
          where: { googleId: profile.id },
          update: {
            avatarUrl: profile.photos?.[0].value,
            displayName: profile.displayName,
          },
          create: {
            googleId: profile.id,
            email: email,
            displayName: profile.displayName,
            avatarUrl: profile.photos?.[0].value,
            progress: { create: { xp: 0, level: 1 } }
          },
        });
        return done(null, user);
      } catch (error) {
        return done(error as Error);
      }
    }
  )
);

// 2. Strategia JWT (Ochrona tras API takich jak /api/drill)
passport.use(
  new JwtStrategy(
    {
      // Pobieramy token z nagłówka "Authorization: Bearer <token>"
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET || 'secret', // Musi być taki sam jak w auth.controller.ts
    },
    async (payload, done) => {
      try {
        // Sprawdzamy, czy użytkownik z tokena istnieje w bazie
        const user = await prisma.user.findUnique({ where: { id: payload.id } });
        if (user) {
          return done(null, user); // Użytkownik znaleziony, przepuszczamy
        }
        return done(null, false);
      } catch (error) {
        return done(error, false);
      }
    }
  )
);

// Serializacja (wymagana przez passport, mimo że przy JWT rzadziej używana)
passport.serializeUser((user: any, done) => done(null, user.id));
passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

export default passport;