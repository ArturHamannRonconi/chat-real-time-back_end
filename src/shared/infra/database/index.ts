import { Connection, createConnection, getConnectionOptions } from 'typeorm'

export default async (): Promise<Connection> => {
  const options = await getConnectionOptions()
  
  if(process.env.NODE_ENV === 'test')
    Object.assign(options, { port: 5433 })

  return createConnection(options)
}