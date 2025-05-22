import { Request, Response } from 'express';
import { userRepository } from '../repositories/userRepository';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { MoreThan } from 'typeorm';
import { sendResetPasswordEmail } from '../services/emailService';

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

  async forgotPassword(req: Request, res: Response): Promise<any> {
    try {
      const { email } = req.body;

      const user = await userRepository.findOneBy({ email });

      if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado.' });
      }

      const token = crypto.randomBytes(32).toString('hex');
      const tokenExpiry = new Date(Date.now() + 900000);

      user.resetPasswordToken = token;
      user.resetPasswordExpires = tokenExpiry;

      await userRepository.save(user);
      
      await sendResetPasswordEmail(user.email, token);
      console.log('token recuperação senha:', token);
      
      return res.json({ message: 'E-mail de recuperação enviado com sucesso!' });
    } catch (error) {
      console.log('Erro na solicitação de recuperação de senha:', error);
      
      return res.status(500).json({ message: 'Erro ao solicitar recuperação de senha:' });
    }
  }

  async resetPassword(req: Request, res: Response): Promise<any> {
    try {
      const { token, newPassword } = req.body;

      const user = await userRepository.findOneBy({
        resetPasswordToken: token,
        resetPasswordExpires: MoreThan(new Date())
      });

      if (!user) {
        return res.status(400).json({ message: 'Token inválido ou expirado.' });
      }

      const hashPassword = await bcrypt.hash(newPassword, 10);

      user.password = hashPassword;
      user.resetPasswordToken = null;
      user.resetPasswordExpires = null;

      await userRepository.save(user);

      return res.json({ message: 'Senha redefinida com sucesso!' });
    } catch (error) {
      console.log('Erro ao redefinir senha:', error);
      
      return res.status(500).json({ message: 'Ero ao redefinir senha.' });
    }
  }
}