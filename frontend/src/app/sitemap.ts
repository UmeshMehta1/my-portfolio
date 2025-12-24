import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://umeshmehta.me';
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://my-portfolio-72dq.onrender.com';

  // Fetch blog posts for dynamic sitemap
  let blogPosts: Array<{ slug: string; updatedAt?: string }> = [];
  try {
    const response = await fetch(`${apiUrl}/api/blog?limit=100`, {
      next: { revalidate: 3600 }, // Revalidate every hour
    });
    if (response.ok) {
      const data = await response.json();
      blogPosts = data.posts || [];
    }
  } catch (error) {
    console.error('Error fetching blog posts for sitemap:', error);
  }

  // Main pages
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
  ];

  // Add blog post pages
  blogPosts.forEach((post) => {
    routes.push({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: post.updatedAt ? new Date(post.updatedAt) : new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    });
  });

  return routes;
}

