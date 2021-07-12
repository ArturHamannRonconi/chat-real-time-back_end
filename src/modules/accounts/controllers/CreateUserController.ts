import { Request, Response } from 'express'
import { container } from 'tsyringe'

import CreateUserService from '@accounts/services/CreateUserService'

class CreateUserController
{
  public async handle(request: Request, response: Response): Promise<void>
  {
    const { username, email, password } = request.body

    const createUserService = container.resolve(CreateUserService)
    await createUserService.execute({ username, email, password })

    return response.status(201).end()
  }
}

export default new CreateUserController()