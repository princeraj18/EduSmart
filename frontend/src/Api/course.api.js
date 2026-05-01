import axios from "axios"
import { buildUrl } from "./user.api"

export const createCourseApi = async (payload) => {
    const url = buildUrl('/course/createCourse')
    const res = await axios.post(url, payload, {
        withCredentials: true,   // ✅ REQUIRED
    })

    return res.data
}



export const getCourseApi = async(search)=>{
    const url = buildUrl('/course/getCourse')
    const res = await axios.get(url, {
        params: search ? { search } : {},
        withCredentials: true,
    })

    return res.data
}


export const getSingleCourseApi = async (id) => {
    const url = buildUrl(`/course/getSingleCourse/${id}`)
    const res = await axios.get(url, { withCredentials: true })
    return res.data
}


export const getPurchaseCourseApi = async (courseId) => {
    const url = buildUrl(`/course/purchasedCourse/${courseId}`)
    const res = await axios.get(url, { withCredentials: true })
    return res.data
}

export const getAllPurchaseCourseApi = async () => {
    const url = buildUrl('/course/getAllCoursePurchase')
    const res = await axios.get(url, { withCredentials: true })
    return res.data
}

export const getAllOrdersAdminApi = async () => {
    const url = buildUrl('/course/admin/orders')
    const res = await axios.get(url, { withCredentials: true })
    return res.data
}

export const updateCourseApi = async ({ id, formData }) => {
    const url = buildUrl(`/course/updateCourse/${id}`)
    const res = await axios.patch(url, formData, { withCredentials: true })
    return res.data
}

export const deleteCourseApi = async (id) => {
    const res = await axios.delete(`${import.meta.env.VITE_BASE_URL}/course/deleteCourse/${id}`, {
        withCredentials: true
    })
    return res.data
}