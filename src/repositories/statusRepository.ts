import { AppDataSource } from '../data-source';
import { Status } from '../entities/Status';

export const statusRepository = AppDataSource.getRepository(Status);