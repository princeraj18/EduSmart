import CourseSection from '@/components/CourseSection'
import React, { useState } from 'react'
import { Award, BookOpen, Search, TrendingUp, Users } from 'lucide-react'

const Home = () => {
  const [SearchInput, setSearchInput] = useState('')
  const [ActiveSearch, setActiveSearch] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setActiveSearch(SearchInput.trim())
  }

  const resetFilter = () => {
    setSearchInput('')
    setActiveSearch('')
  }

  return (
    <div className='page-surface min-h-screen bg-[var(--background)] text-[var(--foreground)]'>
      {/* Hero */}
      <section data-animate='hero' className='relative overflow-hidden bg-gradient-to-r from-blue-700 via-indigo-600 to-cyan-600 px-4 py-16 md:py-20'>
        <div className='absolute inset-0 opacity-30'>
          <div data-hero-art data-scroll data-scroll-speed='1.2' className='absolute -left-12 top-10 h-44 w-44 rounded-full bg-white/20 blur-3xl' />
          <div data-hero-art data-scroll data-scroll-speed='-0.8' className='absolute right-0 top-0 h-56 w-56 rounded-full bg-cyan-200/20 blur-3xl' />
          <div data-hero-art data-scroll data-scroll-speed='0.5' className='absolute bottom-0 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-blue-950/30 blur-3xl' />
        </div>
        <div className='relative mx-auto max-w-5xl text-center'>
          <h1 data-hero-line className='text-4xl md:text-6xl font-extrabold text-white'>Welcome to EduPath</h1>
          <p data-hero-line className='mt-5 text-lg md:text-2xl text-blue-100'>Your Gateway to Knowledge and Success</p>
          <p data-hero-line className='mt-6 mx-auto max-w-3xl text-blue-100 text-base md:text-xl leading-relaxed'>
            EduPath is a comprehensive learning management system designed to empower learners
            worldwide. Access thousands of expert-led courses, learn at your own pace, and achieve
            your career goals with our innovative platform.
          </p>

          <form
            onSubmit={handleSubmit}
            data-hero-line
            data-scroll
            data-scroll-speed='0.8'
            className='mt-10 mx-auto max-w-3xl flex items-center rounded-full border-2 border-white/90 bg-white px-2 py-2 shadow-lg'
          >
            <div className='flex items-center flex-1 px-4'>
              <Search className='w-5 h-5 text-slate-400 mr-3' />
              <input
                type='text'
                value={SearchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder='Search for courses, instructors, or topics...'
                className='w-full bg-transparent text-sm md:text-base text-slate-700 placeholder:text-slate-400 focus:outline-none'
              />
            </div>
            <button
              type='submit'
              className='px-8 py-2.5 rounded-full bg-slate-950 text-white font-semibold hover:bg-slate-900 transition-colors'
            >
              Search
            </button>
          </form>

          {ActiveSearch && (
            <div className='mt-4 flex items-center justify-center gap-3'>
              <span className='text-sm text-blue-100'>
                Showing results for: <span className='font-semibold text-white'>"{ActiveSearch}"</span>
              </span>
              <button
                type='button'
                onClick={resetFilter}
                className='text-xs md:text-sm text-white/95 underline underline-offset-2 hover:text-white'
              >
                Clear
              </button>
            </div>
          )}
        </div>
      </section>
{/* Featured Courses (keeps existing course card + API + search behavior) */}
      <section data-animate='fade'>
        <div className='mx-auto max-w-7xl px-6 pt-5'>
          <div className='flex items-center justify-between'>
            <div>
              <h2 className='text-5xl font-extrabold tracking-tight'>Featured Courses</h2>
              <p className='text-[var(--muted-foreground)] mt-2'>Explore our most popular courses</p>
            </div>
          </div>
        </div>
        <CourseSection ActiveSearch={ActiveSearch} />
      </section>
      {/* Stats */}
      <section data-animate='stagger' className='border-b border-[var(--border)] bg-white dark:bg-[var(--card)]'>
        <div className='mx-auto max-w-6xl grid grid-cols-2 md:grid-cols-4 gap-8 px-6 py-10'>
          <div className='text-center'>
            <div className='mx-auto mb-2 w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center'>
              <Users className='w-5 h-5' />
            </div>
            <h3 className='text-4xl font-extrabold'>500K+</h3>
            <p className='text-[var(--muted-foreground)]'>Active Students</p>
          </div>
          <div className='text-center'>
            <div className='mx-auto mb-2 w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center'>
              <BookOpen className='w-5 h-5' />
            </div>
            <h3 className='text-4xl font-extrabold'>1,200+</h3>
            <p className='text-[var(--muted-foreground)]'>Expert Courses</p>
          </div>
          <div className='text-center'>
            <div className='mx-auto mb-2 w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center'>
              <Award className='w-5 h-5' />
            </div>
            <h3 className='text-4xl font-extrabold'>95%</h3>
            <p className='text-[var(--muted-foreground)]'>Success Rate</p>
          </div>
          <div className='text-center'>
            <div className='mx-auto mb-2 w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center'>
              <TrendingUp className='w-5 h-5' />
            </div>
            <h3 className='text-4xl font-extrabold'>4.8/5</h3>
            <p className='text-[var(--muted-foreground)]'>Average Rating</p>
          </div>
        </div>
      </section>

      {/* Why Choose */}
      <section data-animate='stagger' className='px-6 py-16'>
        <div className='mx-auto max-w-6xl'>
          <div className='text-center mb-12'>
            <h2 className='text-4xl font-extrabold'>Why Choose EduPath?</h2>
            <p className='mt-4 text-lg text-[var(--muted-foreground)] max-w-3xl mx-auto'>
              We&apos;re committed to providing high-quality education that&apos;s accessible, affordable,
              and designed for real-world success.
            </p>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            <div className='rounded-2xl border border-[var(--border)] p-7 bg-[var(--card)]'>
              <div className='mb-4 w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center'>
                <BookOpen className='w-5 h-5' />
              </div>
              <h3 className='text-3xl font-bold'>Expert Instructors</h3>
              <p className='mt-3 text-[var(--muted-foreground)]'>
                Learn from industry professionals with years of real-world experience in their
                fields.
              </p>
            </div>
            <div className='rounded-2xl border border-[var(--border)] p-7 bg-[var(--card)]'>
              <div className='mb-4 w-12 h-12 rounded-xl bg-green-100 text-green-600 flex items-center justify-center'>
                <TrendingUp className='w-5 h-5' />
              </div>
              <h3 className='text-3xl font-bold'>Flexible Learning</h3>
              <p className='mt-3 text-[var(--muted-foreground)]'>
                Study at your own pace with lifetime access to course materials and resources.
              </p>
            </div>
            <div className='rounded-2xl border border-[var(--border)] p-7 bg-[var(--card)]'>
              <div className='mb-4 w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center'>
                <Award className='w-5 h-5' />
              </div>
              <h3 className='text-3xl font-bold'>Certified Courses</h3>
              <p className='mt-3 text-[var(--muted-foreground)]'>
                Earn recognized certificates upon completion to boost your career prospects.
              </p>
            </div>
             <div className='rounded-2xl border border-[var(--border)] p-7 bg-[var(--card)]'>
              <div className='mb-4 w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center'>
                <Award className='w-5 h-5' />
              </div>
              <h3 className='text-3xl font-bold'>Peer-to-Peer Networking</h3>
              <p className='mt-3 text-[var(--muted-foreground)]'>
                  Connect with peers and expand your professional network.
                </p>
            </div>
          </div>
        </div>
      </section>

      
    </div>
  )
}

export default Home
