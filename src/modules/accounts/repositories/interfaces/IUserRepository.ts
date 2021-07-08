import UserData from '../../../../@types/appTypes/userTypes/UserData'

interface IUserRepository
{
  create({ username, email, password }: UserData): Promise<void>
}

export default IUserRepository