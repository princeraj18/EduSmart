import { useGetAllPurchaseCourse } from '@/hooks/course.hook'
import { BookOpen, ChevronRight, Clock, Play } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const YourCourse = () => {
  const { data, isLoading } = useGetAllPurchaseCourse()
  const navigate = useNavigate()

  if (isLoading) {
    return (
      <div className='page-surface min-h-screen py-10'>
        <div className='section-shell grid gap-6 md:grid-cols-3'>
          {[1, 2, 3].map((i) => <div key={i} className='h-80 animate-pulse rounded-[30px] bg-[#eadbc8]' />)}
        </div>
      </div>
    )
  }

  return (
    <div className='page-surface min-h-screen py-10'>
      <div className='section-shell'>
        <div data-animate='hero' className='glass-panel rounded-[38px] p-8 md:p-12'>
          <div className='editorial-label'>Your Courses</div>
          <h1 data-hero-line className='mt-5 text-5xl font-black md:text-7xl'>Continue learning from where you left off.</h1>
          <p data-hero-line className='mt-4 max-w-3xl text-lg leading-8 text-[var(--muted-foreground)]'>Your owned catalog now has the same premium visual structure as the rest of EduPath.</p>
        </div>

        {!data?.purchasedCourse?.length ? (
          <div data-animate='zoom' className='feature-card-shell mt-8 rounded-[34px] p-12 text-center'>
            <BookOpen className='mx-auto mb-6 h-20 w-20 text-[var(--muted-foreground)]' />
            <h2 className='text-3xl font-black'>No courses yet</h2>
            <p className='mx-auto mt-3 max-w-md text-[var(--muted-foreground)]'>Start learning today by exploring our redesigned course catalog.</p>
            <button onClick={() => navigate('/courses')} className='brand-button mt-8'>Browse Courses</button>
          </div>
        ) : (
          <>
            <div className='mt-8 editorial-label'>{data.purchasedCourse.length} owned courses</div>
            <div data-animate='stagger' className='mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
              {data.purchasedCourse.map((item, index) => (
                <div key={item._id || index} onClick={() => navigate(item._id)} className='feature-card-shell group cursor-pointer overflow-hidden rounded-[28px] transition duration-300 hover:-translate-y-1'>
                  <div className='relative h-48 overflow-hidden'>
                    <img className='h-full w-full object-cover transition-transform duration-300 group-hover:scale-105' src={item.thumbnail || 'https://via.placeholder.com/400x300?text=Course'} alt={item.title} />
                    <div className='absolute inset-0 flex items-center justify-center bg-black/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
                      <div className='flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-2xl'>
                        <Play className='ml-1 h-7 w-7 text-[#178582]' fill='currentColor' />
                      </div>
                    </div>
                  </div>
                  <div className='p-5'>
                    <h3 className='text-lg font-bold leading-snug'>{item.title}</h3>
                    <div className='mb-4 mt-3 flex items-center gap-4 text-xs text-[var(--muted-foreground)]'>
                      {item.lessons && <div className='flex items-center gap-1'><BookOpen className='h-3.5 w-3.5' /><span>{item.lessons} lessons</span></div>}
                      {item.duration && <div className='flex items-center gap-1'><Clock className='h-3.5 w-3.5' /><span>{item.duration}</span></div>}
                    </div>
                    <button className='flex w-full items-center justify-center gap-2 rounded-full bg-[#133a5e] py-3 font-semibold text-white transition hover:bg-[#178582]'>
                      Continue Learning
                      <ChevronRight className='h-4 w-4 transition-transform group-hover:translate-x-1' />
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
