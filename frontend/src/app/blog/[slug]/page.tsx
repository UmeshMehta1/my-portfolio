import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogPostDetail from "@/components/BlogPostDetail";
import { apiUrl } from "@/lib/api";

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
    const res = await fetch(`${apiUrl}/api/blog/${slug}`, {
      next: { revalidate: 3600 }, // Revalidate every hour
    });

    if (!res.ok) {
      return null;
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await getBlogPost(params.slug);

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
  params: { slug: string };
}) {
  const post = await getBlogPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen pt-20">
      <BlogPostDetail post={post} />
    </main>
  );
}

