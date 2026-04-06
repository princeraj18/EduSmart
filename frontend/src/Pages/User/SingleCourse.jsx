import { Spinner } from '@/components/ui/spinner'
import { useGetSingleCourseHook } from '@/hooks/course.hook'
import { usePayment } from '@/hooks/payment.hook'
import React from 'react'
import { Clock3, Sparkles, Users } from 'lucide-react'
import { useParams } from 'react-router-dom'

const SingleCourse = () => {
  const { id } = useParams()
  const { data, isLoading } = useGetSingleCourseHook(id)
  const { mutate, isPending } = usePayment()

  const purchaseHandler = (course) => {
    mutate({
      products: {
        _id: course._id,
        name: course.title,
        price: course.amount,
        image: course.thumbnail,
      },
    })
  }

  if (isLoading) {
    return <div className='flex h-screen items-center justify-center'><Spinner /></div>
  }

  return (
    <div className='page-surface min-h-screen py-10'>
      <div className='section-shell'>
        <div data-animate='zoom' className='grid gap-8 rounded-[38px] border border-[var(--border)] bg-[linear-gradient(180deg,rgba(255,252,247,0.95),rgba(243,232,215,0.82))] p-6 shadow-[0_20px_60px_rgba(20,35,58,0.1)] md:grid-cols-2 md:p-8'>
          <div className='overflow-hidden rounded-[30px] bg-white/50 p-3'>
            <img src={data?.thumbnail} alt={data?.title} className='h-full max-h-[400px] w-full rounded-[24px] object-cover' />
          </div>

          <div className='flex flex-col justify-between'>
            <div>
              <div className='editorial-label'><Sparkles className='h-4 w-4' /> Premium course view</div>
              <h1 className='mt-5 text-4xl font-black md:text-5xl'>{data?.title}</h1>
              <p className='mt-5 leading-8 text-[var(--muted-foreground)]'>{data?.description || 'Upgrade your skills with this professional course.'}</p>
              <div className='mt-6 flex flex-wrap gap-4 text-sm text-[var(--muted-foreground)]'>
                <div className='rounded-full bg-white/65 px-4 py-2'><Users className='mr-2 inline h-4 w-4' /> Popular with learners</div>
                <div className='rounded-full bg-white/65 px-4 py-2'><Clock3 className='mr-2 inline h-4 w-4' /> Self-paced study</div>
              </div>
              <div className='mt-8 flex items-end gap-4'>
                <span className='text-4xl font-black text-[#133a5e]'>Rs {data?.amount}</span>
                <span className='text-sm text-[var(--muted-foreground)] line-through'>Rs {Number(data?.amount || 0) + 999}</span>
              </div>
            </div>

            <button disabled={isPending} onClick={() => purchaseHandler(data)} className='brand-button mt-8 w-full disabled:cursor-not-allowed disabled:opacity-60'>
              {isPending ? <Spinner /> : 'Buy Now'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SingleCourse
