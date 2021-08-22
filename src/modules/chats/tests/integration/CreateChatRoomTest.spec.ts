import request from 'supertest'
import { Connection } from 'typeorm'

import PrepareTestEnviroment from '@utils/PrepareTestEnviroment'
import app from '@shared/infra/http/app'
import PrePreparedData from '@utils/PrePreparedData'
import UserData from '@appTypes/accountsTypes/UserData'
import Tokens from '@appTypes/accountsTypes/Tokens'

describe('Create Chat Room Integration Test', () => {
  let prepare: PrepareTestEnviroment
  let connection: Connection
  let userThatCreatesPrivateChat: UserData
  let userThatCreatesPublicChat: UserData
  let tokens: Tokens
  let tokens2: Tokens

  beforeAll(async () => {
    prepare = new PrepareTestEnviroment(request(app))
    connection = await prepare.getTestConnection()

    userThatCreatesPrivateChat = PrePreparedData.getUserData()
    userThatCreatesPublicChat = PrePreparedData.getUserData2()
    await prepare.createUser(userThatCreatesPrivateChat)
    await prepare.createUser(userThatCreatesPublicChat)

    tokens = await prepare.getAccessToken(
      userThatCreatesPrivateChat.email,
      userThatCreatesPrivateChat.password
    )

    tokens2 = await prepare.getAccessToken(
      userThatCreatesPublicChat.email,
      userThatCreatesPublicChat.password
    )

  })
  afterAll(async () => await prepare.closeTestConnection(connection))

  it('Should be able to create a private chat room', async () => {
    await request(app)
      .post('/chat')
      .set({ Authorization: `Bearer ${tokens.access_token}` })
      .send({ chat_scope: 'private', max_amount_users: 10 })
      .expect(201)
  })

  it('Should be able to create a public chat room', async () => {
    await request(app)
      .post('/chat')
      .set({ Authorization: `Bearer ${tokens2.access_token}` })
      .send({ chat_scope: 'public', max_amount_users: 10 })
      .expect(201)
  })

  it('Should not be able to create a chat room that no has a valid scope', async () => {
    await request(app)
      .post('/chat')
      .set({ Authorization: `Bearer ${tokens2.access_token}` })
      .send({ chat_scope: 'invalid', max_amount_users: 10 })
      .expect(400)
  })

  it('Should not be able to create a chat room that no has a max amount users valid', async () => {
    await request(app)
      .post('/chat')
      .set({ Authorization: `Bearer ${tokens2.access_token}` })
      .send({ chat_scope: 'public', max_amount_users: 11 })
      .expect(400)
  })
})