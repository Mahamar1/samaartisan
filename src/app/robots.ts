import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://samaartisan.vercel.app';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/wp-aguissa',
          '/wp-aguissa/*',
          '/admin',
          '/admin/*',
          '/api/*',
          '/pro/dashboard',
          '/mon-compte',
          '/_next/*',
        ],
      },
      {
        userAgent: [
          'AhrefsBot',
          'MJ12bot',
          'SemrushBot',
          'DotBot',
        ],
        disallow: '/',
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
