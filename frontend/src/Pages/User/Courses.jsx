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

  const categories = useMemo(() => {
    const s = new Set()
    courses.forEach(c => {
      if (c.category) s.add(c.category)
    })
    return Array.from(s)
  }, [courses])

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
    if (selectedCats.size > 0) {
      out = out.filter(c => selectedCats.has(c.category))
    }

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

    if (ratingFilter) {
      out = out.filter(c => Number(c.rating || 0) >= ratingFilter)
    }

    switch (sortBy) {
      case 'most-popular': out.sort((a, b) => (b.enrolled || 0) - (a.enrolled || 0)); break
      case 'highest-rated': out.sort((a, b) => (b.rating || 0) - (a.rating || 0)); break
      case 'newest': out.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); break
      case 'price-asc': out.sort((a, b) => (Number(a.price || 0) - Number(b.price || 0))); break
      case 'price-desc': out.sort((a, b) => (Number(b.price || 0) - Number(a.price || 0))); break
      default: break
    }

    return out
  }, [courses, selectedCats, priceFilter, ratingFilter, sortBy])

  const goToCourse = (id) => navigate(`/singleCourse/${id}`)

  return (
    <div className='min-h-screen text-black bg-[var(--background)] text-[var(--foreground)] py-10'>
      <div className='max-w-7xl mx-auto px-4'>
        {/* Top bar */}
        <div className='flex items-center justify-between mb-6 gap-4'>
          <div className='flex items-center gap-3'>
            <button onClick={() => setShowFilters(v => !v)} className='inline-flex items-center gap-2 px-3 py-2 rounded-lg border bg-white'>
              <Filter className='w-4 h-4 ' /> Filters
            </button>
            <div className='text-sm text-[var(--muted-foreground)]'>Showing {filtered.length} courses</div>
          </div>

          <div className='flex items-center gap-3'>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className='px-3 py-2 rounded-lg border bg-white'>
              <option value='most-popular'>Most Popular</option>
              <option value='highest-rated'>Highest Rated</option>
              <option value='newest'>Newest</option>
              <option value='price-asc'>Price: Low to High</option>
              <option value='price-desc'>Price: High to Low</option>
            </select>
            <button onClick={() => setGridView(true)} className={`p-2 rounded-lg ${gridView ? 'bg-[var(--card)]' : 'bg-white'}`}><GridIcon className='w-5 h-5'/></button>
            <button onClick={() => setGridView(false)} className={`p-2 rounded-lg ${!gridView ? 'bg-[var(--card)]' : 'bg-white'}`}><ListIcon className='w-5 h-5'/></button>
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-12 gap-6'>
          {/* Sidebar */}
          <aside className={`${showFilters ? 'block' : 'hidden'} md:block md:col-span-3 lg:col-span-3`}>
            <div className='space-y-4'>
              <div className='p-4 bg-white rounded-xl border'>
                <h4 className='font-semibold mb-3'>Categories</h4>
                <div className='space-y-2'>
                  {categories.length === 0 && <div className='text-sm text-[var(--muted-foreground)]'>No categories</div>}
                  {categories.map((c) => (
                    <label key={c} className='flex items-center gap-2 text-sm'>
                      <input type='checkbox' checked={selectedCats.has(c)} onChange={() => toggleCategory(c)} />
                      <span>{c}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className='p-4 bg-white rounded-xl border'>
                <h4 className='font-semibold mb-3'>Price</h4>
                <div className='space-y-2'>
                  <label className='flex items-center gap-2 text-sm'><input type='radio' name='price' checked={priceFilter === 'free'} onChange={() => setPriceFilter('free')} /> Free</label>
                  <label className='flex items-center gap-2 text-sm'><input type='radio' name='price' checked={priceFilter === 'paid'} onChange={() => setPriceFilter('paid')} /> Paid</label>
                  <label className='flex items-center gap-2 text-sm'><input type='radio' name='price' checked={priceFilter === 'under50'} onChange={() => setPriceFilter('under50')} /> Under $50</label>
                  <label className='flex items-center gap-2 text-sm'><input type='radio' name='price' checked={priceFilter === '50-100'} onChange={() => setPriceFilter('50-100')} /> $50 - $100</label>
                  <label className='flex items-center gap-2 text-sm'><input type='radio' name='price' checked={priceFilter === 'over100'} onChange={() => setPriceFilter('over100')} /> Over $100</label>
                </div>
              </div>

              <div className='p-4 bg-white rounded-xl border'>
                <h4 className='font-semibold mb-3'>Rating</h4>
                <div className='space-y-2'>
                  <label className='flex items-center gap-2 text-sm'><input type='radio' name='rating' checked={ratingFilter === 4.5} onChange={() => setRatingFilter(4.5)} /> 4.5 & up</label>
                  <label className='flex items-center gap-2 text-sm'><input type='radio' name='rating' checked={ratingFilter === 4.0} onChange={() => setRatingFilter(4.0)} /> 4.0 & up</label>
                  <label className='flex items-center gap-2 text-sm'><input type='radio' name='rating' checked={ratingFilter === 3.5} onChange={() => setRatingFilter(3.5)} /> 3.5 & up</label>
                  <label className='flex items-center gap-2 text-sm'><input type='radio' name='rating' checked={ratingFilter === 3.0} onChange={() => setRatingFilter(3.0)} /> 3.0 & up</label>
                </div>
              </div>

              <div className='p-4 bg-white rounded-xl border text-center'>
                <button onClick={clearAll} className='px-4 py-2 rounded-lg border bg-white w-full'>Clear All Filters</button>
              </div>
            </div>
          </aside>

          {/* Courses grid */}
          <main className='md:col-span-9 lg:col-span-9'>
            {isLoading ? (
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                {[...Array(6)].map((_, i) => (
                  <div key={i} className='animate-pulse bg-white rounded-xl p-4 h-72' />
                ))}
              </div>
            ) : (
              <div className={`grid gap-6 ${gridView ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
                {filtered.map((item) => (
                  <article key={item._id} onClick={() => goToCourse(item._id)} className='group bg-white rounded-2xl border p-0 overflow-hidden cursor-pointer hover:shadow-xl transition'>
                    <div className='relative'>
                      <img src={item.thumbnail || 'https://images.unsplash.com/photo-1526378729207-1f2d5d2b3f16?auto=format&fit=crop&w=1200&q=60'} alt={item.title} className='w-full h-44 object-cover' />
                      <span className='absolute left-3 top-3 bg-blue-600 text-white text-xs px-3 py-1 rounded-full'>{item.category || 'General'}</span>
                      <span className='absolute right-3 top-3 bg-white text-xs px-3 py-1 rounded-full'>{item.level || 'All Levels'}</span>
                    </div>

                    <div className='p-4'>
                      <h3 className='text-lg font-semibold mb-1 line-clamp-2'>{item.title}</h3>
                      <div className='text-sm text-[var(--muted-foreground)] mb-3'>By {item.instructor || item.author || 'Unknown'}</div>

                      <div className='flex items-center gap-4 text-sm text-[var(--muted-foreground)] mb-3'>
                        <div className='flex items-center gap-1'><Star className='w-4 h-4 text-yellow-400' /> <span>{item.rating || '4.8'}</span></div>
                        <div className='flex items-center gap-1'><Users className='w-4 h-4' /> <span>{item.enrolled || 1234}</span></div>
                        <div className='flex items-center gap-1'><Clock className='w-4 h-4' /> <span>{item.duration || '10h'}</span></div>
                      </div>

                      <div className='flex items-center justify-between'>
                        <div className='text-2xl font-bold text-blue-600'>
                          {item.price ? `$${item.price}` : 'Free'}
                        </div>
                        <div>
                          <button className='px-4 py-2 bg-[var(--accent)] text-[var(--accent-foreground)] rounded-lg'>View Course</button>
                        </div>
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
