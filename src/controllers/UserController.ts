import { Request, Response } from 'express';
import { userRepository } from '../repositories/userRepository';
import bcrypt from 'bcrypt';

export class UserController {
  async create(req: Request, res: Response): Promise<any>{
    try {
      const { name, email, password } = req.body;

      if (!name) {
        return res.status(400).json({ message: 'O campo name é obrigatório e não foi informado' });
      } else if (!email) {
        return res.status(400).json({ message: 'O campo email é obrigatório e não foi informado' });
      } else if (!password) {
        return res.status(400).json({ message: 'O campo password é obrigatório e não foi informado' });
      }
      
      const userExists = await userRepository.findOneBy({ email });

      if (userExists) {
        return res.status(400).json({ message: 'Este email já se encontra cadastrado' });
      }

      const hashPassword = await bcrypt.hash(password, 10);

      const newUser = userRepository.create({
        name,
        email,
        password: hashPassword
      })

      await userRepository.save(newUser);

      const { password: _, ...user } = newUser;
      
      return res.status(201).json(user);
    } catch (error) {
      console.log('Erro na criação do usuário:', error);
      return res.status(500).json({ message: 'Erro interno do servidor' });
    }
  }
}