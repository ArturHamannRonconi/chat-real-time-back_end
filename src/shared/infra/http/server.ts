import '@config/enviroment'
import '@config/connection'
import server from '@shared/infra/http/app'

server.listen(process.env.PORT, () => console.log('Server ir running...'))