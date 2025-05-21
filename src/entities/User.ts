import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('tb_usuario')
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'varchar', length: 255, name: 'nm_usu' })
  name: string

  @Column({ type: 'varchar', length: 255, name: 'email_usu', unique: true })
  email: string

  @Column({ type: 'varchar', length: 255, name: 'pass_usu' })
  password: string

  @Column({ type: 'int', name: 'st_usu', default: 1 })
  status: number

  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date
  
  @UpdateDateColumn({ type: 'datetime' })
  updatedAt: Date
  
  @Column({ type: 'varchar', length: 255, nullable: true })
  resetPasswordToken: string | null

  @Column({ type: 'datetime', nullable: true })
  resetPasswordExpires: Date | null

}