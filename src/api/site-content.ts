import { type SiteContent } from '@/types';

export async function getSiteContent(): Promise<SiteContent> {
  const response = await fetch('/content/site-content.json');

  if (!response.ok) {
    throw new Error('Failed to fetch content');
  }
  return (await response.json()) as SiteContent;
}
