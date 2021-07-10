import PasswordValidator from 'password-validator'
import { genSalt, hash } from 'bcryptjs'

import IUserRepository from '@accounts/repositories/interfaces/IUserRepository'
import BadRequestError from '@errors/BadRequestError'
import UserData from '@appTypes/userTypes/UserData'
import ConflictError from '@errors/ConflictError'

class CreateUserService
{
  constructor(
    private userRepository: IUserRepository
  ) {  }

  public async execute({ username, email, password }: UserData): Promise<void>
  {
    this.protectedUserData({ username, email, password })
    
    const [ hash ] = await this
      .getHashVerifyEmailAndUsername({username, email, password })

    this.verifyPasswordIsValid(password)
    await this.createUser({ username, email, password: hash })
  }

  private protectedUserData({ username, email, password }: UserData): void
  {
    const userDataHasInvalidFieldTypes =
      typeof username !== 'string'||
      typeof email !== 'string' ||
      typeof password !== 'string'

    if(userDataHasInvalidFieldTypes)
      new BadRequestError('Invalid field types')

    const userDataHasNullableFields =
      !username ||
      !email ||
      !password

    if(userDataHasNullableFields)
      new BadRequestError('Invalid nullable field')
  }

  private async getHashVerifyEmailAndUsername({ username, email, password }: UserData): Promise<[string, void, void]>
  {
    return Promise.all([
      this.getPasswordHash(password),
      this.verifyUsernameAlreadyExists(username),
      this.verifyEmailAlreadyExists(email)
    ])
  }

  private async getPasswordHash(password: string): Promise<string>
  {
    const salt = await genSalt()
    return hash(password, salt)
  }

  private async verifyUsernameAlreadyExists(username: string): Promise<void>
  {
    const usernameAlreadyExists = await this
      .userRepository
      .getByUsername(username)

    if(usernameAlreadyExists)
      throw new ConflictError('Username already exists')
  }

  private async verifyEmailAlreadyExists(email: string): Promise<void>
  {
    const emailAlreadyExists = await this
      .userRepository
      .getByEmail(email)

    if(emailAlreadyExists)
      throw new ConflictError('Email already exists')
  }

  private verifyPasswordIsValid(password: string): void
  {
    const schema = new PasswordValidator()
    schema
      .is().min(8)
      .is().max(100)
      .has().uppercase()
      .has().lowercase()
      .has().digits(2)
      .has().not().spaces()

    const passwordIsValid = schema.validate(password)

    if(!passwordIsValid)
      throw new BadRequestError('Invalid password')
  }

  private async createUser(userData: UserData): Promise<void>
  {
    return this.userRepository.create(userData)
  }
}

export default CreateUserService