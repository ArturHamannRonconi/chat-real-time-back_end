import { Connection } from 'typeorm'
import request from 'supertest'

import UserData from '@appTypes/accountsTypes/UserData'
import getConnection from '@shared/infra/database'

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
      .post('/users')
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
}

export default PrepareTestEnviroment