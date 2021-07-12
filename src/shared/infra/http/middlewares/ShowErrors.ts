import AppError from '@shared/errors/AppError'
import { NextFunction, Request, Response } from 'express'

class ShowErrors
{
  public async handle(error: Error, request: Request, response: Response, next: NextFunction): Promise<Response>
  { 
    const { message } = error

    if(error instanceof AppError)
      return response.status(error.statusCode).json({ message })

    return response.status(500).json({ message })
  }
}

export default new ShowErrors()