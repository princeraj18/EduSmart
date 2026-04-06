import axios from 'axios'

export const uploadResourceApi = async (formData) => {
  const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/resource/upload`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    withCredentials: true,
  })

  return res.data
}

export const getResourcesApi = async (category) => {
  const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/resource/`, { params: category ? { category } : {}, withCredentials: true })
  return res.data
}

export const getCategoriesApi = async () => {
  const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/resource/categories`, { withCredentials: true })
  return res.data
}

export const getResourceByIdApi = async (id) => {
  const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/resource/${id}`, { withCredentials: true })
  return res.data
}
