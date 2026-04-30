import cloudinary from "../config/cloudinary.js";
import { ENV } from "../config/env.js";
import { Course } from "../models/course.model.js";
import { GoogleGenerativeAI } from '@google/generative-ai'
import { User } from "../models/user.model.js"; 
import {Modules} from '../models/module.model.js'
import { Order } from "../models/order.model.js";
import { Comment } from "../models/comment.model.js";
import { Enrollment } from "../models/enrollment.model.js";
const genAI = new GoogleGenerativeAI(ENV.GEMINI_API_KEY)
const model = genAI.getGenerativeModel({model:'gemini-2.5-flash'})

const ALLOWED_CATEGORIES = ['Web Dev', 'Data Analytics', 'Management', 'Version Control', 'New Tool']

export const createCourse = async (req, res) => {
    try {
    const { title, description, amount, category } = req.body
      const thumbnail = req.file
  
    //   console.log("ADMIN:", req.admin)
    //   console.log("FILE:", thumbnail)
  
      if (!title || !description || !amount) {
        return res.status(400).json({
          message: "Please provide all details"
        })
      }
  
      if (!thumbnail) {
        return res.status(400).json({
          success: false,
          message: "Thumbnail image is required"
        })
      }
  
      const base64 = `data:${thumbnail.mimetype};base64,${thumbnail.buffer.toString("base64")}`
  
      const uploadRes = await cloudinary.uploader.upload(base64, {
        folder: "lmsYT"
      })
  
            // validate category if provided
            let normalizedCategory = null
            if (category) {
                const found = ALLOWED_CATEGORIES.find(c => c.toLowerCase() === String(category).toLowerCase())
                if (!found) {
                    return res.status(400).json({ message: `Invalid category. Allowed: ${ALLOWED_CATEGORIES.join(', ')}` })
                }
                normalizedCategory = found
            }

            const newCourse = new Course({
        userId: req.admin._id,   // ✅ FIXED
        title,
        description,
        thumbnail: uploadRes.secure_url,
                amount,
                category: normalizedCategory
      })
  
      await newCourse.save()
  
      return res.status(201).json({
        message: "Course Created Successfully",
        newCourse
      })
  
    } catch (error) {
      console.log("CREATE COURSE ERROR:", error)
  
      return res.status(500).json({
        success: false,
        message: "Failed to create course",
        error: error.message
      })
    }
  }


export const getCourse = async(req, res)=>{
    try {
        
        const {search}  = req.query;

        // If no search provided, return all courses
        if(!search || search.trim() === ""){
            const allCourses = await Course.find().lean()

            // enrich courses with per-course enrolled (unique students) counts
            if (allCourses && allCourses.length > 0) {
                try {
                    const courseIds = allCourses.map((c) => c._id)
                    const counts = await Enrollment.aggregate([
                        { $match: { courseId: { $in: courseIds } } },
                        { $group: { _id: '$courseId', users: { $addToSet: '$userId' } } },
                        { $project: { count: { $size: '$users' } } }
                    ])

                    const countMap = {}
                    counts.forEach((row) => { countMap[String(row._id)] = row.count })

                    for (const c of allCourses) {
                        c.enrolled = countMap[String(c._id)] || 0
                    }
                } catch (e) {
                    console.warn('Failed to compute per-course enrollments:', e.message)
                }
            }

            return res.status(200).json({
                success:true,
                courses:allCourses,
                count: allCourses.length
            })
        }

        // Build a safe RegExp from the user input. If input is invalid regex,
        // fall back to escaped literal matching.
        let regex
        try{
            regex = new RegExp(search, 'i')
        }catch(err){
            const escaped = search.replace(/[.*+?^${}()|[\\]\\]/g, "\\$&")
            regex = new RegExp(escaped, 'i')
        }

        const mongoQuery = {
            $or: [
                { title: { $regex: regex } },
                { description: { $regex: regex } }
            ]
        }

        const courses = await Course.find(mongoQuery).lean()

        return res.status(200).json({
            success:true,
            courses,
            count:courses.length,
            searchTerm: search
        })


    



    } catch (error) {
        console.log(`error from getCourse, ${error}`)
    }
}



export const getSingleCourse=async(req,res)=>{
    try {
        const courseId = req.params.id;

        const course = await Course.findById(courseId).populate("modules")


        if(!course){
            return res.status(401).json({
                message:"Course not found"
            })
        }


        return res.status(201).json(course)
    } catch (error) {
        console.log(error ," from get single course")
    }
}


// user ne 4 course purchase kiye 
// lekin ab user jo hai woh kisi ek course se padhna chahta hai 
// toh user kisi ek course koi padhen k liye selecte karega toh uske liye humne getpurchase course ka controller create kiye hai yeh apko ek single course provide karega from purchased course

export const getPurchasedCourse = async(req,res)=>{
    try {
        const courseId = req.params.id;

        if(!courseId){
            return res.status(401).json({
                message:"course not found"
            })
        }

        const purchasedOrder = await Course.findById(courseId).populate("modules")


        if(!purchasedOrder){
            return res.status(401).json({
                message:"Course not found"
            })
        }


        return res.status(201).json(purchasedOrder)
    } catch (error) {
        console.log(error, "from getPurchased course")
    }
}


export const getAllPurchasedCourse = async(req,res)=>{
    try {
        const userId = req.user._id

        const user = await User.findById(userId).populate("purchasedCourse")

        if(!user){
            return res.status(401).json({
                message:"User not found"
            })
        }

        return res.status(201).json(user)
    } catch (error) {
        console.log(error)
    }
}


export const getAllOrdersAdmin = async (req, res) => {
    try {
        // Admin-only: return all orders with user and course details
        const orders = await Order.find()
            .populate('user', 'fullName email')
            .populate('course', 'title amount')
            .sort({ createdAt: -1 })

        return res.status(200).json({ success: true, orders })
    } catch (error) {
        console.log('error from getAllOrdersAdmin', error)
        return res.status(500).json({ success: false, message: 'Failed to fetch orders' })
    }
}

export const updateCourse = async (req, res) => {
    try {
          const courseId = req.params.id
              const { title, description, amount, category } = req.body

        if (!courseId) {
            return res.status(400).json({ success: false, message: 'Course id is required' })
        }

        const updateData = {}

        if (title !== undefined) updateData.title = title
        if (description !== undefined) updateData.description = description
        if (amount !== undefined) updateData.amount = Number(amount)
        if (category !== undefined) {
            // validate category
            const found = ALLOWED_CATEGORIES.find(c => c.toLowerCase() === String(category).toLowerCase())
            if (!found && category !== null && category !== '') {
                return res.status(400).json({ success: false, message: `Invalid category. Allowed: ${ALLOWED_CATEGORIES.join(', ')}` })
            }
            updateData.category = found || null
        }

        if (req.file) {
            const base64 = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`
            const uploadRes = await cloudinary.uploader.upload(base64, { folder: "lmsYT" })
            updateData.thumbnail = uploadRes.secure_url
        }

        if (Object.keys(updateData).length === 0) {
            return res.status(400).json({ success: false, message: 'No fields provided to update' })
        }

        const updated = await Course.findByIdAndUpdate(courseId, { $set: updateData }, { new: true })
        if (!updated) {
            return res.status(404).json({ success: false, message: 'Course not found' })
        }

        return res.status(200).json({ success: true, message: 'Course updated successfully', course: updated })
    } catch (error) {
        console.log(`error from updateCourse, ${error}`)
        return res.status(500).json({ success: false, message: 'Failed to update course', error: error.message })
    }
}

export const deleteCourse = async (req, res) => {
    try {
        const courseId = req.params.id

        if (!courseId) {
            return res.status(400).json({ success: false, message: 'Course id is required' })
        }

        const course = await Course.findById(courseId)
        if (!course) {
            return res.status(404).json({ success: false, message: 'Course not found' })
        }

        // Cascade delete modules + their comments (course references are stored on Modules via courseId).
        const modules = await Modules.find({ courseId })
        const moduleIds = modules.map((m) => m._id)

        if (moduleIds.length > 0) {
            await Comment.deleteMany({ moduleId: { $in: moduleIds } })
            await Modules.deleteMany({ courseId })
        } else {
            // still remove courseId modules just in case
            await Modules.deleteMany({ courseId })
        }

        await Course.findByIdAndDelete(courseId)

        return res.status(200).json({ success: true, message: 'Course deleted successfully' })
    } catch (error) {
        console.log(`error from deleteCourse, ${error}`)
        return res.status(500).json({ success: false, message: 'Failed to delete course', error: error.message })
    }
}