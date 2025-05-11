import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Status } from './Status';

@Entity('tb_usuario')
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'text', length: 255, name: 'nm_usuario' })
  name: string

  @Column({ type: 'text', length: 255, name: 'email_usu' })
  email: string

  @Column({ type: 'text', length: 255, name: 'senha_usu' })
  password: string

  @ManyToOne(() => Status, (status) => status.id)
  status: Status
}