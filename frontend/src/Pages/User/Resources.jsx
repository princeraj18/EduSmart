import React, { useState } from 'react'
import { useGetResourcesHook, useGetCategoriesHook } from '@/hooks/resource.hook'
import { Spinner } from '@/components/ui/spinner'

const Resources = () => {
  const [category, setCategory] = useState('')
  const { data: resources = [], isLoading } = useGetResourcesHook(category)
  const { data: categories = [], isLoading: loadingCategories } = useGetCategoriesHook()

  return (
    <div className="min-h-screen p-8 bg-[var(--background)]">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-[var(--foreground)]">Resources</h1>
        <p className="text-sm text-[var(--muted-foreground)] mt-1">PDF materials provided by the admin</p>

        <div className="mt-6 bg-[var(--card)] rounded-2xl p-6 shadow">
          <div className="flex gap-3 items-center mb-4">
            <label className="text-sm text-[var(--muted-foreground)]">Filter:</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="px-3 py-2 border bg-black rounded-md">
              <option value="">All categories</option>
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          {isLoading ? (
            <div className="flex items-center justify-center"><Spinner /></div>
          ) : (
            <ul className="space-y-4">
              {resources.length === 0 && <li className="text-sm text-[var(--muted-foreground)]">No resources available.</li>}
              {resources.map((r) => (
                <li key={r._id} className="flex items-center justify-between border p-3 rounded-md">
                  <div>
                    <div className="font-semibold">{r.title}</div>
                    <div className="text-sm text-[var(--muted-foreground)]">{r.description}</div>
                    <div className="text-xs text-[var(--muted-foreground)] mt-1">Uploaded {new Date(r.createdAt).toLocaleString()}</div>
                  </div>
                  <div>
                    <a href={`${import.meta.env.VITE_BASE_URL}/resource/${r._id}/download`} target="_blank" rel="noreferrer" className="px-4 py-2 bg-indigo-600 text-white rounded-md">Download</a>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}

export default Resources
