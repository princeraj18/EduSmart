import axios from 'axios'
import { buildUrl } from './user.api'

export const uploadYtResourceApi = async (formData) => {
  const url = buildUrl('/ytresource/upload')
  const res = await axios.post(url, formData, {
    withCredentials: true,
  })
  return res.data
}

export const getYtResourcesApi = async (category) => {
  const url = buildUrl('/ytresource/')
  const res = await axios.get(url, { params: category ? { category } : {}, withCredentials: true })
  return res.data
}

export const getYtCategoriesApi = async () => {
  const url = buildUrl('/ytresource/categories')
  const res = await axios.get(url, { withCredentials: true })
  return res.data
}

export const getYtResourceByIdApi = async (id) => {
  const url = buildUrl(`/ytresource/${id}`)
  const res = await axios.get(url, { withCredentials: true })
  return res.data
}

export const updateYtResourceApi = async (id, formData) => {
  const url = buildUrl(`/ytresource/${id}`)
  const res = await axios.put(url, formData, {
    withCredentials: true,
  })
  return res.data
}

export const deleteYtResourceApi = async (id) => {
  const url = buildUrl(`/ytresource/${id}`)
  const res = await axios.delete(url, { withCredentials: true })
  return res.data
}
