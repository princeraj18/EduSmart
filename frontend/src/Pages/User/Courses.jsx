import React, { useMemo, useState } from 'react'
import { useGetCourseHook } from '@/hooks/course.hook'
import { Filter, Grid as GridIcon, List as ListIcon, Star, Users, Clock } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Courses = () => {
  const { data, isLoading } = useGetCourseHook()
  const courses = data?.courses || []
  const navigate = useNavigate()
  const [showFilters, setShowFilters] = useState(false)
  const [selectedCats, setSelectedCats] = useState(new Set())
  const [priceFilter, setPriceFilter] = useState(null)
  const [ratingFilter, setRatingFilter] = useState(null)
  const [sortBy, setSortBy] = useState('most-popular')
  const [gridView, setGridView] = useState(true)

  const categories = useMemo(() => ['Web Dev', 'Data Analytics', 'Management', 'Version Control', 'New Tool'], [])

  const toggleCategory = (cat) => {
    const next = new Set(selectedCats)
    if (next.has(cat)) next.delete(cat)
    else next.add(cat)
    setSelectedCats(next)
  }

  const clearAll = () => {
    setSelectedCats(new Set())
    setPriceFilter(null)
    setRatingFilter(null)
    setSortBy('most-popular')
  }

  const filtered = useMemo(() => {
    let out = [...courses]
    if (selectedCats.size > 0) out = out.filter((c) => selectedCats.has(c.category))
    if (priceFilter) {
      out = out.filter((c) => {
        const price = Number(c.price || 0)
        switch (priceFilter) {
          case 'free': return price === 0
          case 'paid': return price > 0
          case 'under50': return price > 0 && price < 50
          case '50-100': return price >= 50 && price <= 100
          case 'over100': return price > 100
          default: return true
        }
      })
    }
    if (ratingFilter) out = out.filter((c) => Number(c.rating || 0) >= ratingFilter)
    switch (sortBy) {
      case 'most-popular': out.sort((a, b) => (b.enrolled || 0) - (a.enrolled || 0)); break
      case 'highest-rated': out.sort((a, b) => (b.rating || 0) - (a.rating || 0)); break
      case 'newest': out.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); break
      case 'price-asc': out.sort((a, b) => Number(a.price || 0) - Number(b.price || 0)); break
      case 'price-desc': out.sort((a, b) => Number(b.price || 0) - Number(a.price || 0)); break
      default: break
    }
    return out
  }, [courses, selectedCats, priceFilter, ratingFilter, sortBy])

  return (
    <div className='page-surface min-h-screen py-10 text-[var(--foreground)]'>
      <div className='section-shell'>
        <div data-animate='hero' className='glass-panel rounded-[38px] p-8 md:p-12'>
          <div className='editorial-label'>Course Library</div>
          <h1 data-hero-line className='mt-5 text-5xl font-black md:text-7xl'>Browse courses in a richer, more intentional interface.</h1>
          <p data-hero-line className='mt-4 max-w-3xl text-lg leading-8 text-[var(--muted-foreground)]'>Filter by category, price, and rating while keeping the visual focus on what matters most: the learning itself.</p>
        </div>

        <div className='mt-8 grid grid-cols-1 gap-6 md:grid-cols-12'>
          <aside data-animate='left' className={`${showFilters ? 'block' : 'hidden'} md:col-span-3 md:block`}>
            <div className='feature-card-shell rounded-[30px] p-5'>
              <div className='mb-4 flex items-center justify-between'>
                <h3 className='text-xl font-bold'>Filters</h3>
                <button onClick={clearAll} className='text-sm font-semibold text-[#178582]'>Clear all</button>
              </div>

              <div className='space-y-5'>
                <div>
                  <h4 className='mb-3 font-semibold'>Categories</h4>
                  <div className='space-y-2'>
                    {categories.map((c) => (
                      <label key={c} className='flex items-center gap-2 text-sm'>
                        <input type='checkbox' checked={selectedCats.has(c)} onChange={() => toggleCategory(c)} />
                        <span>{c}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className='mb-3 font-semibold'>Price</h4>
                  <div className='space-y-2 text-sm'>
                    {['free', 'paid', 'under50', '50-100', 'over100'].map((key) => (
                      <label key={key} className='flex items-center gap-2'>
                        <input type='radio' name='price' checked={priceFilter === key} onChange={() => setPriceFilter(key)} />
                        <span>{key === 'under50' ? 'Under $50' : key === '50-100' ? '$50 - $100' : key === 'over100' ? 'Over $100' : key.charAt(0).toUpperCase() + key.slice(1)}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className='mb-3 font-semibold'>Rating</h4>
                  <div className='space-y-2 text-sm'>
                    {[4.5, 4.0, 3.5, 3.0].map((rate) => (
                      <label key={rate} className='flex items-center gap-2'>
                        <input type='radio' name='rating' checked={ratingFilter === rate} onChange={() => setRatingFilter(rate)} />
                        <span>{rate} & up</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </aside>

          <main data-animate='right' className='md:col-span-9'>
            <div className='mb-6 flex flex-wrap items-center justify-between gap-4'>
              <div className='flex items-center gap-3'>
                <button onClick={() => setShowFilters((v) => !v)} className='brand-button-secondary inline-flex items-center gap-2 md:hidden'>
                  <Filter className='h-4 w-4' />
                  Filters
                </button>
                <div className='editorial-label'>{filtered.length} courses</div>
              </div>

              <div className='flex items-center gap-3'>
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className='rounded-full border border-[var(--border)] bg-white/70 px-4 py-3'>
                  <option value='most-popular'>Most Popular</option>
                  <option value='highest-rated'>Highest Rated</option>
                  <option value='newest'>Newest</option>
                  <option value='price-asc'>Price: Low to High</option>
                  <option value='price-desc'>Price: High to Low</option>
                </select>
                <div className='rounded-full border border-[var(--border)] bg-white/55 p-1'>
                  <button onClick={() => setGridView(true)} className={`rounded-full p-2 ${gridView ? 'bg-[var(--primary)] text-white' : ''}`}><GridIcon className='h-5 w-5' /></button>
                  <button onClick={() => setGridView(false)} className={`rounded-full p-2 ${!gridView ? 'bg-[var(--primary)] text-white' : ''}`}><ListIcon className='h-5 w-5' /></button>
                </div>
              </div>
            </div>

            {isLoading ? (
              <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
                {[...Array(6)].map((_, i) => <div key={i} className='h-72 animate-pulse rounded-[28px] bg-[#e9dbc7]' />)}
              </div>
            ) : (
              <div data-animate='stagger' className={`grid gap-6 ${gridView ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
                {filtered.map((item) => (
                  <article key={item._id} onClick={() => navigate(`/singleCourse/${item._id}`)} className='feature-card-shell cursor-pointer overflow-hidden rounded-[28px] p-0 transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_50px_rgba(20,35,58,0.14)]'>
                    <div className='relative'>
                      <img src={item.thumbnail || 'https://images.unsplash.com/photo-1526378729207-1f2d5d2b3f16?auto=format&fit=crop&w=1200&q=60'} alt={item.title} className='h-48 w-full object-cover' />
                      <span className='absolute left-3 top-3 rounded-full bg-[#133a5e] px-3 py-1 text-xs text-white'>{item.category || 'General'}</span>
                      <span className='absolute right-3 top-3 rounded-full bg-[#fff8ef] px-3 py-1 text-xs text-[#133a5e]'>{item.level || 'All Levels'}</span>
                    </div>
                    <div className='p-5'>
                      <h3 className='text-xl font-bold'>{item.title}</h3>
                      <div className='mt-1 text-sm text-[var(--muted-foreground)]'>By {item.instructor || item.author || 'Unknown'}</div>
                      <div className='my-4 flex items-center gap-4 text-sm text-[var(--muted-foreground)]'>
                        <div className='flex items-center gap-1'><Star className='h-4 w-4 text-[#f08a4b]' /> <span>{item.rating || '4.8'}</span></div>
                        <div className='flex items-center gap-1'><Users className='h-4 w-4' /> <span>{item.enrolled || 1234}</span></div>
                        <div className='flex items-center gap-1'><Clock className='h-4 w-4' /> <span>{item.duration || '10h'}</span></div>
                      </div>
                      <div className='flex items-center justify-between'>
                        <div className='text-2xl font-black text-[#133a5e]'>{item.price ? `$${item.price}` : 'Free'}</div>
                        <button className='brand-button'>View Course</button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}

export default Courses
