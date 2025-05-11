import { Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User';

export class Status {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'text', length: 100, name: 'descricao' })
  description: string

  @OneToMany(() => User, (user) => user.status)
  users: User[]
}