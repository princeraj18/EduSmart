import axios from "axios"

export const adminRegisterApi = async(payload)=>{
    const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/admin/register`,
        payload,
        {
            headers:{'Content-Type':'application/json'},
            withCredentials:true
        }
    )

    return res.data
}

export const adminLoginApi = async(payload)=>{
    const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/admin/login`,
        payload,
        {
            headers:{'Content-Type':'application/json'},
            withCredentials:true
        }
    )

    return res.data
}

export const adminLogoutApi = async()=>{
    const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/admin/logout`, {}, { withCredentials:true })
    return res.data
}

export const adminGetApi = async()=>{
    const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/admin/me`, { withCredentials:true })
    return res.data
}
