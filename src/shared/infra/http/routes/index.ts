import { Router } from 'express'

import userRoutes from '@shared/infra/http/routes/user.routes'
import chatRoutes from '@shared/infra/http/routes/chat.routes'

const routes = Router()

routes.use('/user', userRoutes)
routes.use('/chat', chatRoutes)

export default routes