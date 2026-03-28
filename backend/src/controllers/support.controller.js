import { Support } from '../models/support.model.js'

export const createSupport = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body
    const userId = req.user?._id

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ success: false, message: 'All fields are required' })
    }

    const ticket = await Support.create({ name, email, subject, message, userId })

    return res.status(201).json({ success: true, message: 'Support request created', ticket })
  } catch (error) {
    console.error('createSupport error:', error)
    return res.status(500).json({ success: false, message: 'Server error' })
  }
}

export const getAllSupport = async (req, res) => {
  try {
    const tickets = await Support.find().sort({ createdAt: -1 }).populate('userId', 'fullName email').populate('assignedTo', 'name email')
    return res.status(200).json({ success: true, tickets })
  } catch (error) {
    console.error('getAllSupport error:', error)
    return res.status(500).json({ success: false, message: 'Server error' })
  }
}

export const getSupportById = async (req, res) => {
  try {
    const { id } = req.params
    const ticket = await Support.findById(id).populate('userId', 'fullName email').populate('assignedTo', 'name email')
    if (!ticket) return res.status(404).json({ success: false, message: 'Ticket not found' })
    return res.status(200).json({ success: true, ticket })
  } catch (error) {
    console.error('getSupportById error:', error)
    return res.status(500).json({ success: false, message: 'Server error' })
  }
}

export const updateSupport = async (req, res) => {
  try {
    const { id } = req.params
    const { status, adminReply } = req.body

    const update = {}
    if (status) update.status = status
    if (adminReply) update.adminReply = adminReply
    if (status === 'resolved') update.resolvedAt = new Date()
    // if admin is available, assign
    if (req.admin && !update.assignedTo) update.assignedTo = req.admin._id

    const ticket = await Support.findByIdAndUpdate(id, update, { new: true }).populate('userId', 'fullName email').populate('assignedTo', 'name email')

    if (!ticket) return res.status(404).json({ success: false, message: 'Ticket not found' })

    return res.status(200).json({ success: true, message: 'Ticket updated', ticket })
  } catch (error) {
    console.error('updateSupport error:', error)
    return res.status(500).json({ success: false, message: 'Server error' })
  }
}
