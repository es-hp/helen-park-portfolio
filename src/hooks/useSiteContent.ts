import { useQuery } from '@tanstack/react-query';

import { getSiteContent } from '@/api/site-content';

export function useSiteContent(key: string) {
  return useQuery({
    queryKey: ['site-content'],
    queryFn: getSiteContent,
    select: (content) => content[key],
  });
}
