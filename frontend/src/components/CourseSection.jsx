import { useGetCourseHook } from '@/hooks/course.hook'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { BookOpen, Clock, Star, Users } from 'lucide-react'

const CourseSection = ({ ActiveSearch }) => {
  const { data, isLoading } = useGetCourseHook(ActiveSearch)
  const navigate = useNavigate()

  const navigateSinglecourse = (id) => {
    navigate(`/singleCourse/${id}`)
  }

  if (isLoading) {
    return (
      <div className='px-6 py-20'>
        <div className='mx-auto grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {[...Array(8)].map((_, i) => (
            <div key={i} className='animate-pulse'>
              <div className='h-64 rounded-[28px] bg-[#efe2cf] p-6'>
                <div className='mb-4 h-48 rounded-2xl bg-[#dccab0]'></div>
                <div className='mb-3 h-6 rounded-full bg-[#dccab0]'></div>
                <div className='space-y-2'>
                  <div className='h-4 w-3/4 rounded bg-[#dccab0]'></div>
                  <div className='h-4 w-1/2 rounded bg-[#dccab0]'></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const buildRegex = (input) => {
    if (!input) return null
    try {
      return new RegExp(input, 'i')
    } catch (e) {
      const escaped = input.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
      return new RegExp(escaped, 'i')
    }
  }

  const regex = buildRegex(ActiveSearch)

  const filteredCourses = ActiveSearch && data?.courses
    ? data.courses.filter((c) => {
        const title = c.title || ''
        const desc = c.description || ''
        return regex && (regex.test(title) || regex.test(desc))
      })
    : data?.courses || []

  const highlightText = (text = '') => {
    if (!regex) return text
    const parts = []
    let lastIndex = 0
    let match
    const globalRegex = new RegExp(regex.source, regex.flags.includes('g') ? regex.flags : `${regex.flags}g`)

    while ((match = globalRegex.exec(text)) !== null) {
      const start = match.index
      const end = globalRegex.lastIndex
      if (start > lastIndex) {
        parts.push(text.slice(lastIndex, start))
      }
      parts.push(
        <mark key={start} className='rounded bg-[#f3bb5d]/55 px-1 text-[#162033]'>
          {text.slice(start, end)}
        </mark>,
      )
      lastIndex = end
      if (globalRegex.lastIndex === match.index) globalRegex.lastIndex += 1
    }

    if (lastIndex < text.length) {
      parts.push(text.slice(lastIndex))
    }
    return parts
  }

  return (
    <div className='rounded-[36px] border border-[var(--border)] bg-white/35 px-4 py-8 backdrop-blur-sm md:px-6 md:py-10'>
      <div className='mx-auto max-w-7xl'>
        <div data-animate='stagger' className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {filteredCourses.map((item) => (
            <div
              key={item._id}
              onClick={() => navigateSinglecourse(item._id)}
              className='group mx-auto max-w-sm cursor-pointer overflow-hidden rounded-[28px] border border-[var(--border)] bg-[linear-gradient(180deg,rgba(255,252,247,0.95),rgba(243,232,215,0.8))] p-5 shadow-[0_18px_40px_rgba(20,35,58,0.08)] transition-all duration-300 hover:-translate-y-2 hover:border-[#178582] hover:shadow-[0_24px_60px_rgba(20,35,58,0.16)]'
            >
              <div className='relative mb-6'>
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className='h-48 w-full rounded-2xl object-cover transition-transform duration-300 group-hover:scale-105'
                />
                <div className='absolute right-3 top-3 rounded-full bg-[#fff8ef]/92 px-3 py-1 shadow-lg backdrop-blur-sm'>
                  <Star className='mr-1 inline h-4 w-4 fill-current text-[#f08a4b]' />
                  <span className='text-sm font-bold text-[var(--muted-foreground)]'>{item.rating || '4.8'}</span>
                </div>
              </div>

              <div>
                <h3 className='mb-3 line-clamp-2 text-xl font-bold leading-tight text-[var(--foreground)] group-hover:text-[#133a5e]'>
                  {ActiveSearch ? highlightText(item.title) : item.title}
                </h3>

                <div className='mb-6 space-y-3'>
                  <div className='flex items-center gap-2 text-sm text-[var(--muted-foreground)]'>
                    <Users className='h-4 w-4' />
                    <span>{item.enrolled || '1.2k'} students</span>
                  </div>

                  <div className='flex items-center gap-2 text-sm text-[var(--muted-foreground)]'>
                    <Clock className='h-4 w-4' />
                    <span>{item.duration || '12 hours'}</span>
                  </div>

                  {ActiveSearch && (
                    <p className='mt-2 line-clamp-2 text-sm text-[var(--muted-foreground)]'>
                      {highlightText(item.description)}
                    </p>
                  )}

                  {ActiveSearch && (
                    <div className='inline-flex items-center gap-2 rounded-full bg-[#f1e8da] px-3 py-1 text-xs font-medium text-[#133a5e]'>
                      <span>Search: {ActiveSearch}</span>
                    </div>
                  )}
                </div>

                <div className='flex items-center justify-between border-t border-[var(--border)] pt-4'>
                  <button className='rounded-full bg-gradient-to-r from-[#133a5e] to-[#178582] px-4 py-2 text-sm font-semibold text-white transition-colors group-hover:scale-105'>
                    View Course
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {data?.courses?.length === 0 && !isLoading && (
          <div className='py-32 text-center'>
            <BookOpen className='mx-auto mb-8 h-24 w-24 text-[#8d5f3c]' />
            <h2 className='mb-2 text-2xl font-bold text-[var(--foreground)]'>No courses found</h2>
            <p className='mx-auto max-w-md text-lg text-[var(--muted-foreground)]'>
              Try adjusting your search or explore our popular learning tracks below.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default CourseSection
