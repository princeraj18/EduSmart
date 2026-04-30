import YtResource from '../models/ytresource.model.js'
import cloudinary from '../config/cloudinary.js'

const CATEGORIES = ['frontend', 'backend', 'dsa', 'devops', 'fullstack']

export const uploadYtResource = async (req, res) => {
  try {
    const { title, description, category, level, type, youtubeUrl, playlistId } = req.body

    if (!title || !youtubeUrl) {
      return res.status(400).json({ message: 'Title and youtubeUrl are required' })
    }

    if (category && !CATEGORIES.includes(category)) {
      return res.status(400).json({ message: `Invalid category. Allowed: ${CATEGORIES.join(', ')}` })
    }

    let thumbnailUrl = ''
    let thumbnailPublicId = ''

    if (req.file) {
      const base64 = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`
      const uploadRes = await cloudinary.uploader.upload(base64, {
        folder: 'ytThumbnails',
        resource_type: 'image',
      })

      thumbnailUrl = uploadRes.secure_url
      thumbnailPublicId = uploadRes.public_id
    }

    const createdBy = req.admin?._id || req.admin?.email || 'admin'

    const resource = await YtResource.create({
      title,
      description,
      category,
      level,
      type,
      youtubeUrl,
      playlistId,
      thumbnailUrl,
      thumbnailPublicId,
      createdBy,
    })

    return res.status(201).json({ message: 'YT Resource created', resource })
  } catch (error) {
    console.error('uploadYtResource error:', error)
    return res.status(500).json({ message: error.message })
  }
}

export const getYtResources = async (req, res) => {
  try {
    const { category } = req.query
    const filter = {}
    if (category) filter.category = category

    const resources = await YtResource.find(filter).sort({ createdAt: -1 })
    return res.status(200).json(resources)
  } catch (error) {
    console.error('getYtResources error:', error)
    return res.status(500).json({ message: error.message })
  }
}

export const getYtCategories = async (req, res) => {
  try {
    return res.status(200).json(CATEGORIES)
  } catch (error) {
    console.error('getYtCategories error:', error)
    return res.status(500).json({ message: error.message })
  }
}

export const getYtResourceById = async (req, res) => {
  try {
    const { id } = req.params
    const resource = await YtResource.findById(id)
    if (!resource) return res.status(404).json({ message: 'Resource not found' })
    return res.status(200).json(resource)
  } catch (error) {
    console.error('getYtResourceById error:', error)
    return res.status(500).json({ message: error.message })
  }
}

export const updateYtResource = async (req, res) => {
  try {
    const { id } = req.params
    const resource = await YtResource.findById(id)
    if (!resource) return res.status(404).json({ message: 'Resource not found' })

    const { title, description, category, level, type, youtubeUrl, playlistId } = req.body

    if (category && !CATEGORIES.includes(category)) {
      return res.status(400).json({ message: `Invalid category. Allowed: ${CATEGORIES.join(', ')}` })
    }

    // If a new thumbnail file is provided, upload and replace the old one
    if (req.file) {
      const base64 = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`
      const uploadRes = await cloudinary.uploader.upload(base64, {
        folder: 'ytThumbnails',
        resource_type: 'image',
      })

      // delete previous thumbnail if present (best-effort)
      if (resource.thumbnailPublicId) {
        try {
          await cloudinary.uploader.destroy(resource.thumbnailPublicId, { resource_type: 'image' })
        } catch (e) {
          console.warn('failed to delete old thumbnail:', e.message)
        }
      }

      resource.thumbnailUrl = uploadRes.secure_url
      resource.thumbnailPublicId = uploadRes.public_id
    }

    // Update fields if provided
    if (title) resource.title = title
    if (description) resource.description = description
    if (category) resource.category = category
    if (level) resource.level = level
    if (type) resource.type = type
    if (youtubeUrl) resource.youtubeUrl = youtubeUrl
    if (playlistId) resource.playlistId = playlistId

    await resource.save()

    return res.status(200).json({ message: 'YT Resource updated', resource })
  } catch (error) {
    console.error('updateYtResource error:', error)
    return res.status(500).json({ message: error.message })
  }
}

export const deleteYtResource = async (req, res) => {
  try {
    const { id } = req.params
    const resource = await YtResource.findById(id)
    if (!resource) return res.status(404).json({ message: 'Resource not found' })

    if (resource.thumbnailPublicId) {
      try {
        await cloudinary.uploader.destroy(resource.thumbnailPublicId, { resource_type: 'image' })
      } catch (e) {
        console.warn('failed to delete thumbnail on resource delete:', e.message)
      }
    }

    await resource.deleteOne()
    return res.status(200).json({ message: 'YT Resource deleted', id })
  } catch (error) {
    console.error('deleteYtResource error:', error)
    return res.status(500).json({ message: error.message })
  }
}
