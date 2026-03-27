
import express from 'express'
import { RegisterAdmin, LoginAdmin, LogoutAdmin, GetAdmin } from '../controllers/admin.controller.js'
import { protectAdmin } from '../middleware/auth.middleware.js'

const adminRoute = express.Router()

adminRoute.post('/register', RegisterAdmin)
adminRoute.post('/login', LoginAdmin)
adminRoute.post('/logout', LogoutAdmin)
adminRoute.get('/me', protectAdmin, GetAdmin)

export default adminRoute
