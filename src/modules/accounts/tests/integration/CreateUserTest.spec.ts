import request from 'supertest'
import { Connection } from 'typeorm'

import app from '@shared/infra/http/app'
import getConnection from '@shared/infra/database'
import prePreparedData from '@utils/PrePreparedData'

describe('Create user integration test', () => {
  let connection: Connection
  
  const user = prePreparedData.getUserData()

  beforeAll(async () => connection = await getConnection())
  afterAll(async () => {
    await connection.dropDatabase()
    await connection.close()
  })
  
  it('Should be able to create a user', async () => {
    request(app)
      .post('/users')
      .send(user)
      .expect(201)
  })
})