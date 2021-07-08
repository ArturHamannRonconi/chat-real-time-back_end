import { Router } from 'express'

const userRoutes = Router()

userRoutes.route('/')
  .post()

export default userRoutes