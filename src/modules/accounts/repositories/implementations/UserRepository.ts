import { getRepository, Repository } from 'typeorm'

import IUserRepository from '@accounts/repositories/interfaces/IUserRepository'
import User from '@accounts/entities/implementations/User'
import UserData from '@appTypes/userTypes/UserData'

class UserRepository implements IUserRepository
{
  private repository: Repository<User>

  constructor()
  {
    this.repository = getRepository(User)
  }

  public async create(userData: UserData): Promise<void>
  {
    const user = this.repository.create(userData)
    await this.repository.save(user)
  }

  public async getById(id: string): Promise<User>
  {
    return this.repository.findOne(id)
  }

  public async getByEmail(email: string): Promise<User>
  {
    return this.repository.findOne({ email })
  }

  public async getByUsername(username: string): Promise<User>
  {
    return this.repository.findOne({ username })
  }
}

export default UserRepository