import { Router } from 'express'

import createUserTokensController from '@accounts/controllers/CreateUserTokensController'
import createUserController from '@accounts/controllers/CreateUserController'

const userRoutes = Router()

userRoutes.route('/')
  .post(createUserController.handle)
  // .get() // Rota para o Menu Depois do LOGIN

userRoutes.route('/login')
  .post(createUserTokensController.handle)
  // .get() // Rota par o LOGIN

export default userRoutes