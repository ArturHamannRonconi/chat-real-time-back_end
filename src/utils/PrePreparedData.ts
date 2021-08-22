import UserData from '@appTypes/accountsTypes/UserData'
import ChatRoomData from '@appTypes/chatsTypes/ChatRoomData'
import ChatScope from '@appTypes/chatsTypes/ChatScope'

class PrePreparedData
{
  public getUserData(): UserData
  {
    return {
      username: 'user',
      email: 'user@mail.com',
      password: 'validPASS123'
    }
  }

  public getUserData2(): UserData
  {
    return {
      username: 'user2',
      email: 'user2@mail.com',
      password: 'validPASS123'
    }
  }

  public getUserDataWithInvalidPassword(): UserData
  {
    return {
      username: 'invalidPassword',
      email: 'invalidpassword@mail.com',
      password: 'invalidPassword'
    }
  }

  public getUserWithInvalidFieldTypes(): Record<string, unknown>
  {
    return {
      email: 32,
      username: true,
      password: 'a12'
    }
  }

  public getPublicChatRoomData(): ChatRoomData
  {
    return {
      owner_id: '69e3c8ac-7856-485b-8865-045249613be7',
      chat_scope: ChatScope.PUBLIC,
      max_amount_users: 10
    }
  }

  public getPrivateChatRoomData(): ChatRoomData
  {
    return {
      owner_id: 'c5ac92be-f171-11eb-9a03-0242ac130003',
      chat_scope: ChatScope.PRIVATE,
      max_amount_users: 10
    }
  }

  public getChatRoomWithExceededUsersNumber(): ChatRoomData
  {
    return {
      owner_id: '33ab95a6-f174-11eb-9a03-0242ac130003',
      chat_scope: ChatScope.PRIVATE,
      max_amount_users: 200
    }
  }
}

export default new PrePreparedData()