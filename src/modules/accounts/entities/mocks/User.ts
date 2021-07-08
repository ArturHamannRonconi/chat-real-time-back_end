import IUser from '../interfaces/IUser'

class User implements IUser 
{
  id: string
  username: string
  email: string
  password: string
  updated_at: Date
  created_at: Date
}

export default User