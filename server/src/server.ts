import dotenv from 'dotenv';
dotenv.config();

import { PrismaClient } from '@prisma/client';
import app from './app';

const PORT = process.env.PORT || 3000;
const prisma = new PrismaClient();

const startServer = async () => {
  try {
    console.log('⏳ [1/3] Uruchamianie serwera...');

    console.log('⏳ [2/3] Łączenie z bazą danych (Docker)...');
    await prisma.$connect();
    console.log('✅ [2/3] Połączono z bazą danych pomyślnie!');

    app.listen(PORT, () => {
      console.log(`
      ################################################
      🚀 [3/3] SERWER GOTOWY NA PORCIE: ${PORT} 🚀
      ################################################
      ➜ Backend:  http:
      ➜ Baza:     Połączona (127.0.0.1:5432)
      `);
    });
  } catch (error) {
    console.error('❌ BŁĄD KRYTYCZNY STARTU:', error);
    process.exit(1);
  }
};

if (require.main === module) {
  startServer();
}

export { startServer, app };