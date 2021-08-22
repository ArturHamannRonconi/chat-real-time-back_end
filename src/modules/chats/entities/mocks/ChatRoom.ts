import IChatRoom from '@chats/entities/interfaces/IChatRoom'
import ChatScope from '@appTypes/chatsTypes/ChatScope'
import User from '@accounts/entities/mocks/User'

class ChatRoom implements IChatRoom
{
  id: string
  owner_id: string
  owner: User
  chat_scope: ChatScope
  max_amount_users: number
  created_at: Date
}

export default ChatRoom