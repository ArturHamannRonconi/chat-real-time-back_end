import { inject, injectable } from 'tsyringe'

import IChatRoomRepository from '@chats/repositories/interfaces/IChatRoomRepository'
import ChatRoomData from '@appTypes/chatsTypes/ChatRoomData'
import ChatScope from '@appTypes/chatsTypes/ChatScope'
import { BadRequestError, ConflictError } from '@shared/errors'

@injectable()
class CreateChatRoomService
{
  constructor(
    @inject('ChatRoomRepository')
    private chatRoomRepository: IChatRoomRepository
  ) {  }

  public async execute(chatRoomData: ChatRoomData): Promise<void>
  {
    const validChatScope = this
      .validIsChatScope(chatRoomData.chat_scope)

    const userAlreadyCreatedChatRoom = await this
      .chatRoomRepository
      .findByOwnerId(chatRoomData.owner_id)

    if(!validChatScope)
      throw new BadRequestError('Invalid chat scope')

    if(chatRoomData.max_amount_users > 10)
      throw new BadRequestError('Exceeded maximum number of users')

    if(userAlreadyCreatedChatRoom)
      throw new ConflictError('User already created chat room') 
    
    await this.chatRoomRepository.create(chatRoomData)
  }

  private validIsChatScope(chat_scope: ChatScope): boolean
  {
    return Object
      .values(ChatScope)
      .includes(chat_scope)
  }
}

export default CreateChatRoomService