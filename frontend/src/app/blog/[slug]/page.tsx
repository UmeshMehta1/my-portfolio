import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogPostDetail from "@/components/BlogPostDetail";
import { apiUrl } from "@/lib/api";

// Force dynamic rendering for blog posts (since they come from database)
export const dynamic = 'force-dynamic';
export const revalidate = 0; // Always fetch fresh data

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  author: string;
  category: string;
  tags: string[];
  imageUrl?: string;
  readTime: number;
  publishedAt: string;
  views: number;
}

async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    // Clean and normalize the slug - remove any leading/trailing slashes or spaces
    const cleanSlug = slug.trim().replace(/^\/+|\/+$/g, '');
    
    // Build the URL - ensure no double slashes
    const baseUrl = apiUrl.replace(/\/$/, '');
    const url = `${baseUrl}/api/blog/${cleanSlug}`;
    
    // Use cache: 'no-store' for dynamic rendering
    const res = await fetch(url, {
      cache: 'no-store', // Always fetch fresh data
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      if (res.status === 404) {
        // Try to get error details
        try {
          const errorData = await res.json();
          console.error(`Blog post not found: ${cleanSlug}`, errorData);
        } catch {
          console.error(`Blog post not found: ${cleanSlug} (404)`);
        }
      } else {
        console.error(`Failed to fetch blog post: ${res.status} ${res.statusText}`);
      }
      return null;
    }

    const data = await res.json();
    
    // Verify we got valid data
    if (!data || !data.slug) {
      console.error('Invalid blog post data received');
      return null;
    }
    
    return data;
  } catch (error) {
    console.error("Error fetching blog post:", error);
    if (error instanceof Error) {
      console.error("Error details:", error.message);
    }
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string };
}): Promise<Metadata> {
  // Handle both Promise and direct params (Next.js 13+ compatibility)
  const resolvedParams = params instanceof Promise ? await params : params;
  const slug = resolvedParams.slug;
  
  const post = await getBlogPost(slug);

  if (!post) {
    return {
      title: "Blog Post Not Found | Umesh Mehta",
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const postUrl = `${siteUrl}/blog/${post.slug}`;

  return {
    title: `${post.title} | Umesh Mehta - Full Stack Developer Blog`,
    description: post.excerpt,
    keywords: [
      ...post.tags,
      "web development",
      "MERN stack",
      "Next.js",
      "React",
      "Node.js",
      "TypeScript",
      "PostgreSQL",
      "full stack development",
      post.category,
      "coding tutorials",
      "programming blog",
      "software engineering",
      "web development tips",
    ],
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      url: postUrl,
      publishedTime: post.publishedAt,
      modifiedTime: post.publishedAt,
      authors: [post.author],
      tags: post.tags,
      section: post.category,
      images: post.imageUrl
        ? [
            {
              url: post.imageUrl,
              width: 1200,
              height: 630,
              alt: post.title,
            },
          ]
        : [
            {
              url: `${siteUrl}/og-image.jpg`,
              width: 1200,
              height: 630,
              alt: post.title,
            },
          ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      creator: "@hello__umesh",
      images: post.imageUrl ? [post.imageUrl] : [`${siteUrl}/og-image.jpg`],
    },
    alternates: {
      canonical: postUrl,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string };
}) {
  try {
    // Handle both Promise and direct params (Next.js 15+ uses Promise)
    const resolvedParams = params instanceof Promise ? await params : params;
    const slug = resolvedParams?.slug;
    
    if (!slug || typeof slug !== 'string') {
      console.error('Invalid slug parameter:', slug);
      notFound();
    }
    
    const post = await getBlogPost(slug);

    if (!post) {
      console.error('Blog post not found for slug:', slug);
      notFound();
    }

    return <BlogPostDetail post={post} />;
  } catch (error) {
    console.error('Error in BlogPostPage:', error);
    notFound();
  }
}

