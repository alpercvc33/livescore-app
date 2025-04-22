"use client"

import { useState, useEffect } from "react"

export function useLiveData<T>(fetchFunction: () => Promise<T>, refreshInterval = 30000, dependencies: any[] = []) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    let isMounted = true
    let intervalId: NodeJS.Timeout

    const fetchData = async () => {
      setLoading(true)
      try {
        const result = await fetchFunction()
        if (isMounted) {
          setData(result)
          setError(null)
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err : new Error(String(err)))
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    fetchData()

    if (refreshInterval > 0) {
      intervalId = setInterval(fetchData, refreshInterval)
    }

    return () => {
      isMounted = false
      if (intervalId) {
        clearInterval(intervalId)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies)

  return { data, loading, error, refetch: fetchFunction }
}
