import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createSupportApi, getAllSupportApi, getSupportByIdApi, updateSupportApi } from '@/Api/support.api'

export const useCreateSupportHook = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createSupportApi,
    onSuccess: () => {
      // nothing to invalidate for public create, but refresh support list if admin viewing
      queryClient.invalidateQueries(['support'])
    }
  })
}

export const useGetAllSupportHook = () => {
  return useQuery({
    queryKey: ['support'],
    queryFn: getAllSupportApi,
    retry: false
  })
}

export const useGetSupportHook = (id) => {
  return useQuery({
    queryKey: ['support', id],
    queryFn: () => getSupportByIdApi(id),
    enabled: !!id,
    retry: false
  })
}

export const useUpdateSupportHook = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: updateSupportApi,
    onSuccess: () => queryClient.invalidateQueries(['support'])
  })
}
