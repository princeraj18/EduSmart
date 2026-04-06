import { dailyDataApi, getDataApi } from '@/Api/Analytic.api'
import { useQuery } from '@tanstack/react-query'

// Polling-enabled hook for dashboard summary KPIs (default: every 10s)
export const useGetDataHook = (options = {}) => {
    return useQuery({
        queryKey: ['getData'],
        queryFn: getDataApi,
        // default polling interval (ms) to keep dashboard values fresh
        refetchInterval: options.refetchInterval ?? 10000,
        refetchOnWindowFocus: options.refetchOnWindowFocus ?? true,
        staleTime: options.staleTime ?? 5000,
    })
}

// Daily data hook (charts). Enabled only when valid dates are provided.
export const useGetDailyData = (startDate, endDate, options = {}) => {
    return useQuery({
        queryKey: ['dailyDataApi', startDate, endDate],
        queryFn: () => dailyDataApi(startDate, endDate),
        // disable polling by default for heavier chart queries
        refetchInterval: options.refetchInterval ?? false,
        enabled: !!startDate && !!endDate,
    })
}