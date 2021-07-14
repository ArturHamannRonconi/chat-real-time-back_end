import express from 'express'
import cors from 'cors'

const appConfig = express()

appConfig.use(express.json())
appConfig.use(express.urlencoded({ extended: true }))
appConfig.use(express.static('public')) 
appConfig.use(cors())

export default appConfig