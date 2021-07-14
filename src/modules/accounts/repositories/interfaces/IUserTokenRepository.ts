import UserTokenData from '@appTypes/userTypes/UserTokenData'

interface IUserTokenRepository
{
  create({ token, expires_date, user_id }: UserTokenData): Promise<void>
  deleteById(id: string): Promise<void>
  deleteByToken(token: string): Promise<void>
}

export default IUserTokenRepository