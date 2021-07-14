import IToken from '../interfaces/IToken'

class Token implements IToken
{
  id: string
  token: string
  user_id: string
  expires_date: Date
  updated_at: Date
  created_at: Date
}

export default Token