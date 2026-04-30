import { Course } from "../models/course.model.js"
import { Order } from "../models/order.model.js"
import { User } from "../models/user.model.js"
import { Enrollment } from "../models/enrollment.model.js"
import { Modules } from "../models/module.model.js"
import { Quiz } from "../models/quiz.model.js"
import { Comment } from "../models/comment.model.js"
import {  Questions } from "../models/question.model.js"
import { Admin } from "../models/admin.model.js"

export const getAnalyitcsData= async()=>{
    const [
        totalUser,
        totalCourse,
        totalEnrollment,
        totalRevenueAgg,
        totalModules,
        totalQuizzes,
        totalComments,
        totalQuestions,
        totalAdmins
    ] = await Promise.all([
        User.countDocuments(),
        Course.countDocuments(),
            Enrollment.countDocuments(),
        Order.aggregate([
            {
                $group: {
                    _id: null,
                    totalRevenue: { $sum: '$totalAmount' }
                }
            }
        ]),
        Modules.countDocuments(),
        Quiz.countDocuments(),
        Comment.countDocuments(),
        Questions.countDocuments(),
        Admin.countDocuments()
    ])

    const totalRevenue = totalRevenueAgg?.[0]?.totalRevenue || 0
    // count unique students who have at least one enrollment
    let totalStudentsEnrolled = 0
    try {
        const distinctUsers = await Enrollment.distinct('userId')
        totalStudentsEnrolled = distinctUsers ? distinctUsers.length : 0
    } catch (e) {
        console.warn('Failed to compute distinct enrolled students:', e.message)
    }

    return {
        users: totalUser,
        courses: totalCourse,
        totalEntrollments: totalEnrollment,
        studentsEnrolled: totalStudentsEnrolled,
        totalRevenue,
        // extra KPIs for future use
        totalModules,
        totalQuizzes,
        totalComments,
        totalQuestions,
        totalAdmins
    }
}


// total enrollment hain humarey pass 3
// order 1 value-> 1
// order 2 value-> 1
// order 3 value-> 1

// total enrollment = 3



export const getAnalyticsDataController=async(req,res)=>{
    try {
        const data = await getAnalyitcsData()
        return res.status(201).json(data)
    } catch (error) {
        console.log(error)
    }
}



export const dailyEnrollmentData= async(startDate, endDate)=>{
    try {

        const dailyEnrollments = await Enrollment.aggregate([
            {
                $match:{
                    createdAt:{
                        $gte:startDate,
                        $lte:endDate
                    }
                }
            },

            {
                $group:{
                    _id:{
                        $dateToString:{format:"%Y-%m-%d", date:"$createdAt"}
                    },
                    enrollments:{$sum:1}
                },
            },
            {$sort:{_id:1}}
        ])

        const dailyRevenue = await Order.aggregate([
            {
                $match:{
                    createdAt:{
                        $gte:startDate,
                        $lte:endDate
                    }
                }
            },

            {
                $group:{
                    _id:{
                        $dateToString:{format:"%Y-%m-%d", date:"$createdAt"}
                    },
                    revenue:{$sum:"$totalAmount"}
                },
            },
            {$sort:{_id:1}}
        ])

        const dailyCoursesCreated = await Course.aggregate([
            {
                $match:{
                    createdAt:{
                        $gte:startDate,
                        $lte:endDate
                    }
                }
            },
            {
                $group:{
                    _id:{
                        $dateToString:{format:"%Y-%m-%d", date:"$createdAt"}
                    },
                    coursesCreated:{$sum:1}
                }
            },
            {$sort:{_id:1}}
        ])

        const dailyUsersRegistered = await User.aggregate([
            {
                $match:{
                    createdAt:{
                        $gte:startDate,
                        $lte:endDate
                    }
                }
            },
            {
                $group:{
                    _id:{
                        $dateToString:{format:"%Y-%m-%d", date:"$createdAt"}
                    },
                    usersRegistered:{$sum:1}
                }
            },
            {$sort:{_id:1}}
        ])


        const dateArray = getDatesInRange(startDate,endDate)

        return dateArray.map((date)=>{
            const foundEnrollments = dailyEnrollments.find((item)=>item._id===date)
            const foundRevenue = dailyRevenue.find((item)=>item._id===date)
            const foundCoursesCreated = dailyCoursesCreated.find((item)=>item._id===date)
            const foundUsersRegistered = dailyUsersRegistered.find((item)=>item._id===date)
            return{
                date,
                enrollments:foundEnrollments?.enrollments||0,
                revenue:foundRevenue?.revenue||0,
                coursesCreated:foundCoursesCreated?.coursesCreated||0,
                usersRegistered:foundUsersRegistered?.usersRegistered||0
            }
        })

        
        
    } catch (error) {
        console.log(error)
    }

}


function getDatesInRange(startDate, endDate){
    const dates=[]
    let currentDate = new Date(startDate)

    while(currentDate<= endDate){
        dates.push(currentDate.toISOString().split("T")[0]);
        currentDate.setDate(currentDate.getDate()+1)
    }

    return dates
}


export const getDailyAnalytcController=async(req,res)=>{
    try {
        const{startDate, endDate}= req.query

        if(!startDate || !endDate){
            return res.status(401).json({
                message:"Date not found"
            })
        }

        const start = new Date(startDate)
        const end = new Date(endDate)


        const data = await dailyEnrollmentData(start, end)

        return res.status(201).json(data)
    } catch (error) {
        console.log(error)
    }
}