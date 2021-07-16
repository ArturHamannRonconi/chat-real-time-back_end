import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

import IUserToken from '@accounts/entities/interfaces/IUserToken'
import User from '@accounts/entities/implementations/User'

@Entity('user_tokens')
class UserToken implements IUserToken
{
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  token: string
  
  @Column()
  user_id: string
  
  @ManyToOne(() => User, user => user.tokens)
  @JoinColumn({ name: 'user_id' })
  user: User

  @Column()
  expires_date: Date
  
  @UpdateDateColumn()
  updated_at: Date

  @CreateDateColumn()
  created_at: Date
}

export default UserToken