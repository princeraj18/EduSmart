import express from 'express'
import { protectAdmin, protectUserOrAdmin, adminRoute } from '../middleware/auth.middleware.js'
import { uploadYtResource, getYtResources, getYtCategories, getYtResourceById, updateYtResource, deleteYtResource } from '../controllers/ytresource.controller.js'
import { upload } from '../middleware/upload.js'

const ytRoute = express.Router()

// Admin upload (thumbnail optional)
ytRoute.post('/upload', protectAdmin, adminRoute, upload.single('thumbnail'), uploadYtResource)

// List and categories (users or admins)
ytRoute.get('/', protectUserOrAdmin, getYtResources)
ytRoute.get('/categories', protectUserOrAdmin, getYtCategories)
ytRoute.get('/:id', protectUserOrAdmin, getYtResourceById)

// Admin update (optional thumbnail) and delete
ytRoute.put('/:id', protectAdmin, adminRoute, upload.single('thumbnail'), updateYtResource)
ytRoute.delete('/:id', protectAdmin, adminRoute, deleteYtResource)

export default ytRoute
