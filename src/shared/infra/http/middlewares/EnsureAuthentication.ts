import { verify } from 'jsonwebtoken'
import { NextFunction, Request, Response } from 'express'

import { UnauthorizedError } from '@shared/errors'
import AuthConfig from '@config/AuthConfig'
import Payload from '@appTypes/accountsTypes/Payload'
import UserRepository from '@accounts/repositories/implementations/UserRepository'

class EnsureAuthentication
{
  public async handle(req: Request, res: Response, next: NextFunction): Promise<void>
  {
    const { authorization } = req.headers
    const [ hashType, token ] = authorization.split(' ')
    const userRepository = new UserRepository() 
    
    if(hashType !== 'Bearer')
      throw new UnauthorizedError('Necessary a Bearer token!')

    const { user_id } = verify(token, AuthConfig.getAccessSecret()) as Payload
    const userExists = userRepository.getById(user_id)
    
    if(!userExists) throw new UnauthorizedError('User not exists!')

    req.user_id = user_id
    next()
  }
}

export default new EnsureAuthentication()