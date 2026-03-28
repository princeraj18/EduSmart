import axios from 'axios'

export const createSupportApi = async (payload) => {
  const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/support/create`, payload)
  return res.data
}

export const getAllSupportApi = async () => {
  const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/support/`, { withCredentials: true })
  return res.data
}

export const getSupportByIdApi = async (id) => {
  const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/support/${id}`, { withCredentials: true })
  return res.data
}

export const updateSupportApi = async ({ id, payload }) => {
  const res = await axios.patch(`${import.meta.env.VITE_BASE_URL}/support/${id}`, payload, { withCredentials: true })
  return res.data
}
