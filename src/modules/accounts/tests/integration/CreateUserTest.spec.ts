import request from 'supertest'
import { Connection } from 'typeorm'

import PrepareTestEnviroment from '@utils/PrepareTestEnviroment'
import UserData from '@appTypes/accountsTypes/UserData'
import prePreparedData from '@utils/PrePreparedData'
import app from '@shared/infra/http/app'

describe('Create user integration test', () => {
  let userWithInvalidFieldTypes: Record<string, unknown>
  let prepare: PrepareTestEnviroment
  let connection: Connection
  let user: UserData

  beforeAll(async () => {
    prepare = new PrepareTestEnviroment(request(app))
    connection = await prepare.getTestConnection()
    
    user = prePreparedData.getUserData()
    userWithInvalidFieldTypes = prePreparedData.getUserWithInvalidFieldTypes()
  })
  afterAll(async () => await prepare.closeTestConnection(connection))
  
  it('Should be able to create a user', async () => {
    await request(app)
      .post('/users')
      .send(user)
      .expect(201)
  })

  it('Should not be able to create a user with invalid field types', async () => {
    const response = await request(app)
      .post('/users')
      .send(userWithInvalidFieldTypes)
      .expect(400)

    expect(response.body).toHaveProperty('message', 'Invalid field types')
  })

  it('Should not be able to create a user with username already exists', async () => {
    const response = await request(app)
      .post('/users')
      .send(user)
      .expect(409)

    expect(response.body).toHaveProperty('message', 'Username already exists')
  })

  it('Should not be able to create a user with email already exists', async () => {
    const response = await request(app)
      .post('/users')
      .send({ ...user, username: 'newUserName' })
      .expect(409)

    expect(response.body).toHaveProperty('message', 'Email already exists')
  })
})