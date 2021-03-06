import IUserRepository from '@accounts/repositories/interfaces/IUserRepository'
import UserRepository from '@accounts/repositories/mocks/UserRepository'
import CreateUserService from '@accounts/services/CreateUserService'
import UserData from '@appTypes/accountsTypes/UserData'
import prePreparedData from '@utils/PrePreparedData'
import { ConflictError } from '@shared/errors'

describe('Creae user unit test', () => {
  let createUserService: CreateUserService
  let userRepository: IUserRepository
  let userData: UserData

  
  beforeAll(() => {
    userRepository = new UserRepository()
    createUserService = new CreateUserService(userRepository)
    
    userData = prePreparedData.getUserData()
  })

  it('Should be able to create a user', async () => {
    await createUserService.execute(userData)
    const user = await userRepository.getByEmail(userData.email)

    expect(user).toHaveProperty('id')
  })

  it('Should not be able to create a user if username already exists', async () => {
    const createUser = createUserService
      .execute({ ...userData, email: 'newemail@mail.com' })

    await Promise.all([
      expect(createUser).rejects.toThrow(ConflictError),
      expect(createUser).rejects.toThrow('Username already exists')
    ])
  })
  
  it('Should not be able to create a user if email already exists', async () => {
    const createUser = createUserService
      .execute({ ...userData, username: 'newUsername' })
    
    await Promise.all([
      expect(createUser).rejects.toThrow(ConflictError),
      expect(createUser).rejects.toThrow('Email already exists')
    ])
  })
})