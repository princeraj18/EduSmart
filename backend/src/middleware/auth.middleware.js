import jwt from 'jsonwebtoken'
import { ENV } from '../config/env.js'
import { User } from '../models/user.model.js'
import { Admin } from '../models/admin.model.js'

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.token

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required - No token provided'
      })
    }

    // ✅ JWT verify with proper error handling
    let decode
    try {
      decode = jwt.verify(token, ENV.JWT_SECRET)
    } catch (jwtError) {
      console.error('JWT verification failed:', jwtError.message)
      return res.status(401).json({
        success: false,
        message: 'Invalid or expired token',
        error: jwtError.message
      })
    }

    if (!decode || !decode.userId) {
      return res.status(401).json({
        success: false,
        message: 'Invalid token payload'
      })
    }

    const user = await User.findById(decode.userId).select('-password')

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User not found or deleted'
      })
    }

    req.user = user
    next()

  } catch (error) {
    console.error('ProtectRoute error:', error)
    // ✅ CRITICAL FIX: Response bhejo!
    return res.status(500).json({
      success: false,
      message: 'Authentication failed',
      error: error.message
    })
  }
}

// Allows authentication using either user cookie (`token`) or admin cookie (`adminToken`).
// Useful for shared resources that both roles should be able to read.
export const protectUserOrAdmin = async (req, res, next) => {
  const userToken = req.cookies?.token
  const adminToken = req.cookies?.adminToken

  // Try user auth first
  if (userToken) {
    try {
      const decode = jwt.verify(userToken, ENV.JWT_SECRET)
      if (decode?.userId) {
        const user = await User.findById(decode.userId).select('-password')
        if (user) {
          req.user = user
          return next()
        }
      }
    } catch (e) {
      // fall through to admin auth attempt
    }
  }

  // Try admin auth next
  if (adminToken) {
    try {
      const decode = jwt.verify(adminToken, ENV.JWT_SECRET)
      if (decode?.adminId) {
        const admin = await Admin.findById(decode.adminId).select('-password')
        if (admin) {
          req.admin = admin
          return next()
        }
      }
    } catch (e) {
      // fall through to failure response
    }
  }

  return res.status(401).json({
    success: false,
    message: 'Authentication required - No valid token provided'
  })
}

export const protectAdmin = async (req, res, next) => {
  try {
    const token = req.cookies.adminToken

    if (!token) {
      return res.status(401).json({ success: false, message: 'Admin authentication required' })
    }

    let decode
    try {
      decode = jwt.verify(token, ENV.JWT_SECRET)
    } catch (jwtError) {
      console.error('Admin JWT verification failed:', jwtError.message)
      return res.status(401).json({ success: false, message: 'Invalid or expired admin token' })
    }

    if (!decode || !decode.adminId) {
      return res.status(401).json({ success: false, message: 'Invalid admin token payload' })
    }

    const admin = await Admin.findById(decode.adminId).select('-password')
    if (!admin) return res.status(401).json({ success: false, message: 'Admin not found' })

    req.admin = admin
    next()
  } catch (error) {
    console.error('protectAdmin error:', error)
    return res.status(500).json({ success: false, message: 'Admin authentication failed' })
  }
}

export const adminRoute = async (req, res, next) => {
  try {
    if (req.admin) return next()
    // if (req.user && req.user.admin === true) return next()

    return res.status(403).json({ success: false, message: 'Admin access required' })
  } catch (error) {
    console.error('AdminRoute error:', error)
    return res.status(500).json({ success: false, message: 'Authorization failed' })
  }
}
