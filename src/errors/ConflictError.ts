import AppError from './AppError'

class ConflictError extends AppError
{
  constructor(public message: string)
  {
    super(message, 409)
    Object.setPrototypeOf(this, ConflictError.prototype)
  }
}

export default ConflictError