import UserData from '@appTypes/userTypes/UserData'

class PrePreparedData
{
  public static getUserData(): UserData
  {
    return {
      username: 'user',
      email: 'user@mail.com',
      password: 'validPASS123'
    }
  }

  public static getUserDataWithInvalidPassword(): UserData
  {
    return {
      username: 'invalidPassword',
      email: 'invalidpassword@mail.com',
      password: 'invalidPassword'
    }
  }
}

export default PrePreparedData