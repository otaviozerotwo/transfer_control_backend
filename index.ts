import 'dotenv/config';
import express from 'express';
import authRoutes from './src/routes/authRoutes';

const app = express();
const PORT = process.env.NODE_PORT || 3001;
// app.use(express.json());

app.use('/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});