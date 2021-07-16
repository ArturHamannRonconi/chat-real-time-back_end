import ChatScope from './ChatScope'

interface ChatRoomData
{
  owner_id: string
  chat_scope: ChatScope
  max_amount_users: number
}

export default ChatRoomData