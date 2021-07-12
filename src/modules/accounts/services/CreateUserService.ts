import { inject, injectable } from 'tsyringe'
import { hash } from 'bcryptjs'

import IUserRepository from '@accounts/repositories/interfaces/IUserRepository'
import BadRequestError from '@shared/errors/BadRequestError'
import ConflictError from '@shared/errors/ConflictError'
import UserData from '@appTypes/userTypes/UserData'

@injectable()
class CreateUserService
{
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository
  ) {  }

  public async execute(userData: UserData): Promise<void>
  {
    const userDataHasInvalidFieldTypes = this.ensureCorrectTypes(userData)
    if(userDataHasInvalidFieldTypes) throw new BadRequestError('Invalid field types')
    
    const [ passwordHash, usernameAlreadyExists, emailAlreadyExists ] =
      await Promise.all([
        this.getPasswordHash(userData.password),
        this.verifyUsernameAlreadyExists(userData.username),
        this.verifyEmailAlreadyExists(userData.email)
      ])

    if(usernameAlreadyExists) throw new ConflictError('Username already exists')
    if(emailAlreadyExists) throw new ConflictError('Email already exists')

    await this.createUser({ ...userData, password: passwordHash })
  }

  private ensureCorrectTypes({ username, email, password }: UserData): boolean
  {
    return typeof username !== 'string'
    || typeof email !== 'string'
    || typeof password !== 'string'
  }

  private async getPasswordHash(password: string): Promise<string>
  {
    return hash(password, 10)
  }

  private async verifyUsernameAlreadyExists(username: string): Promise<boolean>
  {
    return !!await this.userRepository.getByUsername(username)
  }

  private async verifyEmailAlreadyExists(email: string): Promise<boolean>
  {
    return !!await this.userRepository.getByEmail(email)
  }

  private async createUser(userData: UserData): Promise<void>
  {
    return this.userRepository.create(userData)
  }
}

export default CreateUserService