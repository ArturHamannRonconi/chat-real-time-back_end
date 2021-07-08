import { v4 as generateUUID } from 'uuid'

import UserData from '../../../../@types/appTypes/userTypes/UserData'
import User from '../../entities/mocks/User'
import IUserRepository from '../interfaces/IUserRepository'

class UserRepository implements IUserRepository
{
  private repository: User[]

  constructor()
  {
    this.repository = []
  }

  public async create(userData: UserData): Promise<void>
  {
    const user = Object.assign(new User(), {
      ...userData,
      id: generateUUID(),
      created_at: new Date(),
      updated_at: new Date()
    })

    this.repository.push(user)
  }
}

export default UserRepository