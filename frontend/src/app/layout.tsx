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
    default: "Umesh Mehta | Full Stack Developer & Tech Mentor",
    template: "%s | Umesh Mehta Portfolio",
  },
  description:
    "Full Stack Developer at Digital Pathshala, BCA student at Itahari Nauna College. Building scalable web applications, leading teams, and mentoring 150+ students in MERN stack. Experience with international clients and major projects including USA CRM, Hamrotask Australia, SaaS POS, UpayaX, and Share Bazar Insights.",
  keywords: [
    "Umesh Mehta",
    "full stack developer",
    "MERN stack",
    "web developer",
    "React developer",
    "Next.js developer",
    "project manager",
    "tech mentor",
    "BCA student",
    "Digital Pathshala",
    "Code for Change",
    "portfolio",
    "software engineer",
  ],
  authors: [{ name: "Umesh Mehta" }],
  creator: "Umesh Mehta",
  publisher: "Umesh Mehta",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Umesh Mehta Portfolio",
    title: "Umesh Mehta | Full Stack Developer & Tech Mentor",
    description:
      "Full Stack Developer, Project Manager, and Tech Mentor. Building scalable applications, leading teams, and mentoring 150+ students in MERN stack development.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Umesh Mehta Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Umesh Mehta | Full Stack Developer & Tech Mentor",
    description:
      "Full Stack Developer, Project Manager, and Tech Mentor. Building scalable applications and mentoring 150+ students.",
    images: ["/og-image.jpg"],
    creator: "@hello__umesh",
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
              name: "Umesh Mehta",
              jobTitle: "Full Stack Developer",
              worksFor: {
                "@type": "Organization",
                name: "Digital Pathshala"
              },
              alumniOf: {
                "@type": "EducationalOrganization",
                name: "Itahari Nauna College"
              },
              url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
              sameAs: [
                "https://www.linkedin.com/in/umeshmehta1245/",
                "https://www.tiktok.com/@hello__umesh",
                "https://www.facebook.com/umesh.mehta.980967",
                "https://github.com/UmeshMehta1",
              ],
              knowsAbout: [
                "MERN Stack",
                "JavaScript",
                "TypeScript",
                "React",
                "Next.js",
                "Node.js",
                "MongoDB",
                "Full Stack Development",
                "Project Management",
                "Team Leadership",
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
