import IUser from '@accounts/entities/interfaces/IUser'
import UserData from '@appTypes/userTypes/UserData'

interface IUserRepository
{
  create({ username, email, password }: UserData): Promise<void>
  getById(id: string): Promise<IUser>
  getByEmail(email: string): Promise<IUser>
  getByUsername(username: string): Promise<IUser>
}

export default IUserRepository