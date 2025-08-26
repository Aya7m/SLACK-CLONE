import express from 'express'
import { GenerateStreamToken } from '../controller/chat.controller.js'
import { protectRoute } from '../middleware/auth.middleware.js'
const router = express.Router()

router.get('/token',protectRoute,GenerateStreamToken)
export default router