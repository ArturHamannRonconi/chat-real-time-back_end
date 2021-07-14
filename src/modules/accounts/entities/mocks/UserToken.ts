import IUserToken from '../interfaces/IUserToken'

class UserToken implements IUserToken
{
  id: string
  token: string
  user_id: string
  expires_date: Date
  updated_at: Date
  created_at: Date
}

export default UserToken