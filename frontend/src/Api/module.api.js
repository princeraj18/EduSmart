import axios from 'axios'
import { buildUrl } from './user.api'

export const createModuleApi = async (payload) => {
    const url = buildUrl('/module/createModule')
    const res = await axios.post(
        url,
        payload,
        {
            withCredentials: true,
        }
    )

    return res.data
}

export const getModuleApi = async (id) => {
    const url = buildUrl(`/module/getModuel/${id}`)
    const res = await axios.get(url, { withCredentials: true })

    return res.data
}

export const getCommentApi = async (id) => {
    const url = buildUrl(`/module/comment/${id}`)
    const res = await axios.get(url, { withCredentials: true })

    return res.data
}