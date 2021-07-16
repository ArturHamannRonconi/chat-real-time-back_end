import { Router } from 'express'

import createUserTokensController from '@accounts/controllers/CreateUserTokensController'
import createUserController from '@accounts/controllers/CreateUserController'

const userRoutes = Router()

userRoutes.route('/')
  .post(createUserController.handle)

userRoutes.route('/login')
  .post(createUserTokensController.handle)

export default userRoutes