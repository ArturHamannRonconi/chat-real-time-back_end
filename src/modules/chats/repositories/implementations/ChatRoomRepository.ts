import { getRepository, Repository } from 'typeorm'

import ChatRoomData from '@appTypes/chatsTypes/ChatRoomData'
import ChatRoom from '@chats/entities/implementations/ChatRoom'
import IChatRoomRepository from '../interfaces/IChatRoomRepository'

class ChatRoomRepository implements IChatRoomRepository
{
  private repository: Repository<ChatRoom>

  constructor()
  {
    this.repository = getRepository(ChatRoom)
  }

  public async create(chatRoomData: ChatRoomData): Promise<void>
  {
    const chatRoom = this.repository.create(chatRoomData)
    await this.repository.save(chatRoom)
  }

  public async findById(id: string): Promise<ChatRoom>
  {
    return this.repository.findOne(id)
  }

  public async findByOwnerId(owner_id: string): Promise<ChatRoom>
  {
    return this.repository.findOne({ owner_id })
  }

  public async deleteById(id: string): Promise<void>
  {
    this.repository.delete(id)
  }

  public async deleteByOwnerId(owner_id: string): Promise<void>
  {
    this.repository.delete({ owner_id })
  }
}

export default ChatRoomRepository