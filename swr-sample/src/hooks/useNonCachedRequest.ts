import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useNonCachedRequest(url: string, trigger: number) {
  return useSWR(
    trigger > 0 ? [url, trigger] : null, 
    ([url]) => fetcher(url),
    {
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
      dedupingInterval: 0
    }
  );
}