import axios from 'axios'

export const uploadYtResourceApi = async (formData) => {
  const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/ytresource/upload`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    withCredentials: true,
  })
  return res.data
}

export const getYtResourcesApi = async (category) => {
  const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/ytresource/`, { params: category ? { category } : {}, withCredentials: true })
  return res.data
}

export const getYtCategoriesApi = async () => {
  const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/ytresource/categories`, { withCredentials: true })
  return res.data
}

export const getYtResourceByIdApi = async (id) => {
  const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/ytresource/${id}`, { withCredentials: true })
  return res.data
}

export const updateYtResourceApi = async (id, formData) => {
  const res = await axios.put(`${import.meta.env.VITE_BASE_URL}/ytresource/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    withCredentials: true,
  })
  return res.data
}

export const deleteYtResourceApi = async (id) => {
  const res = await axios.delete(`${import.meta.env.VITE_BASE_URL}/ytresource/${id}`, { withCredentials: true })
  return res.data
}
