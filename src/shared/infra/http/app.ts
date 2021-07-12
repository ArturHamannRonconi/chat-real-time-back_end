import express from 'express'
import 'express-async-errors'
import cors from 'cors'

import routes from '@shared/infra/http/routes'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(routes)

export default app