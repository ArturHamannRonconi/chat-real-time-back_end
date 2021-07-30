import DayjsDateProvider from '@shared/container/providers/implementations/dateProviders/DayjsDateProvider'
import IUserTokenRepository from '@accounts/repositories/interfaces/IUserTokenRepository'
import IDateProvider from '@shared/container/providers/interfaces/IDateProvider'
import IUserRepository from '@accounts/repositories/interfaces/IUserRepository'
import UserTokenRepository from '@accounts/repositories/mocks/TokenRepository'
import CreateUserTokensService from '@accounts/services/CreateUserTokensService'
import UserRepository from '@accounts/repositories/mocks/UserRepository'
import CreateUserService from '@accounts/services/CreateUserService'
import UserData from '@appTypes/accountsTypes/UserData'
import PrePreparedData from '@utils/PrePreparedData'
import { UnauthorizedError } from '@shared/errors'

describe('Create user tokens unit test', () => {
  let createUserTokensService: CreateUserTokensService
  let userTokenRepository: IUserTokenRepository
  let authorizationWithInvalidPassword: string
  let authorizationWithInvalidEmail: string
  let createUserService: CreateUserService
  let userRepository: IUserRepository
  let dateProvider: IDateProvider
  let authorization: string
  let user: UserData

  beforeAll(async () => {
    userTokenRepository = new UserTokenRepository()
    userRepository = new UserRepository()
    dateProvider = new DayjsDateProvider()
    createUserTokensService = new CreateUserTokensService(
      userTokenRepository,
      userRepository,
      dateProvider
    )
    createUserService = new CreateUserService(userRepository)
      
    user = PrePreparedData.getUserData()
    await createUserService.execute(user)
    
    authorization = Buffer
      .from(`${user.email}:${user.password}`)
      .toString('base64')
  
    authorizationWithInvalidEmail = Buffer
      .from(`invalid@email.com:${user.password}`)
      .toString('base64')
  
    authorizationWithInvalidPassword = Buffer
      .from(`${user.email}:invalidPassword`)
      .toString('base64')
  })

  it('Should be able to create a access and refresh token', async () => {
    const tokens = await createUserTokensService.execute(`Basic ${authorization}`)
  
    expect(tokens).toHaveProperty('access_token')
    expect(tokens).toHaveProperty('refresh_token')
  })

  it('Should not be able to create a access and refresh token if user has a incorrect email', async () => {
    const createTokens = createUserTokensService.execute(`Basic ${authorizationWithInvalidEmail}`) 
    
    await Promise.all([
      expect(createTokens).rejects.toThrow(UnauthorizedError),
      expect(createTokens).rejects.toThrow('Incorrect email and/or password')
    ])
  })

  it('Should not be able to create a access and refresh token if user has a incorrect password', async () => {
    const createTokens = createUserTokensService.execute(`Basic ${authorizationWithInvalidPassword}`) 
    
    await Promise.all([
      expect(createTokens).rejects.toThrow(UnauthorizedError),
      expect(createTokens).rejects.toThrow('Incorrect email and/or password')
    ])
  })
})