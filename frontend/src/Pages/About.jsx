import React from 'react'
import './pages.css'
import { Award, Globe, Heart, TrendingUp } from 'lucide-react'

const About = () => {
  return (
    <div className="page-container page-surface">
      {/* Hero */}
      <header data-animate="hero" className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20 px-6 rounded-xl mb-12">
        <h1 data-hero-line className="text-4xl md:text-6xl font-extrabold text-center">About EduPath</h1>
        <p data-hero-line className="mt-4 text-center text-lg md:text-xl max-w-3xl mx-auto text-blue-100">Transforming Education Through Innovation and Accessibility</p>
      </header>

      {/* Our Story */}
      <section className="grid md:grid-cols-2 gap-8 items-center mb-12">
        <div data-animate="left">
          <h2 className="text-3xl font-bold mb-4">Our Story</h2>
          <p className="text-[var(--muted-foreground)] mb-4">
            EduPath was founded in 2026 with a simple yet powerful vision: to make quality education accessible to everyone, regardless of their location or background. What started as a small platform with just 20 courses has grown into a global learning community serving hundreds of thousands of students worldwide.
          </p>

          <p className="text-[var(--muted-foreground)]">
            Our journey began when our founder, Sarah Johnson, an educator with years of experience, recognized the need for flexible, affordable, and high-quality online learning. She assembled a team of passionate educators, developers, and designers who shared her vision of democratizing education.
          </p>
        </div>

        <div data-animate="right">
          <img src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1200&q=60" alt="students" className="rounded-xl shadow-lg w-full object-cover" />
        </div>
      </section>

      {/* Stats banner */}
      <section data-animate="stagger" className="stats-banner bg-gray-50 rounded-xl mb-12">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center py-6">
          <div>
            <div className="stat-number text-4xl md:text-5xl">500K+</div>
            <div className="text-sm text-[var(--muted-foreground)] mt-2">Students Worldwide</div>
          </div>

          <div>
            <div className="stat-number text-4xl md:text-5xl">1,200+</div>
            <div className="text-sm text-[var(--muted-foreground)] mt-2">Courses Available</div>
          </div>

          <div>
            <div className="stat-number text-4xl md:text-5xl">150+</div>
            <div className="text-sm text-[var(--muted-foreground)] mt-2">Expert Instructors</div>
          </div>

          <div>
            <div className="stat-number text-4xl md:text-5xl">95%</div>
            <div className="text-sm text-[var(--muted-foreground)] mt-2">Completion Rate</div>
          </div>
        </div>
      </section>

      {/* Mission / Vision / Values */}
      <section data-animate="stagger" className="grid md:grid-cols-2 gap-6 mb-12">
        <div className="feature-card p-6 bg-white rounded-xl shadow-md">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center"><Award className="text-blue-600 w-6 h-6" /></div>
            <div>
              <h3 className="text-xl text-black font-semibold">Our Mission</h3>
              <p className="text-[var(--muted-foreground)] mt-2">To empower individuals worldwide with accessible, high-quality education that enables them to achieve their personal and professional goals.</p>
            </div>
          </div>
        </div>

        <div className="feature-card p-6 bg-white rounded-xl shadow-md">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center"><Globe className="text-blue-600 w-6 h-6" /></div>
            <div>
              <h3 className="text-xl text-black font-semibold">Our Vision</h3>
              <p className="text-[var(--muted-foreground)] mt-2">To become the world's most trusted and innovative learning platform, bridging the gap between education and career success.</p>
            </div>
          </div>
        </div>

        <div className="feature-card p-6 bg-white rounded-xl shadow-md">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center"><Heart className="text-blue-600 w-6 h-6" /></div>
            <div>
              <h3 className="text-xl text-black font-semibold">Core Values</h3>
              <p className="text-[var(--muted-foreground)] mt-2">Quality, inclusivity, and learner-centered design guide everything we build and share.</p>
            </div>
          </div>
        </div>

        <div className="feature-card p-6 bg-white rounded-xl shadow-md">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center"><TrendingUp className="text-blue-600 w-6 h-6" /></div>
            <div>
              <h3 className="text-xl text-black font-semibold">Continuous Innovation</h3>
              <p className="text-[var(--muted-foreground)] mt-2">We constantly evolve our platform to incorporate the latest in educational technology and pedagogy.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section data-animate="stagger" className="mb-16">
        <h3 className="text-3xl font-bold text-center mb-4">Meet Our Leadership Team</h3>
        <p className="text-center text-[var(--muted-foreground)] max-w-2xl mx-auto mb-8">Passionate educators and innovators dedicated to your success</p>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <div className="team-card bg-white rounded-xl shadow-md overflow-hidden">
            <img src="https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=1200&q=60" alt="Sarah Johnson" className="w-full h-48 object-cover" />
            <div className="p-6 text-center">
              <div className="text-lg font-semibold text-black">Michael Chen</div>
              <div className="text-[var(--muted-foreground)]">CEO & Founder</div>
            </div>
          </div>

          <div className="team-card bg-white rounded-xl shadow-md overflow-hidden">
            <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1200&q=60" alt="Michael Chen" className="w-full h-48 object-cover" />
            <div className="p-6 text-center">
              <div className="text-lg font-semibold text-black">Sarah Johnson</div>
              <div className="text-[var(--muted-foreground)]">Chief Technology Officer</div>
            </div>
          </div>

          <div className="team-card bg-white rounded-xl shadow-md overflow-hidden">
            <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Emily Rodriguez" className="w-full h-48 object-fill" />
            <div className="p-6 text-center">
              <div className="text-lg font-semibold text-black">Jack Rodriguez</div>
              <div className="text-[var(--muted-foreground)]">Head of Education</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
