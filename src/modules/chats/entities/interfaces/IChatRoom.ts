import IUser from '@accounts/entities/interfaces/IUser'
import ChatScope from '@appTypes/chatsTypes/ChatScope'

interface IChatRoom
{
  id: string
  owner_id: string
  owner: IUser
  chat_scope: ChatScope
  max_amount_users: number
  created_at: Date
}

export default IChatRoom