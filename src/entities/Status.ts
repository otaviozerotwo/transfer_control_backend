import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { User } from './User';

@Entity('tb_status')
export class Status {
  @PrimaryColumn()
  id: number

  @Column({ type: 'text', name: 'descricao' })
  description: string

  @OneToMany(() => User, user => user.status)
  users: User[]
}