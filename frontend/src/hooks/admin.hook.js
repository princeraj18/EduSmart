import { adminRegisterApi, adminLoginApi, adminLogoutApi } from '@/Api/admin.api'
import { adminGetApi } from '@/Api/admin.api'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { useUserStore } from '@/Store/user.store'

export const useAdminRegister = ()=>{
  const navigate = useNavigate()
  return useMutation({
    mutationFn: adminRegisterApi,
    onSuccess: (data)=>{
      toast.success(data.message)
      navigate('/admin/login')
    },
    onError: (err)=>{
      toast.error(err.response?.data?.message || err.message)
    }
  })
}

export const useAdminLogin = ()=>{
  const navigate = useNavigate()
  return useMutation({
    mutationFn: adminLoginApi,
    onSuccess: (data)=>{
      toast.success(data.message)
      navigate('/admin/dashboard')
    },
    onError: (err)=>{
      toast.error(err.response?.data?.message || err.message)
    }
  })
}

export const useAdminLogout = ()=>{
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const clearUser = useUserStore((state)=>state.clearUser)
  return useMutation({
    mutationFn: adminLogoutApi,
    onSuccess: (data)=>{
      clearUser()
      queryClient.removeQueries({ queryKey: ['adminMe'] })
      queryClient.removeQueries({ queryKey: ['getUser'] })
      toast.success(data.message)
      navigate('/admin/login')
    },
    onError: (err)=>{
      toast.error(err.response?.data?.message || err.message)
    }
  })
}

export const useAdminMe = (enabled = true)=>{
  return useQuery({
    queryFn: adminGetApi,
    queryKey: ['adminMe'],
    retry: false,
    enabled
  })
}
