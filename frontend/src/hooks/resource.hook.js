import { uploadResourceApi, getResourcesApi, getCategoriesApi } from '@/Api/resource.api'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const useUploadResourceHook = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: uploadResourceApi,
    onSuccess: () => {
      qc.invalidateQueries(['getResources'])
      qc.invalidateQueries(['getCategories'])
    },
  })
}

export const useGetResourcesHook = (category) => {
  return useQuery({
    queryKey: ['getResources', category || 'all'],
    queryFn: () => getResourcesApi(category),
    enabled: typeof category === 'undefined' || category === null ? true : true,
  })
}

export const useGetCategoriesHook = () => {
  return useQuery({
    queryKey: ['getCategories'],
    queryFn: getCategoriesApi,
  })
}
