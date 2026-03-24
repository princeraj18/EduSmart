import { useGetCourseHook } from '@/hooks/course.hook'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { BookOpen, Clock, Users, Star } from 'lucide-react'

const CourseSection = ({ ActiveSearch }) => {
  const { data, error, isLoading } = useGetCourseHook(ActiveSearch)
  const navigate = useNavigate()

  console.log(data)
  const navigateSinglecourse = (id) => {
    navigate(`/singleCourse/${id}`)
  }

  if (isLoading) {
    return (
      <div className='py-20 px-6'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto'>
          {[...Array(8)].map((_, i) => (
            <div key={i} className='animate-pulse'>
              <div className='bg-slate-200 h-64 rounded-2xl p-6'>
                <div className='bg-slate-300 h-48 rounded-xl mb-4'></div>
                <div className='h-6 bg-slate-300 rounded-full mb-3'></div>
                <div className='space-y-2'>
                  <div className='h-4 bg-slate-300 rounded w-3/4'></div>
                  <div className='h-4 bg-slate-300 rounded w-1/2'></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Build a RegExp from ActiveSearch safely
  const buildRegex = (input) => {
    if(!input) return null
    try{
      return new RegExp(input, 'i')
    }catch(e){
      // escape special chars if user provided invalid regex
      const escaped = input.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
      return new RegExp(escaped, 'i')
    }
  }

  const regex = buildRegex(ActiveSearch)

  const filteredCourses = ActiveSearch && data?.courses
    ? data.courses.filter(c => {
        const title = c.title || ''
        const desc = c.description || ''
        return (regex && (regex.test(title) || regex.test(desc)))
      })
    : data?.courses || []

  const highlightText = (text = '') => {
    if(!regex) return text
    const parts = []
    let lastIndex = 0
    let match
    // Use global flag to iterate - create global regex
    const globalRegex = new RegExp(regex.source, regex.flags.includes('g') ? regex.flags : regex.flags + 'g')
    while((match = globalRegex.exec(text)) !== null){
      const start = match.index
      const end = globalRegex.lastIndex
      if(start > lastIndex){
        parts.push(text.slice(lastIndex, start))
      }
      parts.push(<mark key={start} className='bg-yellow-200 rounded px-1'>{text.slice(start, end)}</mark>)
      lastIndex = end
      if(globalRegex.lastIndex === match.index) globalRegex.lastIndex++
    }
    if(lastIndex < text.length){
      parts.push(text.slice(lastIndex))
    }
    return parts
  }

  return (
    <div className='py-20 px-6 bg-[var(--background)]'>
      <div className='max-w-7xl mx-auto'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
          {filteredCourses.map((item) => (
            <div
              key={item._id}
              onClick={() => navigateSinglecourse(item._id)}
              className='group bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 hover:shadow-xl 
                        hover:-translate-y-2 hover:border-[var(--accent)] cursor-pointer transition-all 
                        duration-300 overflow-hidden max-w-sm mx-auto'
            >
              {/* Thumbnail */}
              <div className='relative mb-6'>
                <img 
                  src={item.thumbnail} 
                  alt={item.title}
                  className='w-full h-48 object-cover rounded-xl group-hover:scale-105 transition-transform duration-300'
                />
                <div className='absolute top-3 right-3 bg-[var(--card)]/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-lg'>
                  <Star className='w-4 h-4 text-yellow-500 fill-current inline mr-1' />
                  <span className='text-sm font-bold text-[var(--muted-foreground)]'>{item.rating || '4.8'}</span>
                </div>
              </div>

              {/* Content */}
              <div>
                <h3 className='font-bold text-xl text-[var(--foreground)] leading-tight mb-3 line-clamp-2 group-hover:text-[var(--muted-foreground)]'>
                  {ActiveSearch ? highlightText(item.title) : item.title}
                </h3>
                
                <div className='space-y-3 mb-6'>
                  <div className='flex items-center gap-2 text-sm text-[var(--muted-foreground)]'>
                    <Users className='w-4 h-4' />
                    <span>{item.enrolled || '1.2k'} students</span>
                  </div>
                  
                  <div className='flex items-center gap-2 text-sm text-[var(--muted-foreground)]'>
                    <Clock className='w-4 h-4' />
                    <span>{item.duration || '12 hours'}</span>
                  </div>
                  {ActiveSearch && (
                    <p className='text-sm text-[var(--muted-foreground)] mt-2 line-clamp-2'>
                      {highlightText(item.description)}
                    </p>
                  )}
                  
                  {ActiveSearch && (
                    <div className='inline-flex items-center gap-2 px-3 py-1 bg-[var(--popover)] text-[var(--muted-foreground)] rounded-full text-xs font-medium'>
                      <span>🔍 {ActiveSearch}</span>
                    </div>
                  )}
                </div>

                <div className='flex items-center justify-between pt-4 border-t border-[var(--border)]'>
                 
                  <button className='px-4 py-2 bg-[var(--accent)] text-[var(--accent-foreground)] text-sm font-semibold rounded-xl hover:brightness-95 transition-colors group-hover:scale-105'>
                    View Course
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {data?.courses?.length === 0 && !isLoading && (
          <div className='text-center py-32'>
            <BookOpen className='w-24 h-24 text-slate-400 mx-auto mb-8' />
            <h2 className='text-2xl font-bold text-slate-900 mb-2'>No courses found</h2>
            <p className='text-slate-600 max-w-md mx-auto text-lg'>
              Try adjusting your search or explore our popular courses below
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default CourseSection
