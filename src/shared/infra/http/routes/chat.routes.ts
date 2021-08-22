import { Router } from 'express'

import EnsureAuthentication from '@shared/infra/http/middlewares/EnsureAuthentication'
import CreateChatRoomController from '@chats/controllers/CreateChatRoomController'

const chatRoutes = Router()

chatRoutes.route('/')
  .post(
    EnsureAuthentication.handle,
    CreateChatRoomController.handle
  )
  // .get() // Rota para o chat

export default chatRoutes