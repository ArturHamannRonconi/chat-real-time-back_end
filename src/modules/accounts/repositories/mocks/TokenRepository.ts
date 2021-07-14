import { v4 as generateUUID } from 'uuid'

import UserToken from '@accounts/entities/mocks/UserToken'
import UserTokenData from '@appTypes/userTypes/UserTokenData'
import IUserTokenRepository from '../interfaces/IUserTokenRepository'

class UserTokenRepository implements IUserTokenRepository
{
  private repository: UserToken[]

  constructor()
  {
    this.repository = []
  }

  public async create(userTokenData: UserTokenData): Promise<void>
  {
    const userToken = Object.assign(new UserToken(), {
      ...userTokenData,
      id: generateUUID(),
      created_at: new Date(),
      updated_at: new Date()
    })

    this.repository.push(userToken)
  }

  public async deleteById(id: string): Promise<void>
  {
    const tokenIndex = this
      .repository.findIndex(userToken => userToken.id === id)

    this.repository.splice(tokenIndex, 1)
  }

  public async deleteByToken(token: string): Promise<void>
  {
    const tokenIndex = this
      .repository.findIndex(userToken => userToken.token === token)

    this.repository.splice(tokenIndex, 1)
  }
}

export default UserTokenRepository