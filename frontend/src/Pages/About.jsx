import React from 'react'
import { Award, Globe, Heart, TrendingUp } from 'lucide-react'

const About = () => {
  return (
    <div className='page-container page-surface'>
      <header data-animate='hero' className='glass-panel overflow-hidden rounded-[38px] p-8 md:p-12'>
        <div className='editorial-label'>About EduPath</div>
        <h1 data-hero-line className='mt-5 max-w-4xl text-5xl font-black md:text-7xl'>A learning platform rebuilt to feel premium, human, and motivating.</h1>
        <p data-hero-line className='mt-5 max-w-3xl text-lg leading-8 text-[var(--muted-foreground)]'>
          We combine accessible education with a more intentional digital atmosphere so students can stay focused, curious, and proud of their progress.
        </p>
      </header>

      <section className='mt-10 grid gap-8 md:grid-cols-2 md:items-center'>
        <div data-animate='left'>
          <div className='editorial-label'>Our story</div>
          <h2 className='mt-4 text-4xl font-black'>EduPath started with one simple belief: good design helps people keep learning.</h2>
          <p className='mt-4 leading-8 text-[var(--muted-foreground)]'>
            What began as a practical learning system has grown into a more complete experience for students who want direction, flexibility, and high-quality content they can trust.
          </p>
          <p className='mt-4 leading-8 text-[var(--muted-foreground)]'>
            We build for learners who are balancing careers, families, new ambitions, and changing industries. The product should meet that reality with clarity and momentum.
          </p>
        </div>
        <div data-animate='right' className='feature-card-shell overflow-hidden rounded-[34px] p-3'>
          <img src='https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1200&q=60' alt='Students learning together' className='h-full min-h-[360px] w-full rounded-[26px] object-cover' />
        </div>
      </section>

      <section data-animate='stagger' className='mt-10 grid gap-4 md:grid-cols-4'>
        {[
          ['500K+', 'Students Worldwide'],
          ['1,200+', 'Courses Available'],
          ['150+', 'Expert Instructors'],
          ['95%', 'Completion Rate'],
        ].map(([value, label]) => (
          <div key={label} className='feature-card-shell rounded-[28px] p-6 text-center'>
            <div className='text-4xl font-black text-[#133a5e]'>{value}</div>
            <div className='mt-2 text-sm text-[var(--muted-foreground)]'>{label}</div>
          </div>
        ))}
      </section>

      <section data-animate='stagger' className='mt-10 grid gap-6 md:grid-cols-2'>
        {[
          [Award, 'Our Mission', 'To help more people gain practical, life-changing skills through accessible and engaging digital education.'],
          [Globe, 'Our Vision', 'To become the most trusted study companion for ambitious learners across every stage of their journey.'],
          [Heart, 'Core Values', 'Clarity, inclusivity, progress, and care shape the way we design every experience and interaction.'],
          [TrendingUp, 'Continuous Innovation', 'We keep evolving the platform so the learning experience always feels current and purposeful.'],
        ].map(([Icon, title, copy]) => (
          <div key={title} className='feature-card-shell rounded-[30px] p-7'>
            <div className='mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#133a5e] text-white'>
              <Icon className='h-5 w-5' />
            </div>
            <h3 className='text-2xl font-bold'>{title}</h3>
            <p className='mt-3 leading-7 text-[var(--muted-foreground)]'>{copy}</p>
          </div>
        ))}
      </section>
    </div>
  )
}

export default About
