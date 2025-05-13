import 'dotenv/config';
import 'reflect-metadata';
import { DataSource } from 'typeorm';

const PORT = process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : undefined;

export const AppDataSource = new DataSource({
  type: 'mssql',
  host: process.env.DB_HOST,
  port: PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  logging: process.env.NODE_ENV === 'dev'? true : false,
  entities: [`${__dirname}/**/entities/*.{ts,js}`],
	migrations: [`${__dirname}/**/migrations/*.{ts,js}`],
  options: {
    encrypt: false,
    trustServerCertificate: true
  }
});