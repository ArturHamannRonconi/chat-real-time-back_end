import { inject, injectable } from 'tsyringe'
import { sign } from 'jsonwebtoken'
import { compare } from 'bcryptjs'

import IUserTokenRepository from '@accounts/repositories/interfaces/IUserTokenRepository'
import IDateProvider from '@shared/container/providers/interfaces/IDateProvider'
import IUserRepository from '@accounts/repositories/interfaces/IUserRepository'
import UnauthorizedError from '@shared/errors/UnauthorizedError'
import BadRequestError from '@shared/errors/BadRequestError'
import Tokens from '@appTypes/accountsTypes/Tokens'
import Login from '@appTypes/accountsTypes/Login'
import AuthConfig from '@config/AuthConfig'

@injectable()
class CreateUserTokensService
{
  constructor(
    @inject('UserTokenRepository')
    private userTokenRepository: IUserTokenRepository,
    @inject('UserRepository')
    private userRepository: IUserRepository,
    @inject('DateProvider')
    private dateProvider: IDateProvider
  ) {  }

  public async execute(authorization: string): Promise<Tokens>
  {
    this.protectedAtuhentication(authorization)
    const { email, password } = this.interpretUserCredentials(authorization)

    const user = await this.userRepository.getByEmail(email)
    const passwordCorrect = await compare(password, user?.password ?? password) 

    if(!user || !passwordCorrect)
      throw new UnauthorizedError('Incorrect email and/or password') 
 
    const tokens = this.getTokens(user.username)
    await this.addToken(tokens.refresh_token, user.id)
    
    return tokens
  }

  private protectedAtuhentication(authorization: string): void
  {
    if(!authorization)
      throw new BadRequestError('Necessary authorization field')

    if(typeof authorization !== 'string')
      throw new BadRequestError('Authorization must be a hash')
  }

  private interpretUserCredentials(authorization: string): Login
  {
    const [ hashType, hash ] = authorization.split(' ')

    if(hashType !== 'Basic')
      throw new BadRequestError('Is necessary Basic authorization')

    const credentials = Buffer
      .from(hash, 'base64')
      .toString('ascii')
      
    const [ email, password ] = credentials.split(':')

    return { email, password }
  }

  private getTokens(username: string): Tokens
  {
    const access_token = sign(
      { username },
      AuthConfig.getAccessSecret(),
      { expiresIn: AuthConfig.getAccessExpiration() }
    )
    const refresh_token = sign(
      { username },
      AuthConfig.getRefreshSecret(),
      { expiresIn: AuthConfig.getRefreshExpiration() }
    )
  
    return { access_token, refresh_token }
  }

  private async addToken(token: string, user_id: string): Promise<void>
  {
    const expires_date = this.dateProvider.addDays(
      AuthConfig.getRefreshAmountExpiration() 
    ) 

    return this.userTokenRepository.create({
      token,
      expires_date,
      user_id
    })
  }
}

export default CreateUserTokensService