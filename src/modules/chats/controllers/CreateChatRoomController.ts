import CreateChatRoomService from '@chats/services/CreateChatRoomService'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

class CreateChatRoomController
{
  public async handle(request: Request, response: Response): Promise<void>
  {
    const { user_id } = request
    const { chat_scope, max_amount_users } = request.body

    const createChatRoomService = container.resolve(CreateChatRoomService)
    await createChatRoomService.execute({
      owner_id: user_id,
      chat_scope, max_amount_users
    })

    return response.status(201).end()
  }
}

export default new CreateChatRoomController()