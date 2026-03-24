import React from 'react'
import { Search, X } from 'lucide-react'

const SearchResult = ({ 
  SearchInput, 
  setSearchInput, 
  handleSubmit, 
  onReset, 
  hasActiveSearch 
}) => {

  const SearchText = [
    'MERN Stack Development', 
    'React for Beginners', 
    'Advanced JavaScript', 
    'Node.js Essentials'
  ]

  return (
    <div className='min-h-[28vh] bg-[var(--background)] border-b border-[var(--border)] flex items-center'>
      <div className='max-w-4xl mx-auto px-6 w-full flex flex-col items-center gap-6'>

        {/* Search Bar */}
        <form 
          onSubmit={handleSubmit} 
          className='w-full max-w-2xl flex items-center gap-4 justify-center'
        >
          <div className='relative flex-1'>
            <Search className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted-foreground)]' />

            <input
              value={SearchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              type="text"
              placeholder='Search courses...'
              className='w-full pl-10 pr-10 py-3 bg-[var(--card)] border border-[var(--border)] rounded-xl
              focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] focus:outline-none
              transition-all text-base text-[var(--foreground)] placeholder:[color:var(--muted-foreground)]'
            />

            {SearchInput && (
              <button
                type='button'
                onClick={() => setSearchInput('')}
                className='absolute right-3 top-1/2 -translate-y-1/2 p-1 
                hover:bg-[var(--popover)] rounded-lg transition-colors'
              >
                <X className='w-4 h-4 text-[var(--muted-foreground)] hover:text-[var(--foreground)]' />
              </button>
            )}
          </div>

          <button
            type='submit'
            className='px-6 py-3 bg-[var(--accent)] hover:brightness-95 text-[var(--accent-foreground)] 
            font-medium rounded-xl transition-colors text-sm'
          >
            Search
          </button>
        </form>

        {/* Quick Tags */}
        <div className='flex flex-wrap justify-center gap-3'>
          {SearchText.map((item, index) => (
            <button
              key={index}
              onClick={() => setSearchInput(item)}
              className='px-4 py-2 bg-[var(--popover)] hover:bg-[var(--card)] 
              border border-[var(--border)] rounded-lg text-sm font-medium 
              text-[var(--muted-foreground)] transition-colors'
            >
              {item}
            </button>
          ))}
        </div>

        {/* Reset */}
        {hasActiveSearch && (
          <button
            onClick={onReset}
            className='px-4 py-2 bg-[var(--popover)] hover:bg-[var(--card)] 
            text-[var(--muted-foreground)] font-medium text-sm rounded-lg 
            border border-[var(--border)] transition-colors'
          >
            Reset filter
          </button>
        )}

      </div>
    </div>
  )
}

export default SearchResult
