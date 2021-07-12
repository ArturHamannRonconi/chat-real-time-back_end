import UserRepository from '@accounts/repositories/mocks/UserRepository'
import CreateUserService from '@accounts/services/CreateUserService'
import BadRequestError from 'shared/errors/BadRequestError'
import PrePreparedData from '@utils/PrePreparedData'
import ConflictError from 'shared/errors/ConflictError'

describe('Creae user unit test', () => {
  let createUserService: CreateUserService
  let userRepository: UserRepository
  
  const userData = PrePreparedData.getUserData()
  const userDataWithInvalidPassword = PrePreparedData.getUserDataWithInvalidPassword() 

  beforeAll(() => {
    userRepository = new UserRepository()
    createUserService = new CreateUserService(userRepository)
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

  it('Should not be able to create a user with invalid password', async () => {
    const createUser = createUserService.execute(userDataWithInvalidPassword)

    await Promise.all([
      expect(createUser).rejects.toThrow(BadRequestError),
      expect(createUser).rejects.toThrow('Invalid password')
    ])
  })
})