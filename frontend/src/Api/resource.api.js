import axios from 'axios'
import { buildUrl } from './user.api'

export const uploadResourceApi = async (formData) => {
  const url = buildUrl('/resource/upload')
  const res = await axios.post(url, formData, {
    withCredentials: true,
  })

  return res.data
}

export const getResourcesApi = async (category) => {
  const url = buildUrl('/resource/')
  const res = await axios.get(url, { params: category ? { category } : {}, withCredentials: true })
  return res.data
}

export const getCategoriesApi = async () => {
  const url = buildUrl('/resource/categories')
  const res = await axios.get(url, { withCredentials: true })
  return res.data
}

export const getResourceByIdApi = async (id) => {
  const url = buildUrl(`/resource/${id}`)
  const res = await axios.get(url, { withCredentials: true })
  return res.data
}
