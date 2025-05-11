import { AppDataSource } from './src/data-source';
import express from 'express';
import authRoutes from './src/routes/authRoutes';


AppDataSource.initialize().then(() => {
  const app = express();
  app.use(express.json());
  
  app.use('/auth', authRoutes);
  
  const PORT = process.env.NODE_PORT as number | undefined;

  return app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});