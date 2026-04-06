import React, { useState } from 'react'
import { useGetResourcesHook, useGetCategoriesHook } from '@/hooks/resource.hook'
import { Spinner } from '@/components/ui/spinner'
import { Download, Library, Tag } from 'lucide-react'

const Resources = () => {
  const [category, setCategory] = useState('')
  const { data: resources = [], isLoading } = useGetResourcesHook(category)
  const { data: categories = [] } = useGetCategoriesHook()

  return (
    <div className='page-surface min-h-screen py-10'>
      <div className='section-shell'>
        <div data-animate='hero' className='glass-panel rounded-[38px] p-8 md:p-12'>
          <div className='editorial-label'>Resources</div>
          <h1 data-hero-line className='mt-5 text-5xl font-black md:text-7xl'>A cleaner library for your downloadable study materials.</h1>
          <p data-hero-line className='mt-4 max-w-3xl text-lg leading-8 text-[var(--muted-foreground)]'>
            PDFs and admin-shared materials now live in a more polished workspace that matches the rest of EduPath.
          </p>
        </div>

        <div data-animate='zoom' className='feature-card-shell mt-8 rounded-[34px] p-6 md:p-8'>
          <div className='mb-6 flex flex-wrap items-center justify-between gap-4'>
            <div className='inline-flex items-center gap-3'>
              <div className='flex h-12 w-12 items-center justify-center rounded-2xl bg-[#133a5e] text-white'>
                <Library className='h-5 w-5' />
              </div>
              <div>
                <h2 className='text-2xl font-black'>Resource shelf</h2>
                <p className='text-sm text-[var(--muted-foreground)]'>Filter by category and keep your files organized.</p>
              </div>
            </div>

            <label className='inline-flex items-center gap-3 rounded-full border border-[var(--border)] bg-white/70 px-4 py-3'>
              <Tag className='h-4 w-4 text-[#178582]' />
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
            <div data-animate='stagger' className='space-y-4'>
              {resources.length === 0 && <div className='py-12 text-center text-[var(--muted-foreground)]'>No resources available.</div>}
              {resources.map((r) => (
                <div key={r._id} className='flex flex-col gap-4 rounded-[26px] border border-[var(--border)] bg-white/70 p-5 md:flex-row md:items-center md:justify-between'>
                  <div>
                    <div className='text-xl font-bold'>{r.title}</div>
                    <div className='mt-1 text-sm text-[var(--muted-foreground)]'>{r.description}</div>
                    <div className='mt-2 text-xs uppercase tracking-[0.22em] text-[var(--muted-foreground)]'>
                      Uploaded {new Date(r.createdAt).toLocaleString()}
                    </div>
                  </div>
                  <a href={`${import.meta.env.VITE_BASE_URL}/resource/${r._id}/download`} target='_blank' rel='noreferrer' className='brand-button inline-flex items-center justify-center gap-2'>
                    <Download className='h-4 w-4' />
                    Download
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Resources
