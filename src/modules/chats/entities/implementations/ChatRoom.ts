import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm'

import ChatScope from '@appTypes/chatsTypes/ChatScope'
import IChatRoom from '@chats/entities/interfaces/IChatRoom'
import User from '@accounts/entities/implementations/User'

@Entity('chat_rooms')
class ChatRoom implements IChatRoom
{
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  owner_id: string
  
  @OneToOne(() => User, user => user.room)
  @JoinColumn({ name: 'owner_id' })
  owner: User

  @Column('enum', { enum: ChatScope })
  chat_scope: ChatScope
  
  @Column()
  max_amount_users: number
  
  @CreateDateColumn()
  created_at: Date
}

export default ChatRoom