import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

import UserToken from '@accounts/entities/implementations/UserToken'
import IUser from '@accounts/entities/interfaces/IUser'

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

  @OneToMany(() => UserToken, token => token.user)
  tokens: UserToken[]

  @UpdateDateColumn()
  updated_at: Date

  @CreateDateColumn()
  created_at: Date
}

export default User