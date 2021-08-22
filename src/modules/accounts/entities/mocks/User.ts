import IUserToken from '@accounts/entities/interfaces/IUserToken'
import IUser from '@accounts/entities/interfaces/IUser'
import ChatRoom from '@chats/entities/mocks/ChatRoom'

class User implements IUser 
{
  id: string
  username: string
  email: string
  password: string
  tokens: IUserToken[]
  room: ChatRoom
  updated_at: Date
  created_at: Date
}

export default User