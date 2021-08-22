import IUserToken from '@accounts/entities/interfaces/IUserToken'
import IChatRoom from '@chats/entities/interfaces/IChatRoom'

interface IUser
{
  id: string
  username: string
  email: string
  password: string
  tokens: IUserToken[]
  room: IChatRoom
  updated_at: Date
  created_at: Date
}

export default IUser