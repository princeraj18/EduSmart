import { uploadYtResourceApi, getYtResourcesApi, getYtCategoriesApi, updateYtResourceApi, deleteYtResourceApi } from '@/Api/ytresource.api'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const useUploadYtResourceHook = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: uploadYtResourceApi,
    onSuccess: () => {
      qc.invalidateQueries(['getYtResources'])
      qc.invalidateQueries(['getYtCategories'])
    },
  })
}

export const useGetYtResourcesHook = (category) => {
  return useQuery({
    queryKey: ['getYtResources', category || 'all'],
    queryFn: () => getYtResourcesApi(category),
    enabled: typeof category === 'undefined' || category === null ? true : true,
  })
}

export const useGetYtCategoriesHook = () => {
  return useQuery({
    queryKey: ['getYtCategories'],
    queryFn: getYtCategoriesApi,
  })
}

export const useUpdateYtResourceHook = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, formData }) => updateYtResourceApi(id, formData),
    onSuccess: () => {
      qc.invalidateQueries(['getYtResources'])
      qc.invalidateQueries(['getYtCategories'])
    },
  })
}

export const useDeleteYtResourceHook = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id) => deleteYtResourceApi(id),
    onSuccess: () => {
      qc.invalidateQueries(['getYtResources'])
      qc.invalidateQueries(['getYtCategories'])
    },
  })
}
