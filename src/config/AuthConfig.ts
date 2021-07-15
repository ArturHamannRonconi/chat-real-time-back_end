class AuthConfig
{
  private ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET
  private ACCESS_TOKEN_EXPIRATION = process.env.ACCESS_TOKEN_EXPIRATION
  
  private REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET
  private REFRESH_TOKEN_EXPIRATION = process.env.REFRESH_TOKEN_EXPIRATION

  public getAccessSecret(): string
  {
    return this.ACCESS_TOKEN_SECRET
  }
  public getAccessExpiration(): string
  {
    return this.ACCESS_TOKEN_EXPIRATION
  } 
  public getAccessAmountExpiration(): number
  {
    return Number(this.ACCESS_TOKEN_EXPIRATION.match(/(\d+)/)[0])
  }
  
  public getRefreshSecret(): string
  {
    return this.REFRESH_TOKEN_SECRET
  }
  public getRefreshExpiration(): string
  {
    return this.REFRESH_TOKEN_EXPIRATION
  }
  public getRefreshAmountExpiration(): number
  {
    return Number(this.REFRESH_TOKEN_EXPIRATION.match(/(\d+)/)[0])
  }
}

export default new AuthConfig()