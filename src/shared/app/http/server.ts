import '@config/enviroment'
import '@config/connection'
import server from '@shared/app/http/app'


server.listen(process.env.PORT, () => console.log('Server ir running...'))