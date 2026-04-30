import React, { useMemo, useState } from 'react'
import { useGetYtResourcesHook, useGetYtCategoriesHook } from '@/hooks/ytresource.hook'
import ResourceCard from '@/components/ResourceCard'
import { Spinner } from '@/components/ui/spinner'

const FreeResource = () => {
  const [category, setCategory] = useState('')
  const { data: resources = [], isLoading } = useGetYtResourcesHook(category)
  const { data: categories = [] } = useGetYtCategoriesHook()

  const grouped = useMemo(() => {
    const map = {}
    for (const r of resources) {
      const key = r.category || 'uncategorized'
      if (!map[key]) map[key] = []
      map[key].push(r)
    }
    return map
  }, [resources])

  return (
    <div className='page-surface min-h-screen py-10'>
      <div className='section-shell'>
        <div data-animate='hero' className='glass-panel rounded-[38px] p-8 md:p-12'>
          <div className='editorial-label'>Free resources</div>
          <h1 data-hero-line className='mt-5 text-5xl font-black md:text-7xl'>Free video lessons uploaded by our admins</h1>
          <p data-hero-line className='mt-4 max-w-3xl text-lg leading-8 text-[var(--muted-foreground)]'>Browse by category and watch directly inline.</p>
        </div>

        <div data-animate='zoom' className='feature-card-shell mt-8 rounded-[34px] p-6 md:p-8'>
          <div className='mb-6 flex items-center justify-between gap-4'>
            <div className='inline-flex items-center gap-3'>
              <div>
                <h2 className='text-2xl font-black'>Video library</h2>
                <p className='text-sm text-[var(--muted-foreground)]'>Categorized playlists and single videos</p>
              </div>
            </div>

            <label className='inline-flex items-center gap-3 rounded-full border border-[var(--border)] bg-white/70 px-4 py-3'>
              <select value={category} onChange={(e) => setCategory(e.target.value)} className='bg-transparent outline-none'>
                <option value=''>All categories</option>
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </label>
          </div>

          {isLoading ? (
            <div className='flex items-center justify-center py-16'><Spinner /></div>
          ) : (
            <div className='space-y-6'>
              {Object.keys(grouped).length === 0 && <div className='py-12 text-center text-[var(--muted-foreground)]'>No videos available.</div>}
              {Object.entries(grouped).map(([cat, items]) => (
                <section key={cat} className='space-y-4'>
                  <h3 className='text-xl font-semibold'>{cat}</h3>
                  <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                    {items.map((r) => (
                      <ResourceCard key={r._id} resource={r} />
                    ))}
                  </div>
                </section>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default FreeResource
