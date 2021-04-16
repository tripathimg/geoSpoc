import express from 'express'
import { profilesController, uploadToLocal } from '../controllers'
import { asyncMiddleware } from '../utils'
const router = express.Router()

router.post('/upload', uploadToLocal(), asyncMiddleware(profilesController.addProfile))
router.get('/', asyncMiddleware(profilesController.getProfile))

export default router
