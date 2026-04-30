import React from 'react'
import { useForm } from 'react-hook-form'
import { useUploadResourceHook, useGetResourcesHook, useGetCategoriesHook } from '@/hooks/resource.hook'
import { useUploadYtResourceHook, useGetYtResourcesHook, useGetYtCategoriesHook, useDeleteYtResourceHook } from '@/hooks/ytresource.hook'
import { Spinner } from '@/components/ui/spinner'
import { toast } from 'sonner'

const AdminResources = () => {
  const { register, handleSubmit, reset } = useForm()
  const { mutate, isLoading } = useUploadResourceHook()
  const { data: resources = [], isLoading: loadingList } = useGetResourcesHook()
  const { data: categories = [], isLoading: loadingCategories } = useGetCategoriesHook()

  // YouTube resources form + data
  const { register: registerYt, handleSubmit: handleSubmitYt, reset: resetYt } = useForm()
  const { mutate: mutateYt, isLoading: isUploadingYt } = useUploadYtResourceHook()
  const { data: ytResources = [], isLoading: loadingYtList } = useGetYtResourcesHook()
  const { data: ytCategories = [] } = useGetYtCategoriesHook()
  const { mutate: deleteYt, isLoading: isDeleting } = useDeleteYtResourceHook()

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

  const onSubmitYt = (data) => {
    const formData = new FormData()
    formData.append('title', data.ytTitle)
    formData.append('description', data.ytDescription || '')
    if (data.ytCategory) formData.append('category', data.ytCategory)
    if (data.ytLevel) formData.append('level', data.ytLevel)
    if (data.youtubeUrl) formData.append('youtubeUrl', data.youtubeUrl)
    if (data.playlistId) formData.append('playlistId', data.playlistId)
    if (data.thumbnail && data.thumbnail[0]) formData.append('thumbnail', data.thumbnail[0])

    mutateYt(formData, {
      onSuccess: (res) => {
        resetYt()
        toast.success(res?.message || 'YouTube resource uploaded')
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
        
        <div className="bg-[var(--card)] rounded-2xl p-6 shadow">
          <h1 className="text-2xl font-bold text-[var(--foreground)]">Upload YouTube Resource</h1>
          <p className="text-sm text-[var(--muted-foreground)] mt-1">Add a YouTube video or playlist with optional thumbnail</p>

          <form onSubmit={handleSubmitYt(onSubmitYt)} className="mt-6 space-y-4">
            <div>
              <label className="block text-sm text-[var(--muted-foreground)] mb-1">Title</label>
              <input {...registerYt('ytTitle', { required: true })} className="w-full px-4 py-3 border rounded-xl" />
            </div>

            <div>
              <label className="block text-sm text-[var(--muted-foreground)] mb-1">Description</label>
              <textarea {...registerYt('ytDescription')} className="w-full px-4 py-3 border rounded-xl" />
            </div>

            <div>
              <label className="block text-sm text-[var(--muted-foreground)] mb-1">YouTube URL</label>
              <input {...registerYt('youtubeUrl', { required: true })} className="w-full px-4 py-3 border rounded-xl" />
            </div>

            <div>
              <label className="block text-sm text-[var(--muted-foreground)] mb-1">Playlist ID (optional)</label>
              <input {...registerYt('playlistId')} className="w-full px-4 py-3 border rounded-xl" />
            </div>

            <div>
              <label className="block text-sm text-[var(--muted-foreground)] mb-1">Thumbnail (optional)</label>
              <input type="file" accept="image/*" {...registerYt('thumbnail')} className="w-full" />
            </div>

            <div>
              <label className="block text-sm text-[var(--muted-foreground)] mb-1">Category</label>
              <div>
                <select {...registerYt('ytCategory')} className="w-full px-3 py-2 bg-black border rounded-md">
                  <option value="">Choose category</option>
                  {ytCategories.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm text-[var(--muted-foreground)] mb-1">Level</label>
              <div>
                <select {...registerYt('ytLevel')} className="w-full px-3 py-2 bg-black border rounded-md">
                  <option value="">Choose level</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
            </div>

            <button type="submit" disabled={isUploadingYt} className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold">
              {isUploadingYt ? <><Spinner /> Uploading...</> : 'Upload YouTube'}
            </button>
          </form>
        </div>

        <div className="bg-[var(--card)] rounded-2xl p-6 shadow">
          <h2 className="text-lg font-semibold text-[var(--foreground)]">Existing YouTube Resources</h2>
          {loadingYtList ? (
            <div className="mt-4"><Spinner /></div>
          ) : (
            <ul className="mt-4 space-y-3">
              {ytResources.length === 0 && <li className="text-sm text-[var(--muted-foreground)]">No YouTube resources uploaded yet.</li>}
              {ytResources.map((r) => (
                <li key={r._id} className="flex items-center justify-between border p-3 rounded-md">
                  <div className="flex items-center gap-3">
                    {r.thumbnailUrl && <img src={r.thumbnailUrl} alt={r.title} className="h-16 w-28 object-cover rounded" />}
                    <div>
                      <div className="font-semibold">{r.title}</div>
                      <div className="text-sm text-[var(--muted-foreground)]">{r.description}</div>
                      {r.category && <div className="text-xs text-[var(--muted-foreground)] mt-1">Category: {r.category}</div>}
                    </div>
                  </div>
                  <div className='flex items-center gap-2'>
                    <a href={r.youtubeUrl} target="_blank" rel="noreferrer" className="px-4 py-2 bg-indigo-600 text-white rounded-md">Open</a>
                    <button
                      onClick={() => {
                        if (!confirm('Delete this YouTube resource?')) return
                        deleteYt(r._id, {
                          onSuccess: () => toast.success('Deleted'),
                          onError: (err) => toast.error(err?.response?.data?.message || 'Delete failed'),
                        })
                      }}
                      disabled={isDeleting}
                      className="px-4 py-2 bg-red-600 text-white rounded-md"
                    >
                      Delete
                    </button>
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
