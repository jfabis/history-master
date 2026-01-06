import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Upewniamy się, że zmienne środowiskowe są zdefiniowane
if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  throw new Error('Missing Google Client ID or Secret in .env file');
}

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
        
        if (!email) {
            return done(new Error('No email found in Google profile'));
        }

        // Upsert: Tworzymy nowego użytkownika lub aktualizujemy istniejącego
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
            // Inicjalizujemy pusty postęp dla nowego użytkownika
            progress: {
              create: {
                xp: 0,
                level: 1,
              }
            }
          },
        });

        return done(null, user);
      } catch (error) {
        return done(error as Error);
      }
    }
  )
);

// Serializacja nie jest krytyczna przy stateless JWT, ale passport jej wymaga
passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

export default passport;