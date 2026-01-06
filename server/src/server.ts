import dotenv from 'dotenv';
// Ładujemy zmienne środowiskowe NA SAMYM POCZĄTKU
dotenv.config();

import app from './app';

const PORT = process.env.PORT || 3000;

const startServer = () => {
  try {
    app.listen(PORT, () => {
      console.log(`
      ################################################
      🛡️  HistoryMaster Server listening on port: ${PORT} 🛡️ 
      ################################################
      ➜ Local:    http://localhost:${PORT}
      ➜ Health:   http://localhost:${PORT}/health
      `);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();