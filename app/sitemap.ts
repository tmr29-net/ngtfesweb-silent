import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://ngt-fes.vercel.app'

  // Static routes based on the current app structure
  const staticRoutes = [
    {
      url: '',
      priority: 1.0,
      changeFrequency: 'daily' as const,
    },
    {
      url: '/booth',
      priority: 0.9,
      changeFrequency: 'daily' as const,
    },
    {
      url: '/display',
      priority: 0.9,
      changeFrequency: 'daily' as const,
    },
    {
      url: '/stage',
      priority: 0.9,
      changeFrequency: 'daily' as const,
    },
    {
      url: '/access',
      priority: 0.8,
      changeFrequency: 'monthly' as const,
    },
    {
      url: '/quiz',
      priority: 0.7,
      changeFrequency: 'weekly' as const,
    },
  ]

  return staticRoutes.map((route) => ({
    url: `${baseUrl}${route.url}`,
    lastModified: new Date(), // または route.lastModified
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}