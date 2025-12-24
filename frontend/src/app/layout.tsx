import type { Metadata } from "next";
import { Space_Grotesk, Inter, Bebas_Neue } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { Analytics } from "@/components/Analytics";

// Display font for hero and major headings - Bold, modern, attention-grabbing
const bebasNeue = Bebas_Neue({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

// Heading font - Modern, geometric, unique
const spaceGrotesk = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

// Body font - Clean, professional, highly readable
const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Umesh Mehta | Full Stack Developer & Tech Mentor",
    template: "%s | Umesh Mehta Portfolio",
  },
  description:
    "Full Stack Developer at Digital Pathshala, BCA student at Itahari Nauna College. Building scalable web applications, leading teams, and mentoring 150+ students in MERN stack. Experience with international clients and major projects including Tax & Beyond (USA CRM), Hamrotask Australia, SaaS POS, UpayaX, and Share Bazar Insights.",
  keywords: [
    "Umesh Mehta",
    "full stack developer",
    "MERN stack",
    "web developer",
    "React developer",
    "Next.js developer",
    "Node.js developer",
    "TypeScript developer",
    "PostgreSQL developer",
    "project manager",
    "tech mentor",
    "BCA student",
    "Digital Pathshala",
    "Code for Change",
    "portfolio",
    "software engineer",
    "web development services",
    "full stack development",
    "React.js tutorials",
    "Next.js tutorials",
    "Node.js tutorials",
    "MongoDB developer",
    "Express.js developer",
    "JavaScript expert",
    "TypeScript expert",
    "web application development",
    "API development",
    "database design",
    "software architecture",
    "team leadership",
    "tech mentorship",
    "coding tutorials",
    "programming blog",
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
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const theme = localStorage.getItem('theme') || 'system';
                  let isDark = false;
                  if (theme === 'dark') {
                    isDark = true;
                  } else if (theme === 'light') {
                    isDark = false;
                  } else {
                    isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  }
                  if (isDark) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#10b981" />
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
        className={`${bebasNeue.variable} ${spaceGrotesk.variable} ${inter.variable} antialiased`}
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
