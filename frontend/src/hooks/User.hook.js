import { getUser, loginApi, logoutApi, registerApi } from "@/Api/user.api"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { useUserStore } from "@/Store/user.store"

export const useRegisterHook = ()=>{
    const navigate =  useNavigate()
    return useMutation({
        mutationFn:registerApi,
        onSuccess:(data)=>{
            console.log(data)
            toast.success(data.message)
            navigate("/")
        },

        onError:(err)=>{
            console.log(err)
        }
    })
}

export const useLoginHook = ()=>{
    const navigate = useNavigate()
    return useMutation({
        mutationFn:loginApi,
        onSuccess:(data)=>{
            toast.success(data?.message)
            const msg = String(data?.message || '').toLowerCase()
            if(msg.includes('admin')){
                navigate('/admin/admin-home')
            } else {
                navigate('/')
            }
        },

        onError:(err)=>{
            toast.error(err.response.data.message)
           
        }
    })
}

export const useGetUserHook = ()=>{
    return useQuery({
        queryFn:getUser,
        queryKey:['getUser'],
        retry:false
    })
}


export const useLoggedOut=()=>{
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const clearUser = useUserStore((state)=>state.clearUser)
    return useMutation({
        mutationFn:logoutApi,
        onSuccess:(data)=>{
            clearUser()
            queryClient.removeQueries({ queryKey: ['getUser'] })
            queryClient.removeQueries({ queryKey: ['adminMe'] })
            toast.success(data?.message)
            navigate('/login')
        },
        onError:(err)=>{
            toast.error(err.response.data.message)
        }
    })
}