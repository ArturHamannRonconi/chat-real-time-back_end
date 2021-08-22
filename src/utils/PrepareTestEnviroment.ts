import { Connection } from 'typeorm'
import request from 'supertest'

import UserData from '@appTypes/accountsTypes/UserData'
import getConnection from '@shared/infra/database'
import Tokens from '@appTypes/accountsTypes/Tokens'

class PrepareTestEnviroment
{
  private request: request.SuperTest<request.Test>

  constructor(request: request.SuperTest<request.Test>)
  {
    this.request = request
  }

  public async createUser(user: UserData): Promise<void>
  {
    await this.request
      .post('/user')
      .send(user)
  }

  public async getTestConnection(): Promise<Connection>
  {
    return getConnection()
  }

  public async closeTestConnection(connection: Connection): Promise<void>
  {
    await connection.dropDatabase()
    await connection.close()
  }

  public async getAccessToken(email: string, password: string): Promise<Tokens>
  {
    const response = await this.request
      .post('/user/login')
      .auth(email, password)

    return response.body
  }
}

export default PrepareTestEnviroment