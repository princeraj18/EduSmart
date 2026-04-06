import CourseSection from '@/components/CourseSection'
import React, { useState } from 'react'
import { ArrowRight, Award, BookOpen, Search, Sparkles, TrendingUp, Users } from 'lucide-react'

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
    <div className='page-surface min-h-screen pb-10 text-[var(--foreground)]'>
      <section data-animate='hero' className='section-shell relative pt-10'>
        <div className='glass-panel relative overflow-hidden rounded-[40px] px-6 py-10 md:px-10 md:py-14'>
          <div className='absolute inset-0 bg-[linear-gradient(130deg,rgba(19,58,94,0.96),rgba(23,133,130,0.88)_48%,rgba(240,138,75,0.72))]' />
          <div className='absolute inset-0 opacity-25'>
            <div data-hero-art data-scroll data-scroll-speed='1.1' className='absolute -right-10 top-8 h-56 w-56 rounded-full bg-white/25 blur-3xl' />
            <div data-hero-art data-scroll data-scroll-speed='-0.7' className='absolute left-0 top-28 h-40 w-40 rounded-full bg-[#f3bb5d]/30 blur-3xl' />
            <div data-hero-art data-scroll data-scroll-speed='0.55' className='absolute bottom-0 left-1/3 h-48 w-48 rounded-full bg-[#133a5e]/40 blur-3xl' />
          </div>

          <div className='relative grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end'>
            <div>
              <div data-hero-line className='editorial-label mb-6 bg-white/14 text-white border-white/10'>
                <Sparkles className='h-4 w-4' />
                Modern learning studio
              </div>

              <h1 data-hero-line className='max-w-4xl text-5xl font-black leading-[0.95] text-white md:text-7xl'>
                Education that feels alive, guided, and worth returning to.
              </h1>

              <p data-hero-line className='mt-6 max-w-2xl text-lg leading-8 text-white/82 md:text-xl'>
                EduPath now feels like a premium learning magazine mixed with a focused study workspace. Browse curated courses, keep momentum, and move through your roadmap with clarity.
              </p>

              <div data-hero-line className='mt-8 flex flex-wrap gap-4'>
                <button className='brand-button inline-flex items-center gap-2'>
                  Explore the catalog
                  <ArrowRight className='h-4 w-4' />
                </button>
                <button className='brand-button-secondary bg-white/14 text-white border-white/15'>
                  See your learning path
                </button>
              </div>
            </div>

            <div data-hero-art className='grid gap-4 md:grid-cols-2 lg:grid-cols-1'>
              <div className='rounded-[28px] border border-white/16 bg-white/12 p-6 text-white backdrop-blur-md'>
                <p className='text-xs font-bold uppercase tracking-[0.26em] text-white/60'>Student pulse</p>
                <div className='mt-4 flex items-end justify-between'>
                  <div>
                    <p className='text-5xl font-black'>87%</p>
                    <p className='mt-2 text-sm text-white/75'>Weekly learners complete at least one focused session.</p>
                  </div>
                  <TrendingUp className='h-10 w-10 text-[#f3bb5d]' />
                </div>
              </div>

              <div data-scroll data-scroll-speed='0.45' className='rounded-[28px] bg-[#fff8ef] p-6 text-[#162033] shadow-2xl'>
                <p className='text-xs font-bold uppercase tracking-[0.26em] text-[#5f6c80]'>Today&apos;s rhythm</p>
                <div className='mt-4 space-y-4'>
                  <div className='rounded-2xl bg-[#f1e8da] p-4'>
                    <p className='text-sm text-[#5f6c80]'>Next up</p>
                    <p className='mt-1 text-lg font-bold'>Motion-first frontend systems</p>
                  </div>
                  <div className='flex items-center justify-between text-sm'>
                    <span>Focus streak</span>
                    <span className='font-bold text-[#178582]'>12 days</span>
                  </div>
                  <div className='h-2 overflow-hidden rounded-full bg-[#e5d4bc]'>
                    <div className='h-full w-[72%] rounded-full bg-gradient-to-r from-[#178582] to-[#f08a4b]' />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            data-hero-line
            data-scroll
            data-scroll-speed='0.7'
            className='relative mt-10 flex flex-col gap-3 rounded-[30px] border border-white/14 bg-white/90 p-3 shadow-2xl md:flex-row md:items-center'
          >
            <div className='flex flex-1 items-center gap-3 rounded-[24px] px-4 py-3'>
              <Search className='h-5 w-5 text-[#5f6c80]' />
              <input
                type='text'
                value={SearchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder='Search for product design, React, career prep, AI...'
                className='w-full bg-transparent text-sm text-[#162033] placeholder:text-[#7b8798] focus:outline-none md:text-base'
              />
            </div>
            <button type='submit' className='brand-button min-w-40'>
              Search courses
            </button>
          </form>

          {ActiveSearch && (
            <div className='relative mt-4 flex items-center justify-center gap-3 text-sm text-white/82'>
              <span>
                Showing results for <span className='font-semibold text-white'>&quot;{ActiveSearch}&quot;</span>
              </span>
              <button type='button' onClick={resetFilter} className='underline underline-offset-4'>
                Clear
              </button>
            </div>
          )}
        </div>
      </section>

      <section data-animate='stagger' className='section-shell mt-8 grid gap-4 md:grid-cols-4'>
        {[
          { icon: Users, label: 'Active learners', value: '500K+' },
          { icon: BookOpen, label: 'Curated courses', value: '1,200+' },
          { icon: Award, label: 'Completion rate', value: '95%' },
          { icon: TrendingUp, label: 'Avg. learner rating', value: '4.8/5' },
        ].map((item) => (
          <div key={item.label} className='feature-card-shell rounded-[28px] p-6'>
            <div className='mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#133a5e] text-white'>
              <item.icon className='h-5 w-5' />
            </div>
            <p className='text-4xl font-black'>{item.value}</p>
            <p className='mt-2 text-sm text-[var(--muted-foreground)]'>{item.label}</p>
          </div>
        ))}
      </section>

      <section data-animate='fade' className='section-shell mt-12'>
        <div className='mb-6 flex items-end justify-between gap-4'>
          <div>
            <div className='editorial-label'>Course picks</div>
            <h2 className='mt-4 text-4xl font-black md:text-5xl'>Featured learning tracks</h2>
            <p className='mt-3 max-w-2xl text-[var(--muted-foreground)]'>
              Richer cards, stronger hierarchy, and smoother browsing across the whole catalog.
            </p>
          </div>
        </div>
        <CourseSection ActiveSearch={ActiveSearch} />
      </section>

      <section data-animate='stagger' className='section-shell mt-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]'>
        <div className='feature-card-shell rounded-[34px] p-8'>
          <div className='editorial-label'>Why EduPath</div>
          <h2 className='mt-5 text-4xl font-black'>A calmer interface for serious learners.</h2>
          <p className='mt-4 max-w-xl text-lg leading-8 text-[var(--muted-foreground)]'>
            We rebuilt the experience around readable typography, guided surfaces, and motion that helps orientation instead of distracting from it.
          </p>
        </div>

        <div className='grid gap-5 md:grid-cols-2'>
          {[
            ['Editorial clarity', 'A clearer visual hierarchy turns long study sessions into something easier to scan and stick with.'],
            ['Smarter momentum', 'Animations now support progression, reveal context, and make navigation feel continuous.'],
            ['Focused exploration', 'Course discovery feels more premium with stronger previews and better spacing.'],
            ['Support built in', 'Resources, support requests, and profile pages now live in the same design language.'],
          ].map(([title, copy]) => (
            <div key={title} className='feature-card-shell rounded-[28px] p-6'>
              <h3 className='text-2xl font-bold'>{title}</h3>
              <p className='mt-3 leading-7 text-[var(--muted-foreground)]'>{copy}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Home
