class AppError extends Error
{
  constructor(
    public message: string,
    public statusCode: number 
  )
  {
    super(message)
    Object.setPrototypeOf(this, AppError.prototype)
  }
}

export default AppError