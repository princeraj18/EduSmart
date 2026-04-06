import mongoose from 'mongoose'

const resourceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  fileUrl: { type: String, required: true },
  publicId: { type: String },
  category: { type: String },
  originalName: { type: String },
  mimeType: { type: String },
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' },
}, { timestamps: true })

export const Resource = mongoose.model('Resource', resourceSchema)
