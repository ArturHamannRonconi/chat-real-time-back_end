import { Column, CreateDateColumn, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

import UserToken from '@accounts/entities/implementations/UserToken'
import IUser from '@accounts/entities/interfaces/IUser'
import ChatRoom from '@chats/entities/implementations/ChatRoom'

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

  @OneToOne(() => ChatRoom, room => room.owner)
  room: ChatRoom

  @UpdateDateColumn()
  updated_at: Date

  @CreateDateColumn()
  created_at: Date
}

export default User