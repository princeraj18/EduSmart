import { Spinner } from '@/components/ui/spinner'
import { useGetSingleCourseHook } from '@/hooks/course.hook'
import { usePayment } from '@/hooks/payment.hook'
import React from 'react'
import { useParams } from 'react-router-dom'

const SingleCourse = () => {
  const { id } = useParams()
  const { data, isLoading } = useGetSingleCourseHook(id)
  const { mutate, isPending } = usePayment()

  const purchaseHandler = (course) => {
    const product = {
      products: {
        _id: course._id,
        name: course.title,
        price: course.amount,
        image: course.thumbnail,
      },
    }
    mutate(product)
  }

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Spinner />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[var(--background)] py-12 px-4">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 bg-[var(--card)] rounded-2xl shadow-lg p-8">

        {/* Course Image */}
        <div className="flex items-center justify-center">
          <img
            src={data?.thumbnail}
            alt={data?.title}
            className="w-full max-h-[320px] object-contain rounded-xl"
          />
        </div>

        {/* Course Details */}
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[var(--foreground)] mb-4">
              {data?.title}
            </h1>

            <p className="text-[var(--muted-foreground)] mb-6 leading-relaxed">
              {data?.description || "Upgrade your skills with this professional course."}
            </p>

            <div className="flex items-center gap-4 mb-8">
              <span className="text-3xl font-bold text-yellow-400">
                ₹{data?.amount}
              </span>
              <span className="text-sm text-[var(--muted-foreground)] line-through">
                ₹{Number(data?.amount) + 999}
              </span>
            </div>
          </div>

          {/* CTA */}
          <button
            disabled={isPending}
            onClick={() => purchaseHandler(data)}
            className="w-full py-4 rounded-xl bg-green-600 text-[var(--accent-foreground)] font-semibold text-lg hover:brightness-95 transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isPending ? <Spinner /> : 'Buy Now'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default SingleCourse
