import { Request, Response } from 'express';
import { userRepository } from '../repositories/userRepository';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
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

  async login(req: Request, res: Response): Promise<any>{
    const { email, password } = req.body;

    const user = await userRepository.findOneBy({ email });

    if (!user) {
      return res.status(400).json({ message: 'E-mail ou senha inválidos' });
    }

    const verifyPass = await bcrypt.compare(password, user.password);

    if (!verifyPass) {
      return res.status(400).json({ message: 'E-mail ou senha inválidos' });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET ?? '', { expiresIn: '8h' });

    const { password: _, ...userLogin } = user;

    return res.json({ user: userLogin, token });
  }

  async getProfile(req: Request, res: Response): Promise<any> {
    return res.json(req.user);
  }
}