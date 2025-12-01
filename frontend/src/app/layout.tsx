import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { Analytics } from "@/components/Analytics";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Your Name | Full Stack Developer & Creative Problem Solver",
    template: "%s | Your Name Portfolio",
  },
  description:
    "Portfolio of a full stack developer specializing in modern web technologies. Explore my projects, skills, and experience in building scalable applications with React, Next.js, Node.js, and more.",
  keywords: [
    "full stack developer",
    "web developer",
    "React developer",
    "Next.js developer",
    "TypeScript",
    "Node.js",
    "portfolio",
    "software engineer",
    "frontend developer",
    "backend developer",
  ],
  authors: [{ name: "Your Name" }],
  creator: "Your Name",
  publisher: "Your Name",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Your Name Portfolio",
    title: "Your Name | Full Stack Developer",
    description:
      "Portfolio of a full stack developer specializing in modern web technologies.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Your Name Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Your Name | Full Stack Developer",
    description:
      "Portfolio of a full stack developer specializing in modern web technologies.",
    images: ["/og-image.jpg"],
    creator: "@yourusername",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#3b82f6" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Your Name",
              jobTitle: "Full Stack Developer",
              url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
              sameAs: [
                "https://github.com/yourusername",
                "https://linkedin.com/in/yourusername",
                "https://twitter.com/yourusername",
              ],
              knowsAbout: [
                "JavaScript",
                "TypeScript",
                "React",
                "Next.js",
                "Node.js",
                "Full Stack Development",
              ],
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <Providers>
          {children}
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
