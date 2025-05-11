import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from './entity/User';

const PORT = process.env.DB_PORT as number | undefined;

export const AppDataSource = new DataSource({
  type: 'mssql',
  host: process.env.DB_HOST,
  port: PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: true,
  entities: [User],
});