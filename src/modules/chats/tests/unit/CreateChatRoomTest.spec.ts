import IChatRoomRepository from '@chats/repositories/interfaces/IChatRoomRepository'
import ChatRoomRepository from '@chats/repositories/mocks/ChatRoomRepository'
import CreateChatRoomService from '@chats/services/CreateChatRoomService'
import ChatRoomData from '@appTypes/chatsTypes/ChatRoomData'
import prePreparedData from '@utils/PrePreparedData'
import { BadRequestError, ConflictError } from '@shared/errors'

describe('Create chat room unit test', () => {
  let createChatRoomService: CreateChatRoomService
  let chatRoomExceedMaximumUsers: ChatRoomData
  let chatRoomRepository: IChatRoomRepository
  let privateChatRoom: ChatRoomData
  let publicChatRoom: ChatRoomData 

  beforeAll(async () => {
    chatRoomRepository = new ChatRoomRepository()
    createChatRoomService = new CreateChatRoomService(
      chatRoomRepository
    )
    publicChatRoom = prePreparedData.getPublicChatRoomData()
    privateChatRoom = prePreparedData.getPrivateChatRoomData()
    chatRoomExceedMaximumUsers = prePreparedData.getChatRoomWithExceededUsersNumber()
  })

  it('Should be able to create a public chat room', async () => {
    await createChatRoomService.execute(publicChatRoom)

    const chatRoom = await chatRoomRepository
      .findByOwnerId(publicChatRoom.owner_id)

    expect(chatRoom).toHaveProperty('id')
  })

  it('Should be able to create a private chat room', async () => {
    await createChatRoomService.execute(privateChatRoom)

    const chatRoom = await chatRoomRepository
      .findByOwnerId(privateChatRoom.owner_id)

    expect(chatRoom).toHaveProperty('id')
  })

  it('Should not be able to create a chat room wiht Exceeded maximum number of users', async () => {
    const createChatService = createChatRoomService
      .execute(chatRoomExceedMaximumUsers)
    
    await Promise.all([
      expect(createChatService).rejects.toThrow(BadRequestError),
      expect(createChatService).rejects.toThrow('Exceeded maximum number of users')
    ])
  })

  it('Should not be able to create a chat with the same owner', async () => {
    const createChatService = createChatRoomService
      .execute(publicChatRoom)
    
    await Promise.all([
      expect(createChatService).rejects.toThrow(ConflictError),
      expect(createChatService).rejects.toThrow('User already created chat room')
    ])
  })
})