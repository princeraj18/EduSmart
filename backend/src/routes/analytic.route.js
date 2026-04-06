import express from 'express'
import { adminRoute, protectAdmin } from '../middleware/auth.middleware.js'
import { getAnalyticsDataController, getDailyAnalytcController } from '../controllers/analytic.controller.js'


const analyticRoute = express.Router()


analyticRoute.get('/getAnalytic', protectAdmin, adminRoute, getAnalyticsDataController)
analyticRoute.get('/getDailyData', protectAdmin, adminRoute, getDailyAnalytcController)


export default analyticRoute