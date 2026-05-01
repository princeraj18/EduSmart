import axios from 'axios'
import { buildUrl } from './user.api'

export const createSupportApi = async (payload) => {
  const url = buildUrl('/support/create')
  const res = await axios.post(url, payload, { withCredentials: true })
  return res.data
}

export const getAllSupportApi = async () => {
  const url = buildUrl('/support/')
  const res = await axios.get(url, { withCredentials: true })
  return res.data
}

export const getMySupportApi = async () => {
  const url = buildUrl('/support/my')
  const res = await axios.get(url, { withCredentials: true })
  return res.data
}

export const getMySupportByIdApi = async (id) => {
  const url = buildUrl(`/support/my/${id}`)
  const res = await axios.get(url, { withCredentials: true })
  return res.data
}

export const getSupportByIdApi = async (id) => {
  const url = buildUrl(`/support/${id}`)
  const res = await axios.get(url, { withCredentials: true })
  return res.data
}

export const updateSupportApi = async ({ id, payload }) => {
  const url = buildUrl(`/support/${id}`)
  const res = await axios.patch(url, payload, { withCredentials: true })
  return res.data
}
