import React from 'react'
import { useForm } from 'react-hook-form'
import { useUploadResourceHook, useGetResourcesHook, useGetCategoriesHook } from '@/hooks/resource.hook'
import { Spinner } from '@/components/ui/spinner'
import { toast } from 'sonner'

const AdminResources = () => {
  const { register, handleSubmit, reset } = useForm()
  const { mutate, isLoading } = useUploadResourceHook()
  const { data: resources = [], isLoading: loadingList } = useGetResourcesHook()
  const { data: categories = [], isLoading: loadingCategories } = useGetCategoriesHook()

  const onSubmit = (data) => {
    const formData = new FormData()
    formData.append('title', data.title)
    formData.append('description', data.description || '')

    const category = data.selectedCategory
    if (category) formData.append('category', category)

    if (data.pdf && data.pdf[0]) formData.append('pdf', data.pdf[0])

    mutate(formData, {
      onSuccess: (res) => {
        reset()
        toast.success(res?.message || 'Resource uploaded')
      },
      onError: (err) => {
        toast.error(err?.response?.data?.message || 'Upload failed')
      }
    })
  }

  return (
    <div className="min-h-screen p-8 bg-[var(--background)]">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="bg-[var(--card)] rounded-2xl p-6 shadow">
          <h1 className="text-2xl font-bold text-[var(--foreground)]">Upload PDF Resource</h1>
          <p className="text-sm text-[var(--muted-foreground)] mt-1">Upload study materials for users</p>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
            <div>
              <label className="block text-sm text-[var(--muted-foreground)] mb-1">Title</label>
              <input {...register('title', { required: true })} className="w-full px-4 py-3 border rounded-xl" />
            </div>

            <div>
              <label className="block text-sm text-[var(--muted-foreground)] mb-1">Description</label>
              <textarea {...register('description')} className="w-full px-4 py-3 border rounded-xl" />
            </div>

            <div>
              <label className="block text-sm text-[var(--muted-foreground)] mb-1">PDF File</label>
              <input type="file" accept="application/pdf" {...register('pdf')} className="w-full" />
            </div>

            <div>
              <label className="block text-sm text-[var(--muted-foreground)] mb-1">Category</label>
              <div>
                <select {...register('selectedCategory')} className="w-full px-3 py-2 bg-black border rounded-md">
                  <option value="">Choose category</option>
                  {categories.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>

            <button type="submit" disabled={isLoading} className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold">
              {isLoading ? <><Spinner /> Uploading...</> : 'Upload PDF'}
            </button>
          </form>
        </div>

        <div className="bg-[var(--card)] rounded-2xl p-6 shadow">
          <h2 className="text-lg font-semibold text-[var(--foreground)]">Existing Resources</h2>
          {loadingList ? (
            <div className="mt-4"><Spinner /></div>
          ) : (
            <ul className="mt-4 space-y-3">
              {resources.length === 0 && <li className="text-sm text-[var(--muted-foreground)]">No resources uploaded yet.</li>}
              {resources.map((r) => (
                <li key={r._id} className="flex items-center justify-between border p-3 rounded-md">
                  <div>
                    <div className="font-semibold">{r.title}</div>
                    <div className="text-sm text-[var(--muted-foreground)]">{r.description}</div>
                    {r.category && <div className="text-xs text-[var(--muted-foreground)] mt-1">Category: {r.category}</div>}
                  </div>
                  <div>
                    <a href={`${import.meta.env.VITE_BASE_URL}/resource/${r._id}/download`} target="_blank" rel="noreferrer" className="px-4 py-2 bg-indigo-600 text-white rounded-md">Download</a>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminResources
