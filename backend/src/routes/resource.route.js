import express from 'express'
import { protectAdmin, protectRoute, adminRoute, protectUserOrAdmin } from '../middleware/auth.middleware.js'
import { uploadResource, getResources, getResourceById, downloadResource, getCategories } from '../controllers/resource.controller.js'
import { pdfUpload } from '../middleware/pdfUpload.js'

const resourceRoute = express.Router()

// Admin upload
resourceRoute.post('/upload', protectAdmin, adminRoute, pdfUpload.single('pdf'), uploadResource)

// Users (authenticated) can list resources
// Allow either authenticated users or admins to list and download resources
resourceRoute.get('/', protectUserOrAdmin, getResources)
resourceRoute.get('/categories', protectUserOrAdmin, getCategories)
resourceRoute.get('/:id/download', protectUserOrAdmin, downloadResource)
resourceRoute.get('/:id', protectUserOrAdmin, getResourceById)

export default resourceRoute
