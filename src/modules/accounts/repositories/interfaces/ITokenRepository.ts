import TokenData from '@appTypes/userTypes/TokenData'

interface ITokenRepository
{
  create({ token, expires_date, user_id }: TokenData): Promise<void>
  deleteById(id: string): Promise<void>
  deleteByToken(token: string): Promise<void>
}

export default ITokenRepository