import IUserToken from '@accounts/entities/interfaces/IUserToken'
import IUser from '@accounts/entities/interfaces/IUser'

class UserToken implements IUserToken
{
  id: string
  token: string
  user_id: string
  user: IUser
  expires_date: Date
  updated_at: Date
  created_at: Date
}

export default UserToken