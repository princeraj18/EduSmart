import express from 'express'
import { createSupport, getAllSupport, getSupportById, updateSupport } from '../controllers/support.controller.js'
import { protectAdmin, protectUserOrAdmin } from '../middleware/auth.middleware.js'

const router = express.Router()

// public endpoint for customers to create support requests
router.post('/create', createSupport)

// admin endpoints
router.get('/', protectAdmin, getAllSupport)
router.get('/:id', protectAdmin, getSupportById)
router.patch('/:id', protectAdmin, updateSupport)

export default router
