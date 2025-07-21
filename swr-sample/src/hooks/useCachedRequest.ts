import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useCachedRequest(url: string, trigger: number) {
  return useSWR(trigger > 0 ? url : null, fetcher);
}