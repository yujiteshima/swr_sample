import useSWR from 'swr';
import { useCallback, useState } from 'react';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export function useNonCachedRequest(url: string) {
  const [cacheBypassCounter, setCacheBypassCounter] = useState(0);
  
  const { data, error, isLoading } = useSWR(
    url && cacheBypassCounter > 0 ? [url, cacheBypassCounter] : null,
    ([url]) => fetcher(url)
  );

  const refetch = useCallback(() => {
    setCacheBypassCounter(prev => prev + 1);
  }, []);

  return { 
    data, 
    error, 
    isLoading, 
    refetch,
    requestCount: cacheBypassCounter
  };
}