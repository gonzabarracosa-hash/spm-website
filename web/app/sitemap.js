import { SITE_URL } from '../lib/site';

export default function sitemap() {
  const now = new Date();
  return [
    {
      url: SITE_URL + '/',
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: SITE_URL + '/work/docvault-case-study',
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];
}
