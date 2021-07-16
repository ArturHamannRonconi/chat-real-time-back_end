import { v4 as generateUUID } from 'uuid'

import IChatRoomRepository from '@chats/repositories/interfaces/IChatRoomRepository'
import ChatRoomData from '@appTypes/chatsTypes/ChatRoomData'
import ChatRoom from '@chats/entities/mocks/ChatRoom'

class ChatRoomRepository implements IChatRoomRepository
{
  private repository: ChatRoom[]

  constructor()
  {
    this.repository = []
  }

  public async create(chatRoomData: ChatRoomData): Promise<void>
  {
    const chatRoom = Object.assign(new ChatRoom(), {
      ...chatRoomData,
      id: generateUUID(),
      created_at: new Date()
    })

    this.repository.push(chatRoom)
  }

  public async deleteById(id: string): Promise<void>
  {
    const chatRoomIndex = this
      .repository
      .findIndex(chat => chat.id === id)

    this.repository.slice(chatRoomIndex, 1)
  }

  public async deleteByOwnerId(owner_id: string): Promise<void>
  {
    const chatRoomIndex = this
      .repository
      .findIndex(chat => chat.owner_id === owner_id)

    this.repository.slice(chatRoomIndex, 1)
  }
}

export default ChatRoomRepository