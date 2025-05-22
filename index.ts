import { AppDataSource } from './src/data-source';
import express from 'express';
import routes from './src/routes/routes';
import cors from 'cors';

AppDataSource.initialize()
  .then(() => {
    const app = express();
    app.use(express.json());

    app.use(cors({
      origin: 'https://transfer-control-reset-pass-page.vercel.app',
      credentials: true
    }));
    
    app.use(routes);
    
    const PORT = process.env.NODE_PORT as number | undefined;

    return app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Erro ao iniciar a aplicação:', error);
    process.exit(1);
  });