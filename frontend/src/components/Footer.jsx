import React from 'react'
import { BookOpen, Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from 'lucide-react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer data-animate='fade' className='bg-[#0f1c3f] text-white'>
      <div data-animate='stagger' className='max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10'>
        <div data-scroll data-scroll-speed='0.6'>
          <div className='flex items-center gap-3 mb-4'>
            <div className='w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center'>
              <BookOpen className='w-5 h-5 text-white' />
            </div>
            <h3 className='text-3xl font-bold'>EduPath</h3>
          </div>
          <p className='text-blue-100/80 leading-relaxed max-w-sm'>
            Empowering learners worldwide with quality education and accessible courses.
          </p>

          <div className='flex items-center gap-3 mt-6'>
            <button className='w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center'>
              <Facebook className='w-4 h-4' />
            </button>
            <button className='w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center'>
              <Twitter className='w-4 h-4' />
            </button>
            <button className='w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center'>
              <Linkedin className='w-4 h-4' />
            </button>
            <button className='w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center'>
              <Instagram className='w-4 h-4' />
            </button>
          </div>
        </div>

        <div>
          <h4 className='text-3xl font-semibold mb-4'>Quick Links</h4>
          <div className='space-y-3 text-blue-100/85'>
            <Link to='/' className='block hover:text-white transition-colors'>About Us</Link>
            <Link to='/' className='block hover:text-white transition-colors'>Courses</Link>
            <Link to='/' className='block hover:text-white transition-colors'>Instructors</Link>
            <Link to='/' className='block hover:text-white transition-colors'>Events</Link>
            <Link to='/' className='block hover:text-white transition-colors'>Blog</Link>
          </div>
        </div>

        <div>
          <h4 className='text-3xl font-semibold mb-4'>Support</h4>
          <div className='space-y-3 text-blue-100/85'>
            <Link to='/' className='block hover:text-white transition-colors'>Help Center</Link>
            <Link to='/' className='block hover:text-white transition-colors'>FAQ</Link>
            <Link to='/' className='block hover:text-white transition-colors'>Terms of Service</Link>
            <Link to='/' className='block hover:text-white transition-colors'>Privacy Policy</Link>
            <Link to='/' className='block hover:text-white transition-colors'>Contact Us</Link>
          </div>
        </div>

        <div>
          <h4 className='text-3xl font-semibold mb-4'>Contact Info</h4>
          <div className='space-y-4 text-blue-100/85'>
            <div className='flex items-start gap-3'>
              <MapPin className='w-5 h-5 mt-0.5 text-blue-400' />
              <span>123 Education Street, Learning City, ED 12345</span>
            </div>
            <div className='flex items-center gap-3'>
              <Phone className='w-5 h-5 text-blue-400' />
              <span>+1 (555) 123-4567</span>
            </div>
            <div className='flex items-center gap-3'>
              <Mail className='w-5 h-5 text-blue-400' />
              <span>support@edupath.com</span>
            </div>
          </div>
        </div>
      </div>

      <div className='border-t border-white/10 py-6 px-6'>
        <p className='text-center text-blue-100/70 text-sm'>
          © 2026 EduPath. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer
