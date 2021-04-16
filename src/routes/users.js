import express from 'express'
import { usersController } from '../controllers'
import { asyncMiddleware } from '../utils'
const router = express.Router()

router.post('/signup', asyncMiddleware(usersController.signUpUser))
router.post('/login', asyncMiddleware(usersController.userLogin))

export default router
