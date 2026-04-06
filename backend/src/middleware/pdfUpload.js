import multer from 'multer'
import { CloudinaryStorage } from 'multer-storage-cloudinary'
import cloudinary from '../config/cloudinary.js'

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'pdfResources',
    resource_type: 'raw',
    allowed_formats: ['pdf'],
  },
})

export const pdfUpload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 50, // 50 MB
  },
})
