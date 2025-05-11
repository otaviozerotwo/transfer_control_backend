import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User';

@Entity()
export class Status {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'text', name: 'descricao' })
  description: string

  @OneToMany(() => User, (user) => user.status)
  users: User[]
}