import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET;

type JwtPayload = {
  userId: number;
}

export const authMiddleware = async (req: Request, res:Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      res.status(401).json({ message: 'Não autorizado' });
      return;
    }

    const token = authorization.split(' ')[1];

    if (!token) {
      res.status(401).json({ message: 'Token inválido' });
      return;
    }

    if (!SECRET_KEY) {
      throw new Error('A chave secreta JWT não está definida.');
    }

    const { userId } = jwt.verify(token, SECRET_KEY) as JwtPayload;

    if (!userId) {
      res.status(401).json({ message: 'ID inválido no token' });
      return;
    }

    
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Token inválido ou expirado' });
  }
}