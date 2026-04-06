import { useGetDailyData, useGetDataHook } from '@/hooks/analytic.hook'
import React, { useMemo } from 'react'
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

const DashboardAnalytics = () => {
  const { data, isFetching, dataUpdatedAt } = useGetDataHook()

  const { startDate, endDate } = useMemo(() => {
    const end = new Date()
    const start = new Date()
    start.setDate(end.getDate() - 6); // last 7 days
    end.setDate(end.getDate()+2)
    const toStr = (d) => d.toISOString().split('T')[0]

    return {
      startDate: toStr(start),
      endDate: toStr(end),
    }
  }, [])

  const { data: dailyData, isLoading } = useGetDailyData(startDate, endDate)

  return (
    <div className="min-h-screen bg-[var(--background)] p-8 space-y-10">
      {/* Page Header */}
      <div>
        <div className="flex items-baseline justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Analytics Overview</h1>
            <p className="text-gray-500 mt-1">Track platform performance & revenue</p>
          </div>
          <div className="text-sm text-gray-500">
            {isFetching ? (
              <span>Updating...</span>
            ) : (
              dataUpdatedAt ? (
                <span>Updated {new Date(dataUpdatedAt).toLocaleTimeString()}</span>
              ) : (
                <span>Last update unavailable</span>
              )
            )}
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <StatCard title="Total Courses" value={data?.courses} />
        <StatCard title="Enrollments" value={data?.totalEntrollments} />
        <StatCard title="Revenue" value={`₹ ${data?.totalRevenue}`} />
        <StatCard title="Users" value={data?.users} />
      </div>

      {/* Chart Section */}
      <div className="bg-[var(--card)] rounded-2xl shadow-lg border border-[var(--border)] p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-[var(--foreground)]">
              Revenue & Enrollments Trend
            </h2>
            <p className="text-sm text-[var(--muted-foreground)]">
              Last 7 days performance
            </p>
          </div>
        </div>

        {isLoading ? (
          <ChartSkeleton />
        ) : (
          <div className="h-[55vh]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dailyData || []}>
                <CartesianGrid stroke="#e5e7eb" strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip
                  formatter={(value, name) => {
                    if (name === 'Revenue') return [`₹ ${value}`, 'Revenue']
                    return [value, name]
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  name="Revenue"
                  yAxisId="left"
                  stroke="#2563eb"
                  strokeWidth={3}
                  dot={false}
                  activeDot={{ r: 6 }}
                />
                <Line
                  type="monotone"
                  dataKey="enrollments"
                  name="Enrollments"
                  yAxisId="right"
                  stroke="#16a34a"
                  strokeWidth={3}
                  dot={false}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      {/* Growth Chart Section */}
      <div className="bg-[var(--card)] rounded-2xl shadow-lg border border-[var(--border)] p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-[var(--foreground)]">
              Courses & Users Growth
            </h2>
            <p className="text-sm text-[var(--muted-foreground)]">
              Last 7 days performance
            </p>
          </div>
        </div>

        {isLoading ? (
          <ChartSkeleton />
        ) : (
          <div className="h-[55vh]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dailyData || []}>
                <CartesianGrid stroke="#e5e7eb" strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip formatter={(value, name) => [value, name]} />
                <Line
                  type="monotone"
                  dataKey="coursesCreated"
                  name="Courses Created"
                  yAxisId="left"
                  stroke="#7c3aed"
                  strokeWidth={3}
                  dot={false}
                  activeDot={{ r: 6 }}
                />
                <Line
                  type="monotone"
                  dataKey="usersRegistered"
                  name="Users Registered"
                  yAxisId="right"
                  stroke="#f59e0b"
                  strokeWidth={3}
                  dot={false}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  )
}

export default DashboardAnalytics


const StatCard = ({ title, value }) => (
  <div className="bg-[var(--card)] rounded-xl shadow-md p-6 border border-[var(--border)]">
    <p className="text-sm text-[var(--muted-foreground)]">{title}</p>
    <h2 className="text-2xl font-bold text-[var(--foreground)] mt-2">
      {value ?? '-'}
    </h2>
  </div>
)

const ChartSkeleton = () => (
  <div className="h-[55vh] flex items-center justify-center">
    <div className="animate-pulse w-full h-full bg-gray-100 rounded-xl" />
  </div>
)
