import axios from 'axios'
import { buildUrl } from './user.api'

export const getQuizApi = async (id) => {
    const url = buildUrl(`/quiz/getQuiz/${id}`)
    const res = await axios.get(url, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
    })
    return res.data
}

export const createQuiz = async (payload) => {
    const url = buildUrl('/quiz/generateQuiz')
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


export const checkQuizApi = async (id) => {
    const url = buildUrl(`/quiz/checkQuiz/${id}`)
    const res = await axios.get(url, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
    })
    return res.data
}

