import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Status } from './Status';

@Entity('tb_usuario')
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'text', name: 'nm_usu' })
  name: string

  @Column({ name: 'email_usu', unique: true })
  email: string

  @Column({ type: 'text', name: 'senha_usu' })
  password: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @ManyToOne(() => Status, status => status.users)
  @JoinColumn({ name: 'status_id' })
  status: Status
}