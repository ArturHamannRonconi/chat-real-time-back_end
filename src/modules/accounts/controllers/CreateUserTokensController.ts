import { Request, Response } from 'express'
import { container } from 'tsyringe'

import CreateUserTokensService from '@accounts/services/CreateUserTokensService'

class CreateUserTokensController
{
  public async handle(request: Request, response: Response): Promise<Response>
  {
    const { authorization } = request.headers

    const createUserTokensService = container.resolve(CreateUserTokensService)
  
    const tokens = await createUserTokensService.execute(authorization)

    return response.json(tokens)
  }
}

export default new CreateUserTokensController()