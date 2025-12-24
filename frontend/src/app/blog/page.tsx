import type { Metadata } from "next";
import BlogList from "@/components/BlogList";

export const metadata: Metadata = {
  title: "Blog | Umesh Mehta - Full Stack Developer & Tech Mentor",
  description: "Read articles about web development, MERN stack, Next.js, React, Node.js, TypeScript, PostgreSQL, project management, and tech mentorship. Learn from a Full Stack Developer with 5+ years of experience. Free coding tutorials and web development guides.",
  keywords: [
    "web development blog",
    "MERN stack tutorials",
    "Next.js blog",
    "React tutorials",
    "Node.js guides",
    "TypeScript tutorials",
    "PostgreSQL tutorials",
    "full stack development",
    "JavaScript tutorials",
    "web development tips",
    "coding tutorials",
    "tech mentorship",
    "project management",
    "software engineering",
    "programming blog",
    "React.js tutorials",
    "Next.js tutorials",
    "Node.js tutorials",
    "API development",
    "database design",
    "web application development",
  ],
  authors: [{ name: "Umesh Mehta" }],
  openGraph: {
    title: "Blog | Umesh Mehta - Full Stack Developer",
    description: "Read articles about web development, MERN stack, Next.js, React, Node.js, and software engineering. Free coding tutorials and guides.",
    type: "website",
    url: "/blog",
    siteName: "Umesh Mehta Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Umesh Mehta - Full Stack Developer",
    description: "Read articles about web development, MERN stack, and software engineering",
    creator: "@hello__umesh",
  },
  alternates: {
    canonical: "/blog",
  },
};

export default function BlogPage() {
  return (
    <main className="min-h-screen pt-20">
      <BlogList />
    </main>
  );
}

