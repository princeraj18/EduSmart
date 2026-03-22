import cloudinary from "../config/cloudinary.js";
import { ENV } from "../config/env.js";
import { Course } from "../models/course.model.js";
import { GoogleGenerativeAI } from '@google/generative-ai'
import { User } from "../models/user.model.js"; 
import {Modules} from '../models/module.model.js'
const genAI = new GoogleGenerativeAI(ENV.GEMINI_API_KEY)
const model = genAI.getGenerativeModel({model:'gemini-2.5-flash'})

export const createCourse =async(req , res)=>{
    try {
        const {title, description, amount} = req.body;
        const thumbnail = req.file

        if(!title || !description || !amount){
            return res.status(401).json({
                message:"Please provide all the detail"
            })
        }

        if(!thumbnail){
            return res.status(400).json({
                success:false,
                message:"Thumbnail image is required"
            })
        }

        let imageUrl =""
        
        const base64 = `data:${thumbnail.mimetype};base64,${thumbnail.buffer.toString("base64")}`;

        const uploadRes = await cloudinary.uploader.upload(base64,{
            folder:"lmsYT"
        })

        imageUrl = uploadRes.secure_url

        const newCourse = new Course({
            userId:req.user._id,
            title,
            description,
            thumbnail:imageUrl,
            amount
        })

        await newCourse.save()

        return res.status(201).json({
            message:"Course Created Successfully",
            newCourse
        })

    } catch (error) {
        console.log(`error from create course. ${error}`)
        return res.status(500).json({
            success:false,
            message:'Failed to create course',
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