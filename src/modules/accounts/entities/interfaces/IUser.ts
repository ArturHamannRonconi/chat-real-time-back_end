import IUserToken from '@accounts/entities/interfaces/IUserToken'

interface IUser
{
  id: string
  username: string
  email: string
  password: string
  tokens: IUserToken[]
  updated_at: Date
  created_at: Date
}

export default IUser