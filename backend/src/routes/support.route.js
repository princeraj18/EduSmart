import express from 'express'
import { createSupport, getAllSupport, getSupportById, updateSupport, getMySupport, getMySupportById } from '../controllers/support.controller.js'
import { protectAdmin, protectUserOrAdmin, protectRoute } from '../middleware/auth.middleware.js'

const router = express.Router()

// public endpoint for customers to create support requests
router.post('/create', createSupport)

// endpoints for users to fetch their own tickets
router.get('/my', protectRoute, getMySupport)
router.get('/my/:id', protectRoute, getMySupportById)

// admin endpoints
router.get('/', protectAdmin, getAllSupport)
router.get('/:id', protectAdmin, getSupportById)
router.patch('/:id', protectAdmin, updateSupport)

export default router
