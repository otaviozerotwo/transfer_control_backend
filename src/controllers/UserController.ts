import { Request, Response } from 'express';
import { userRepository } from '../repositories/userRepository';
import { statusRepository } from '../repositories/statusRepository';

export class UserController {
  async create(req: Request, res: Response): Promise<any>{
    const { name, email, password } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'O campo name é obrigatório e não foi informado'});
    } else if (!email) {
      return res.status(400).json({ message: 'O campo email é obrigatório e não foi informado'});
    } else if (!password) {
      return res.status(400).json({ message: 'O campo password é obrigatório e não foi informado'});
    } 

    try {
      const newUser = userRepository.create({
        name,
        email,
        password
      });

      await userRepository.save(newUser);
      
      return res.status(201).json(newUser);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}