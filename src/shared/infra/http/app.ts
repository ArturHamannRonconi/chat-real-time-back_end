import express from 'express'
import 'express-async-errors'
import cors from 'cors'

import '@shared/container'
import routes from '@shared/infra/http/routes'
import showErrors from '@shared/infra/http/middlewares/ShowErrors'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(routes)
app.use(showErrors.handle)

export default app