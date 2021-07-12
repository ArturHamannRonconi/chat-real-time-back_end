import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import IUser from '../interfaces/IUser'

@Entity('users')
class User implements IUser
{
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  username: string
  
  @Column()
  email: string

  @Column()
  password: string
  
  @UpdateDateColumn()
  updated_at: Date

  @CreateDateColumn()
  created_at: Date
}

export default User