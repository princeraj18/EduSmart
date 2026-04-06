import React from 'react'

const Terms = () => {
  return (
    <div className='page-container page-surface'>
      <section data-animate='hero' className='glass-panel rounded-[38px] p-8 md:p-12'>
        <div className='editorial-label'>Terms</div>
        <h1 data-hero-line className='mt-5 text-5xl font-black md:text-7xl'>Terms and conditions, presented more clearly.</h1>
        <p data-hero-line className='mt-4 max-w-3xl text-lg leading-8 text-[var(--muted-foreground)]'>
          Please read these terms carefully before using EduPath and purchasing any learning products.
        </p>
      </section>

      <div data-animate='stagger' className='mt-10 space-y-4'>
        {[
          ['Acceptance', 'By using EduPath you agree to these terms. If you do not agree, do not use the service.'],
          ['Content', 'All course content is provided by instructors. We strive for accuracy but disclaim warranties.'],
          ['Payments', 'Payments are processed via our payment provider and are subject to their terms.'],
          ['Refunds', 'Refund eligibility is described on the purchase page and in the payment policy.'],
          ['Contact', 'Questions about these terms can be sent to support@edupath.com.'],
        ].map(([title, copy], index) => (
          <div key={title} className='feature-card-shell rounded-[28px] p-6'>
            <p className='text-xs font-bold uppercase tracking-[0.24em] text-[var(--muted-foreground)]'>Section {index + 1}</p>
            <h3 className='mt-2 text-2xl font-bold'>{title}</h3>
            <p className='mt-3 leading-7 text-[var(--muted-foreground)]'>{copy}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Terms
