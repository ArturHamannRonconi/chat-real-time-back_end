import '../../config/enviroment'
import '../../config/connection'
import server from './app'

server.listen(process.env.PORT, () => console.log('Server ir running...'))