import { Router } from 'express'

import createUserController from '@accounts/controllers/CreateUserController'

const userRoutes = Router()

userRoutes.route('/')
  .post(createUserController.handle)

export default userRoutes