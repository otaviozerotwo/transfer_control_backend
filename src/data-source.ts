import 'dotenv/config';
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from './entity/User';
import { Status } from './entity/Status';

const PORT = process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : undefined;

export const AppDataSource = new DataSource({
  type: 'mssql',
  host: process.env.DB_HOST,
  port: PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: true,
  entities: [User, Status],
  options: {
    encrypt: false,
    trustServerCertificate: true
  }
});