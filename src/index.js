import express from 'express'
import bodyParser from 'body-parser'
import jwt from 'express-jwt'
import { Routes } from './routes'
import { connectMongo, JWT_CONFIG } from './config'
import { apiKeyAuth } from './utils'
// Initiate express
const app = express()
app.use(bodyParser.json({ limit: '5mb' }))
app.use(bodyParser.urlencoded({ limit: '5mb', extended: true, parameterLimit: 50 }))
app.use(apiKeyAuth)
app.use(express.static(`${__dirname}/public`))
app.use(jwt({ secret: JWT_CONFIG.SECERET, resultProperty: 'user' }).unless({ path: JWT_CONFIG.NO_AUTH_PATHS }))
// Create MongoDB connection
connectMongo()

// Initiate all routes
Routes(app)

export { app }
