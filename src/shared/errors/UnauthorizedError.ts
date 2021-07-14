import AppError from './AppError'

class UnauthorizedError extends AppError
{
  constructor(message: string)
  {
    super(message, 401)
    Object.setPrototypeOf(this, UnauthorizedError.prototype)
  }
}

export default UnauthorizedError