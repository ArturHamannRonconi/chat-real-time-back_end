import express from 'express'
import 'express-async-errors'

import '@shared/container'
import routes from '@shared/infra/http/routes'
import showErrors from '@shared/infra/http/middlewares/ShowErrors'
import appConfig from '@config/appConfig'

const app = express()

app.use(appConfig)
app.use(routes)
app.use(showErrors.handle)

export default app