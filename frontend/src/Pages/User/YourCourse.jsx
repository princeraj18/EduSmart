import { useGetAllPurchaseCourse } from '@/hooks/course.hook'
import { BookOpen, Clock, Play, ChevronRight } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const YourCourse = () => {
  const { data, isLoading } = useGetAllPurchaseCourse()
  const navigate = useNavigate()

  const navigateSinglePurchaseCourse = (id) => {
    navigate(id)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[var(--background)] p-8">
        <div className="max-w-7xl mx-auto">
          <div className="h-12 w-64 bg-slate-200 rounded-lg animate-pulse mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-[var(--card)] rounded-2xl overflow-hidden border border-[var(--border)]">
                <div className="h-48 bg-[var(--popover)] animate-pulse"></div>
                <div className="p-4 space-y-3">
                  <div className="h-6 bg-slate-200 rounded animate-pulse"></div>
                  <div className="h-4 bg-[var(--popover)] rounded animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[var(--background)] p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-black text-[var(--foreground)] tracking-tight mb-2">
            Your Courses
          </h1>
          <p className="text-[var(--muted-foreground)] text-lg">
            Continue learning from where you left off
          </p>
        </div>

        {/* Empty State */}
        {!data?.purchasedCourse?.length ? (
          <div className="bg-[var(--card)] rounded-2xl border border-[var(--border)] p-12 text-center">
            <BookOpen className="w-20 h-20 text-[var(--muted-foreground)] mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-[var(--foreground)] mb-3">No courses yet</h2>
            <p className="text-[var(--muted-foreground)] mb-8 max-w-md mx-auto">
              Start learning today by exploring our course catalog
            </p>
            <button 
              onClick={() => navigate('/courses')}
              className="px-8 py-4 bg-[var(--accent)] hover:brightness-95 text-[var(--accent-foreground)] font-semibold rounded-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              Browse Courses
            </button>
          </div>
        ) : (
          <>
            {/* Course Count */}
            <div className="mb-6 flex items-center justify-between">
              <p className="text-sm font-semibold text-[var(--muted-foreground)]">
                {data.purchasedCourse.length} {data.purchasedCourse.length === 1 ? 'Course' : 'Courses'}
              </p>
            </div>

            {/* Course Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {data.purchasedCourse.map((item, index) => (
                <div
                  key={item._id || index}
                  onClick={() => navigateSinglePurchaseCourse(item._id)}
                  className="group bg-[var(--card)] rounded-2xl overflow-hidden border border-[var(--border)] hover:border-[var(--accent)] hover:shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-1"
                >
                  {/* Thumbnail */}
                    <div className="relative h-48 bg-[var(--popover)] overflow-hidden">
                    <img
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                      src={item.thumbnail || '/placeholder-course.jpg'}
                      alt={item.title}
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/400x300?text=Course'
                      }}
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-16 h-16 bg-[var(--card)] rounded-full flex items-center justify-center shadow-2xl">
                          <Play className="w-7 h-7 text-[var(--accent)] ml-1" fill="currentColor" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    {/* Title */}
                    <h3 className="font-bold text-lg text-[var(--foreground)] mb-3 line-clamp-2 leading-snug group-hover:text-[var(--accent)] transition-colors">
                      {item.title}
                    </h3>

                    {/* Meta Info */}
                    <div className="flex items-center gap-4 text-xs text-[var(--muted-foreground)] mb-4">
                      {item.lessons && (
                        <div className="flex items-center gap-1">
                          <BookOpen className="w-3.5 h-3.5" />
                          <span>{item.lessons} lessons</span>
                        </div>
                      )}
                      {item.duration && (
                        <div className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{item.duration}</span>
                        </div>
                      )}
                    </div>

                    {/* Continue Button */}
                    <button className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2 group-hover:shadow-lg">
                      Continue Learning
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default YourCourse
