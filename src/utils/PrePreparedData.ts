import UserData from '@appTypes/accountsTypes/UserData'

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
}

export default new PrePreparedData()