import { Connection } from 'typeorm'
import request from 'supertest'

import PrepareTestEnviroment from '@utils/PrepareTestEnviroment'
import UserData from '@appTypes/accountsTypes/UserData'
import PrePreparedData from '@utils/PrePreparedData'
import app from '@shared/infra/http/app'

describe('Create user tokens integration test', () => {
  let prepare: PrepareTestEnviroment
  let connection: Connection
  let user: UserData

  beforeAll(async () => {
    prepare = new PrepareTestEnviroment(request(app))
    connection = await prepare.getTestConnection()
    
    user = PrePreparedData.getUserData()
    await prepare.createUser(user)
  })
  afterAll(async () => await prepare.closeTestConnection(connection))


  it('Should be able to get a user tokens', async () => {
    const response = await request(app)
      .post('/user/login')
      .auth(user.email, user.password)
      .expect(200)

    expect(response.body).toHaveProperty('access_token')
    expect(response.body).toHaveProperty('refresh_token')
  })

  it('Should not be able to get a user tokens if no has authorization field', async () => {
    const response = await request(app)
      .post('/user/login')
      .expect(400)

    expect(response.body)
      .toHaveProperty('message', 'Necessary authorization field')
  })

  it('Should not be able to get a user tokens if authorization no has Basic Auth', async () => {
    const response = await request(app)
      .post('/user/login')
      .set('Authorization', 'Bearer ...')
      .expect(400)

    expect(response.body)
      .toHaveProperty('message', 'Is necessary Basic authorization')
  })

  it('Should not be able to get a user tokens with invalid email', async () => {
    const response = await request(app)
      .post('/user/login')
      .auth('invalid@mail.com', user.password)
      .expect(401)

    expect(response.body)
      .toHaveProperty('message', 'Incorrect email and/or password')
  })

  it('Should not be able to get a user tokens with invalid password', async () => {
    const response = await request(app)
      .post('/user/login')
      .auth(user.email, 'invalidPassword')
      .expect(401)

    expect(response.body)
      .toHaveProperty('message', 'Incorrect email and/or password')
  })
})