import express from 'express'
import { adminRoute, protectRoute, protectAdmin, protectUserOrAdmin } from '../middleware/auth.middleware.js'
import { upload } from '../middleware/upload.js'
import { createCourse, getAllPurchasedCourse, getCourse, getPurchasedCourse, getSingleCourse, getAllOrdersAdmin, updateCourse, deleteCourse } from '../controllers/course.controller.js'


const courseRoute = express.Router()


courseRoute.post('/createCourse', protectAdmin, adminRoute, upload.single("thumbnail"), createCourse)

courseRoute.get('/getCourse', protectUserOrAdmin, getCourse)
courseRoute.get('/getSingleCourse/:id', protectUserOrAdmin, getSingleCourse)

courseRoute.get('/purchasedCourse/:id', protectRoute, getPurchasedCourse)

courseRoute.get('/getAllCoursePurchase', protectRoute, getAllPurchasedCourse)

courseRoute.patch('/updateCourse/:id', protectUserOrAdmin, adminRoute, upload.single("thumbnail"), updateCourse)
courseRoute.delete('/deleteCourse/:id', protectUserOrAdmin, adminRoute, deleteCourse)

// admin route to list all orders with user & course details
courseRoute.get('/admin/orders', protectAdmin, adminRoute, getAllOrdersAdmin)


export default courseRoute