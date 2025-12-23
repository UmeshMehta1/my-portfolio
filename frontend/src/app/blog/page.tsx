import type { Metadata } from "next";
import BlogList from "@/components/BlogList";

export const metadata: Metadata = {
  title: "Blog | Umesh Mehta - Full Stack Developer & Tech Mentor",
  description: "Read articles about web development, MERN stack, Next.js, React, Node.js, project management, and tech mentorship. Learn from a Full Stack Developer with 5+ years of experience.",
  keywords: [
    "web development blog",
    "MERN stack tutorials",
    "Next.js blog",
    "React tutorials",
    "Node.js guides",
    "full stack development",
    "JavaScript tutorials",
    "TypeScript guides",
    "web development tips",
    "coding tutorials",
    "tech mentorship",
    "project management",
    "software engineering",
    "programming blog",
  ],
  openGraph: {
    title: "Blog | Umesh Mehta - Full Stack Developer",
    description: "Read articles about web development, MERN stack, and software engineering",
    type: "website",
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

