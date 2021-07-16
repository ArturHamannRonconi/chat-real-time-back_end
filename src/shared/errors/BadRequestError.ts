import AppError from '@shared/errors/AppError'

class BadRequestError extends AppError
{
  constructor(public message: string)
  {
    super(message, 400)
    Object.setPrototypeOf(this, BadRequestError.prototype)
  }
}

export default BadRequestError