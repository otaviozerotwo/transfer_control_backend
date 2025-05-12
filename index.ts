import { AppDataSource } from './src/data-source';
import express from 'express';
import routes from './src/routes/routes';

AppDataSource.initialize().then(() => {
  const app = express();
  app.use(express.json());
  
  app.use(routes);
  
  const PORT = process.env.NODE_PORT as number | undefined;

  return app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});