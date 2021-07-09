import '@config/enviroment'
import '@config/connection'
import server from '@app/http/app'


server.listen(process.env.PORT, () => console.log('Server ir running...'))