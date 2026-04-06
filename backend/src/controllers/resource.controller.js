import { Resource } from '../models/resource.model.js'
import cloudinary from '../config/cloudinary.js'
import axios from 'axios'

const ALLOWED_CATEGORIES = [
  'Web Dev',
  'Data Analytics',
  'Management',
  'Version Control',
  'New Tool',
]

export const uploadResource = async (req, res) => {
  try {
    const { title, description, category } = req.body

    if (!title) {
      return res.status(400).json({ message: 'Title is required' })
    }

    if (!req.file) {
      return res.status(400).json({ message: 'PDF file is required' })
    }

    const fileUrl = req.file?.path || req.file?.secure_url || req.file?.url || ''
    const publicId = req.file?.filename || req.file?.public_id || ''
    const originalName = req.file?.originalname || ''
    const mimeType = req.file?.mimetype || ''
    const uploadedBy = req.admin?._id || null

    // validate category if provided
    let normalizedCategory = null
    if (category) {
      // allow case-insensitive matching to the allowed list
      const found = ALLOWED_CATEGORIES.find((c) => c.toLowerCase() === String(category).toLowerCase())
      if (!found) {
        return res.status(400).json({ message: `Invalid category. Allowed categories: ${ALLOWED_CATEGORIES.join(', ')}` })
      }
      normalizedCategory = found
    }

    const resource = await Resource.create({
      title,
      description,
      category: normalizedCategory,
      fileUrl,
      publicId,
      originalName,
      mimeType,
      uploadedBy,
    })

    return res.status(201).json({ message: 'Resource uploaded', resource })
  } catch (error) {
    console.error('uploadResource error:', error)
    return res.status(500).json({ message: error.message })
  }
}

export const getResources = async (req, res) => {
  try {
    const { category } = req.query
    const filter = {}
    if (category) filter.category = category

    const resources = await Resource.find(filter).sort({ createdAt: -1 })
    return res.status(200).json(resources)
  } catch (error) {
    console.error('getResources error:', error)
    return res.status(500).json({ message: error.message })
  }
}

export const getCategories = async (req, res) => {
  try {
    // Return fixed allowed categories so admins/users have consistent options
    return res.status(200).json(ALLOWED_CATEGORIES)
  } catch (error) {
    console.error('getCategories error:', error)
    return res.status(500).json({ message: error.message })
  }
}

export const getResourceById = async (req, res) => {
  try {
    const { id } = req.params
    const resource = await Resource.findById(id)
    if (!resource) return res.status(404).json({ message: 'Resource not found' })
    return res.status(200).json(resource)
  } catch (error) {
    console.error('getResourceById error:', error)
    return res.status(500).json({ message: error.message })
  }
}

export const downloadResource = async (req, res) => {
  try {
    const { id } = req.params
    const resource = await Resource.findById(id)
    if (!resource) return res.status(404).json({ message: 'Resource not found' })

    // Stream the file through the server so we can set appropriate headers
    const targetUrl = resource.fileUrl
    if (!targetUrl) return res.status(404).json({ message: 'File URL missing' })

    const filename = resource.originalName || `resource-${resource._id}.pdf`
    const contentType = resource.mimeType || 'application/pdf'

    const response = await axios.get(targetUrl, { responseType: 'stream' })

    res.setHeader('Content-Type', contentType)
    res.setHeader('Content-Disposition', `attachment; filename="${filename.replace(/\"/g, '')}"`)

    response.data.pipe(res)
  } catch (error) {
    console.error('downloadResource error:', error)
    return res.status(500).json({ message: error.message })
  }
}
