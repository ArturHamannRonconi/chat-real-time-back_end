import { getRepository, Repository } from 'typeorm'

import IUserTokenRepository from '@accounts/repositories/interfaces/IUserTokenRepository'
import UserToken from '@accounts/entities/implementations/UserToken'
import UserTokenData from '@appTypes/accountsTypes/UserTokenData'

class UserTokenRepository implements IUserTokenRepository
{
  private repository: Repository<UserToken>

  constructor()
  {
    this.repository = getRepository(UserToken)
  }

  public async create(userTokenData: UserTokenData): Promise<void>
  {
    const userToken = this.repository.create(userTokenData)
    await this.repository.save(userToken)
  }

  public async deleteById(id: string): Promise<void>
  {
    await this.repository.delete(id)
  }

  public async deleteByToken(token: string): Promise<void>
  {
    await this.repository.delete({ token })
  }
}

export default UserTokenRepository