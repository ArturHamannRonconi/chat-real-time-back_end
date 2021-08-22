import ChatRoomData from '@appTypes/chatsTypes/ChatRoomData'
import IChatRoom from '@chats/entities/interfaces/IChatRoom'

interface IChatRoomRepository
{
  create({ owner_id, chat_scope, max_amount_users }: ChatRoomData): Promise<void>
  findById(id: string): Promise<IChatRoom>
  findByOwnerId(owner_id: string): Promise<IChatRoom>
  deleteById(id: string): Promise<void>
  deleteByOwnerId(owner_id: string): Promise<void>
}

export default IChatRoomRepository