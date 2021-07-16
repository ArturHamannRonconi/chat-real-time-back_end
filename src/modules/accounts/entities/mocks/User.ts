import IUserToken from '@accounts/entities/interfaces/IUserToken'
import IUser from '@accounts/entities/interfaces/IUser'

class User implements IUser 
{
  id: string
  username: string
  email: string
  password: string
  tokens: IUserToken[]
  updated_at: Date
  created_at: Date
}

export default User