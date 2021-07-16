import IChatRoom from '@chats/entities/interfaces/IChatRoom'
import ChatScope from '@appTypes/chatsTypes/ChatScope'

class ChatRoom implements IChatRoom
{
  id: string
  owner_id: string
  chat_scope: ChatScope
  max_amount_users: number
  created_at: Date
}

export default ChatRoom