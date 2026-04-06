import React from 'react'
import { useForm } from 'react-hook-form'
import { useCreateCouseHook } from '@/hooks/course.hook'
import { useGetCategoriesHook } from '@/hooks/resource.hook'
import { Spinner } from '@/components/ui/spinner'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'

const AdminCreateCourse = () => {
  const { register, handleSubmit, reset } = useForm()
  const { mutate, isPending } = useCreateCouseHook()
  const { data: categories = [] } = useGetCategoriesHook()
  const navigate = useNavigate()

  const onSubmit = (data) => {
    const formData = new FormData()
    formData.append('title', data.title)
    formData.append('description', data.description)
    formData.append('amount', data.amount)
    if (data.category) formData.append('category', data.category)
    if (data.thumbnail && data.thumbnail[0]) formData.append('thumbnail', data.thumbnail[0])

    mutate(formData, {
      onSuccess: (res) => {
        reset()
        try {
          toast.success(res?.message || 'Course created')
        } catch (e) {}
        navigate('/admin/dashboard/courses')
      }
    })
  }

  return (
    <div className="min-h-screen p-8 bg-[var(--background)]">
      <div className="max-w-3xl mx-auto">
        <div className="bg-[var(--card)] rounded-2xl p-8 shadow">
          <h1 className="text-2xl font-bold text-[var(--foreground)]">Create Course</h1>
          <p className="text-sm text-[var(--muted-foreground)] mt-1">Add a new course to the platform</p>

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
              <label className="block text-sm text-[var(--muted-foreground)] mb-1">Amount</label>
              <input type="number" {...register('amount')} className="w-full px-4 py-3 border rounded-xl" />
            </div>

            <div>
              <label className="block text-sm text-[var(--muted-foreground)] mb-1">Thumbnail</label>
              <input type="file" accept="image/*" {...register('thumbnail')} className="w-full" />
            </div>

            <div className=''>
              <label className="block text-sm text-[var(--muted-foreground)] mb-1">Category</label>
              <select {...register('category')} className="w-full bg-black px-4 py-3 border rounded-xl">
                <option value="">Select category</option>
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <button type="submit" disabled={isPending} className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold">
              {isPending ? <><Spinner /> Creating...</> : 'Create Course'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AdminCreateCourse
