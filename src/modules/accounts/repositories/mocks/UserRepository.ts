import { v4 as generateUUID } from 'uuid'

import IUserRepository from '@accounts/repositories/interfaces/IUserRepository'
import UserData from '@appTypes/accountsTypes/UserData'
import User from '@accounts/entities/mocks/User'

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

  public async getById(id: string): Promise<User>
  {
    return this.repository.find(user => user.id === id)
  }

  public async getByEmail(email: string): Promise<User>
  {
    return this.repository.find(user => user.email === email)
  }

  public async getByUsername(username: string): Promise<User>
  {
    return this.repository.find(user => user.username === username)
  }
}

export default UserRepository