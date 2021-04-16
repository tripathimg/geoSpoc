import express from 'express'
import { commentsController } from '../controllers'
import { asyncMiddleware } from '../utils'
const router = express.Router()

router.post('/', asyncMiddleware(commentsController.addComments))
router.get('/', asyncMiddleware(commentsController.getComments))

export default router
