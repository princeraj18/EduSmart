import axios from "axios"
import { buildUrl } from "./user.api"

export const adminRegisterApi = async(payload)=>{
    const url = buildUrl('/admin/register')
    const res = await axios.post(url,
        payload,
        {
            headers:{'Content-Type':'application/json'},
            withCredentials:true
        }
    )

    return res.data
}

export const adminLoginApi = async(payload)=>{
    const url = buildUrl('/admin/login')
    const res = await axios.post(url,
        payload,
        {
            headers:{'Content-Type':'application/json'},
            withCredentials:true
        }
    )

    return res.data
}

export const adminLogoutApi = async()=>{
    const url = buildUrl('/admin/logout')
    const res = await axios.post(url, {}, { withCredentials:true })
    return res.data
}

export const adminGetApi = async()=>{
    const url = buildUrl('/admin/me')
    const res = await axios.get(url, { withCredentials:true })
    return res.data
}
