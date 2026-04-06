import React from 'react'
import { BookOpen, Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from 'lucide-react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer data-animate='fade' className='mx-auto mt-20 w-[min(96%,84rem)] overflow-hidden rounded-[36px] border border-[#17304f] bg-[#10233a] text-white shadow-[0_24px_70px_rgba(9,19,33,0.35)]'>
      <div className='h-px w-full bg-gradient-to-r from-transparent via-[#f08a4b] to-transparent opacity-80' />
      <div data-animate='stagger' className='max-w-7xl mx-auto grid grid-cols-1 gap-10 px-6 py-12 md:grid-cols-2 lg:grid-cols-4'>
        <div data-scroll data-scroll-speed='0.6'>
          <div className='mb-4 flex items-center gap-3'>
            <div className='flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#178582] to-[#f08a4b]'>
              <BookOpen className='h-5 w-5 text-white' />
            </div>
            <div>
              <h3 className='text-3xl font-bold'>EduPath</h3>
              <p className='text-xs uppercase tracking-[0.28em] text-[#dce8f1]/55'>Learn with momentum</p>
            </div>
          </div>

          <p className='max-w-sm leading-relaxed text-[#dce8f1]/80'>
            A richer learning journey for ambitious students, career shifters, and lifelong learners.
          </p>

          <div className='mt-6 flex items-center gap-3'>
            {[Facebook, Twitter, Linkedin, Instagram].map((Icon, index) => (
              <button key={index} className='flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 transition-colors hover:bg-white/20'>
                <Icon className='h-4 w-4' />
              </button>
            ))}
          </div>
        </div>

        <div>
          <h4 className='mb-4 text-3xl font-semibold'>Explore</h4>
          <div className='space-y-3 text-[#dce8f1]/85'>
            <Link to='/' className='block transition-colors hover:text-white'>Home</Link>
            <Link to='/courses' className='block transition-colors hover:text-white'>Course Library</Link>
            <Link to='/about' className='block transition-colors hover:text-white'>About EduPath</Link>
            <Link to='/resources' className='block transition-colors hover:text-white'>Resources</Link>
            <Link to='/contact' className='block transition-colors hover:text-white'>Contact</Link>
          </div>
        </div>

        <div>
          <h4 className='mb-4 text-3xl font-semibold'>Student Desk</h4>
          <div className='space-y-3 text-[#dce8f1]/85'>
            <Link to='/YourCourse' className='block transition-colors hover:text-white'>Your Courses</Link>
            <Link to='/support/my' className='block transition-colors hover:text-white'>Track Requests</Link>
            <Link to='/terms' className='block transition-colors hover:text-white'>Terms of Service</Link>
            <Link to='/profile' className='block transition-colors hover:text-white'>Profile</Link>
          </div>
        </div>

        <div>
          <h4 className='mb-4 text-3xl font-semibold'>Contact Info</h4>
          <div className='space-y-4 text-[#dce8f1]/85'>
            <div className='flex items-start gap-3'>
              <MapPin className='mt-0.5 h-5 w-5 text-[#f3bb5d]' />
              <span>123 Education Street, Learning City, ED 12345</span>
            </div>
            <div className='flex items-center gap-3'>
              <Phone className='h-5 w-5 text-[#f3bb5d]' />
              <span>+1 (555) 123-4567</span>
            </div>
            <div className='flex items-center gap-3'>
              <Mail className='h-5 w-5 text-[#f3bb5d]' />
              <span>support@edupath.com</span>
            </div>
          </div>
        </div>
      </div>

      <div className='border-t border-white/10 px-6 py-6'>
        <p className='text-center text-sm text-[#dce8f1]/70'>
          Copyright 2026 EduPath. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer
