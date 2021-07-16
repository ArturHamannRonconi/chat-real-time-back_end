import ChatRoomData from '@appTypes/chatsTypes/ChatRoomData'

interface IChatRoomRepository
{
  create({ owner_id, chat_scope, max_amount_users }: ChatRoomData): Promise<void>
  deleteById(id: string): Promise<void>
  deleteByOwnerId(owner_id: string): Promise<void>
}

export default IChatRoomRepository