import { useDeleteCourseHook, useGetCourseHook, useUpdateCourseHook } from '@/hooks/course.hook'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Spinner } from '@/components/ui/spinner'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'

const DashboardProducts = () => {
  const { data, isLoading, isError, error } = useGetCourseHook()
  const { mutate: updateCourse, isPending: isUpdating } = useUpdateCourseHook()
  const { mutate: deleteCourse, isPending: isDeleting } = useDeleteCourseHook()
  const navigate = useNavigate()
  const { register, handleSubmit, reset } = useForm()

  const [isEditOpen, setIsEditOpen] = useState(false)
  const [editingCourse, setEditingCourse] = useState(null)

  const getCourseId = (id) => {
    navigate(`/admin/dashboard/CourseModule/${id}`)
  }

  const openEditModal = (course) => {
    setEditingCourse(course)
    reset({
      title: course.title ?? '',
      description: course.description ?? '',
      amount: course.amount ?? ''
    })
    setIsEditOpen(true)
  }

  const onSubmitEdit = (values) => {
    if (!editingCourse) return

    const formData = new FormData()
    formData.append('title', values.title)
    formData.append('description', values.description)
    formData.append('amount', values.amount)
    if (values.thumbnail?.[0]) formData.append('thumbnail', values.thumbnail[0])

    updateCourse(
      { id: editingCourse._id, formData },
      {
        onSuccess: (res) => {
          toast.success(res?.message || 'Course updated')
          setIsEditOpen(false)
          setEditingCourse(null)
        },
        onError: (err) => {
          toast.error(err?.response?.data?.message || err.message || 'Failed to update course')
        }
      }
    )
  }

  const handleDelete = (e, courseId) => {
    e.stopPropagation()

    if (isDeleting) return
    const ok = window.confirm('Are you sure you want to delete this course?')
    if (!ok) return

    deleteCourse(courseId, {
      onSuccess: (res) => {
        toast.success(res?.message || 'Course deleted')
      },
      onError: (err) => {
        toast.error(err?.response?.data?.message || err.message || 'Failed to delete course')
      }
    })
  }

  return (
    <div className="min-h-screen bg-[var(--background)] p-8">
      {isLoading && <div className="mb-4 text-sm text-[var(--muted-foreground)]">Loading courses...</div>}

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-[var(--foreground)]">Courses</h1>

        <div className="flex gap-2">
          <button
            onClick={() => navigate('/admin/create-course')}
            className="px-5 py-2 bg-[var(--accent)] text-[var(--accent-foreground)] rounded-lg font-medium hover:brightness-95 transition"
          >
            + Create New Course
          </button>
        </div>
      </div>

      {isError && (
        <div className="mb-4 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-red-600 text-sm">
          Failed to load courses: {error?.response?.data?.message || error?.message || 'Unknown error'}
        </div>
      )}

      {/* Courses Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {(data?.courses ?? []).map((item) => (
          <div
            key={item._id}
            onClick={() => getCourseId(item._id)}
            className="relative cursor-pointer bg-[var(--card)] rounded-xl shadow-md hover:shadow-xl transition p-4 group"
          >
            <div className="absolute top-3 right-3 flex gap-2 z-10">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  openEditModal(item)
                }}
                className="px-3 py-1.5 rounded-lg text-sm font-semibold bg-[var(--popover)] hover:bg-[var(--accent)] hover:text-[var(--accent-foreground)] border border-[var(--border)] transition"
              >
                Edit
              </button>
              <button
                type="button"
                disabled={isDeleting}
                onClick={(e) => handleDelete(e, item._id)}
                className="px-3 py-1.5 rounded-lg text-sm font-semibold bg-red-500/15 hover:bg-red-500/30 text-red-600 border border-red-500/30 transition disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isDeleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>

            <div className="h-40 flex items-center justify-center bg-[var(--popover)] rounded-lg overflow-hidden">
              <img
                src={item.thumbnail}
                alt={item.title}
                className="h-full object-contain group-hover:scale-105 transition"
              />
            </div>

            <div className="mt-4">
              <h2 className="font-semibold text-lg text-[var(--foreground)] line-clamp-1">
                {item.title}
              </h2>
              <p className="text-sm text-[var(--muted-foreground)] mt-1 line-clamp-2">
                {item.description}
              </p>

              <div className="mt-3 font-bold text-[var(--accent)]">
                ₹ {item.amount}
              </div>
            </div>
          </div>
        ))}

        {(!data?.courses || data.courses.length === 0) && !isLoading && !isError && (
          <div className="col-span-full text-sm text-[var(--muted-foreground)]">
            No courses found.
          </div>
        )}
      </div>

      {isEditOpen && editingCourse && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[200] p-4">
          <div className="w-full max-w-xl bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-[var(--foreground)]">Edit Course</h2>
              <button
                type="button"
                onClick={() => {
                  setIsEditOpen(false)
                  setEditingCourse(null)
                }}
                className="px-3 py-1.5 rounded-lg border border-[var(--border)] hover:bg-[var(--popover)] transition"
              >
                Close
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmitEdit)} className="space-y-4">
              <div>
                <label className="block text-sm text-[var(--muted-foreground)] mb-1">Title</label>
                <input
                  {...register('title')}
                  className="w-full px-4 py-3 border rounded-xl"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-[var(--muted-foreground)] mb-1">Description</label>
                <textarea
                  {...register('description')}
                  className="w-full px-4 py-3 border rounded-xl"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-[var(--muted-foreground)] mb-1">Price</label>
                <input
                  type="number"
                  {...register('amount')}
                  className="w-full px-4 py-3 border rounded-xl"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-[var(--muted-foreground)] mb-1">Thumbnail (optional)</label>
                <input
                  type="file"
                  accept="image/*"
                  {...register('thumbnail')}
                  key={editingCourse._id}
                  className="w-full"
                />
              </div>

              <button
                type="submit"
                disabled={isUpdating}
                className="w-full px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isUpdating ? (
                  <>
                    <Spinner size="sm" /> Updating...
                  </>
                ) : (
                  'Save Changes'
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default DashboardProducts
