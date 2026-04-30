    import React from 'react'
    import { useQuery } from '@tanstack/react-query'
    import { useNavigate } from 'react-router-dom'
    import { getAllOrdersAdminApi } from '@/Api/course.api'

    const AdminPurchases = () => {
      const navigate = useNavigate()

      const { data, isLoading, isError, error } = useQuery({
        queryKey: ['adminOrders'],
        queryFn: getAllOrdersAdminApi,
        retry: false
      })

      if (isLoading) return (<div className='p-6'>Loading...</div>)

      if (isError) {
        // If unauthorized, redirect to admin login
        const status = error?.response?.status
        if (status === 401 || status === 403) {
          navigate('/admin/login')
          return null
        }

        const message = error?.response?.data?.message || error?.message || 'Failed to load orders'
        return (<div className='p-6 text-red-600'>{message}</div>)
      }

      const orders = data?.orders || []

      return (
        <div className='p-6 min-h-screen bg-[var(--background)]'>
          <h1 className='text-2xl font-bold text-[var(--foreground)] mb-4'>Purchases</h1>

          <div className='bg-[var(--card)] border border-[var(--border)] rounded-2xl p-4'>
            <table className='w-full text-sm'>
              <thead>
                <tr className='text-left text-[var(--muted-foreground)]'>
                  <th className='p-2'>Order ID</th>
                  <th className='p-2'>User</th>
                  <th className='p-2'>Email</th>
                  <th className='p-2'>Course</th>
                  <th className='p-2'>Amount</th>
                  <th className='p-2'>Date</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <tr key={o._id} className='border-t border-[var(--border)]'>
                    <td className='p-2'>{o._id}</td>
                    <td className='p-2'>{o.user?.fullName || '-'}</td>
                    <td className='p-2'>{o.user?.email || '-'}</td>
                    <td className='p-2'>{o.course?.title || '-'}</td>
                    <td className='p-2'>₹ {o.course?.amount ?? o.totalAmount}</td>
                    <td className='p-2'>{new Date(o.createdAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )
    }

    export default AdminPurchases
