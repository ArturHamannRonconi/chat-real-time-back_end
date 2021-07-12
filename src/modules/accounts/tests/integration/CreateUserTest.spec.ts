import request from 'supertest'
import { Connection } from 'typeorm'

import app from '@shared/infra/http/app'
import getConnection from '@shared/infra/database'
import prePreparedData from '@utils/PrePreparedData'

describe('Create user integration test', () => {
  let connection: Connection
  
  const user = prePreparedData.getUserData()
  const userWithInvalidFieldTypes = prePreparedData.getUserWithInvalidFieldTypes()

  beforeAll(async () => connection = await getConnection())
  afterAll(async () => {
    await connection.dropDatabase()
    await connection.close()
  })
  
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