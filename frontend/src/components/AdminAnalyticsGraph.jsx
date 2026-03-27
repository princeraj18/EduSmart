import React, { useMemo } from 'react'
import { useGetDailyData, useGetDataHook } from '@/hooks/analytic.hook'
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

const AdminAnalyticsGraph = ({ days = 7, height = 300 }) => {
  const { data } = useGetDataHook()

  const { startDate, endDate } = useMemo(() => {
    const end = new Date()
    const start = new Date()
    start.setDate(end.getDate() - (days - 1))
    const toStr = (d) => d.toISOString().split('T')[0]

    return {
      startDate: toStr(start),
      endDate: toStr(end),
    }
  }, [days])

  const { data: dailyData = [], isLoading } = useGetDailyData(startDate, endDate)

  if (isLoading) {
    return (
      <div className="h-[200px] flex items-center justify-center">
        <div className="animate-pulse w-full h-full bg-gray-100 rounded-xl" />
      </div>
    )
  }

  return (
    <div className="bg-[var(--card)] rounded-2xl shadow-lg border border-[var(--border)] p-4">
      <div className="mb-3">
        <h3 className="text-lg font-semibold text-[var(--foreground)]">Revenue & Enrollments Trend</h3>
        <p className="text-sm text-[var(--muted-foreground)]">Last {days} days</p>
      </div>
      <div style={{ width: '100%', height }}>
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
    </div>
  )
}

export default AdminAnalyticsGraph
