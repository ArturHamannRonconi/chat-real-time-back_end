import IUser from '@accounts/entities/interfaces/IUser'

interface IUserToken
{
  id: string
  token: string
  user_id: string
  user: IUser
  expires_date: Date
  updated_at: Date
  created_at: Date
}

export default IUserToken