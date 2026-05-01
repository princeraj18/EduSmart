import axios from 'axios'
import { buildUrl } from './user.api'

export const purchaseCourseApi = async (payload) => {
    const url = buildUrl('/payment/checkout')
    const res = await axios.post(
        url,
        payload,
        {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        }
    )
    return res.data
}

export const checkOutSuccessApi = async (sessionId) => {
    const url = buildUrl('/payment/checkout-success')
    const res = await axios.post(
        url,
        { sessionId },
        {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        }
    )

    return res.data
}