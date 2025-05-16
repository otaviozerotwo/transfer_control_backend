import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { userRepository } from '../repositories/userRepository';

const SECRET_KEY = process.env.JWT_SECRET;

type JwtPayload = {
  id: number;
}

export const authMiddleware = async (req: Request, res:Response, next: NextFunction): Promise<any> => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({ message: 'Não autorizado' });
    }

    const token = authorization.split(' ')[1];

    const { id } = jwt.verify(token, SECRET_KEY ?? '') as JwtPayload;

    const user = await userRepository.findOneBy({ id });

    if (!user) {
      return res.status(401).json({ message: 'Não autorizado' });
    }

    const { password: _, ...loggedUser } = user;

    req.user = loggedUser;

    next();

  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Token inválido ou expirado' });
  }
}