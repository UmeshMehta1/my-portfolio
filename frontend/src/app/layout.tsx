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
    default: "Umesh Mehta | Best Developer in Nepal, Koshi Province & Itahari | Full Stack Developer",
    template: "%s | Umesh Mehta Portfolio",
  },
  description:
    "Best Developer in Nepal, Koshi Province, and Itahari. Full Stack Developer at Digital Pathshala, BCA student at Itahari Nauna College. Building scalable web applications, leading teams, and mentoring 150+ students in MERN stack. Experience with international clients and major projects including Tax & Beyond (USA CRM), Hamrotask Australia, SaaS POS, UpayaX, and Share Bazar Insights.",
  keywords: [
    "Umesh Mehta",
    "Best developer in Nepal",
    "Best developer in Koshi Province",
    "Best developer in Itahari",
    "Best Developer in Nepal Koshi Province",
    "developer in Nepal",
    "developer in Koshi Province",
    "developer in Itahari",
    "full stack developer Nepal",
    "full stack developer Itahari",
    "full stack developer Koshi Province",
    "web developer Nepal",
    "web developer Itahari",
    "MERN stack developer Nepal",
    "React developer Nepal",
    "Next.js developer Nepal",
    "Node.js developer Nepal",
    "TypeScript developer",
    "PostgreSQL developer",
    "project manager",
    "tech mentor",
    "BCA student",
    "Digital Pathshala",
    "Code for Change",
    "portfolio",
    "software engineer Nepal",
    "web development services Nepal",
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
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://umeshmehta.me"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Umesh Mehta Portfolio",
    title: "Umesh Mehta | Best Developer in Nepal, Koshi Province & Itahari | Full Stack Developer",
    description:
      "Best Developer in Nepal, Koshi Province, and Itahari. Full Stack Developer, Project Manager, and Tech Mentor. Building scalable applications, leading teams, and mentoring 150+ students in MERN stack development.",
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
    title: "Umesh Mehta | Best Developer in Nepal, Koshi Province & Itahari",
    description:
      "Best Developer in Nepal, Koshi Province, and Itahari. Full Stack Developer, Project Manager, and Tech Mentor. Building scalable applications and mentoring 150+ students.",
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
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || "X_-atMQJX-84N0W1xOw_R1X-Ui1iu74fRrRNi0LH9wA",
    yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
    yahoo: process.env.NEXT_PUBLIC_YAHOO_VERIFICATION,
  },
  icons: {
    icon: [
      { url: "/images/febicon.jpg", type: "image/jpeg" },
      { url: "/images/febicon.jpg", sizes: "32x32", type: "image/jpeg" },
      { url: "/images/febicon.jpg", sizes: "16x16", type: "image/jpeg" },
    ],
    apple: [
      { url: "/images/febicon.jpg", type: "image/jpeg" },
    ],
    shortcut: "/images/febicon.jpg",
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
        <link rel="icon" href="/images/febicon.jpg" type="image/jpeg" />
        <link rel="apple-touch-icon" href="/images/febicon.jpg" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#10b981" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Umesh Mehta" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', () => {
                  navigator.serviceWorker.register('/sw.js')
                    .then((registration) => {
                      console.log('SW registered:', registration);
                    })
                    .catch((error) => {
                      console.log('SW registration failed:', error);
                    });
                });
              }
            `,
          }}
        />
        
        {/* Preconnect to external domains for better performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://my-portfolio-72dq.onrender.com" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
        
        {/* Additional SEO meta tags */}
        <meta name="author" content="Umesh Mehta" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        <meta name="distribution" content="global" />
        <meta name="rating" content="general" />
        
        {/* Google Search Console Verification */}
        <meta name="google-site-verification" content={process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || "X_-atMQJX-84N0W1xOw_R1X-Ui1iu74fRrRNi0LH9wA"} />
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
                name: "Itahari Nauna College",
                address: {
                  "@type": "PostalAddress",
                  addressLocality: "Itahari",
                  addressRegion: "Koshi Province",
                  addressCountry: "NP"
                }
              },
              address: {
                "@type": "PostalAddress",
                addressLocality: "Itahari",
                addressRegion: "Koshi Province",
                addressCountry: "NP"
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
                "PostgreSQL",
                "Express.js",
                "Full Stack Development",
                "Project Management",
                "Team Leadership",
                "API Development",
                "Database Design",
                "Software Architecture",
              ],
              description: "Best Developer in Nepal, Koshi Province, and Itahari. Full Stack Developer with 5+ years of experience in MERN stack, leading teams, and mentoring 150+ students. Specialized in React, Next.js, Node.js, PostgreSQL, and building scalable web applications.",
              image: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/og-image.jpg`,
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Umesh Mehta Portfolio",
              url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
              description: "Portfolio of Umesh Mehta - Full Stack Developer, Project Manager, and Tech Mentor. Building scalable web applications, leading teams, and mentoring 150+ students in MERN stack development.",
              publisher: {
                "@type": "Person",
                name: "Umesh Mehta"
              },
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/blog?search={search_term_string}`
                },
                "query-input": "required name=search_term_string"
              },
              inLanguage: "en-US"
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Blog",
              name: "Umesh Mehta Blog",
              url: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/blog`,
              description: "Blog about web development, MERN stack, Next.js, React, Node.js, TypeScript, PostgreSQL, and software engineering. Learn from a Full Stack Developer with 5+ years of experience.",
              author: {
                "@type": "Person",
                name: "Umesh Mehta",
                url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
              },
              publisher: {
                "@type": "Person",
                name: "Umesh Mehta"
              },
              inLanguage: "en-US"
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Umesh Mehta - Full Stack Developer",
              url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
              description: "Full Stack Development Services - React, Next.js, Node.js, PostgreSQL, MERN Stack Development",
              founder: {
                "@type": "Person",
                name: "Umesh Mehta"
              },
              sameAs: [
                "https://www.linkedin.com/in/umeshmehta1245/",
                "https://github.com/UmeshMehta1",
              ]
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify((() => {
              const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
              const localBusiness: any = {
                "@context": "https://schema.org",
                "@type": "LocalBusiness",
                "@id": `${baseUrl}#business`,
                name: "Umesh Mehta - Best Developer in Nepal, Koshi Province & Itahari",
                description: "Best Developer in Nepal, Koshi Province, and Itahari. Professional Full Stack Development Services specializing in MERN stack, React, Next.js, Node.js, PostgreSQL, and custom web application development. Offering project management, team leadership, and tech mentorship services.",
                url: baseUrl,
                image: `${baseUrl}/og-image.jpg`,
                telephone: process.env.NEXT_PUBLIC_BUSINESS_PHONE || "+977-981-7329620",
                email: process.env.NEXT_PUBLIC_BUSINESS_EMAIL || "hello@umeshmehta.me",
                priceRange: "$$",
                address: {
                  "@type": "PostalAddress",
                  streetAddress: process.env.NEXT_PUBLIC_BUSINESS_STREET || "M7QC+7PC RCT Market",
                  addressLocality: process.env.NEXT_PUBLIC_BUSINESS_CITY || "Itahari",
                  postalCode: process.env.NEXT_PUBLIC_BUSINESS_POSTAL || "56705",
                  addressRegion: process.env.NEXT_PUBLIC_BUSINESS_STATE || "Koshi Province",
                  addressCountry: process.env.NEXT_PUBLIC_BUSINESS_COUNTRY || "NP"
                },
                areaServed: [
                  {
                    "@type": "Country",
                    name: "Nepal"
                  },
                  {
                    "@type": "State",
                    name: "Koshi Province"
                  },
                  {
                    "@type": "City",
                    name: "Itahari"
                  }
                ],
                hasOfferCatalog: {
                  "@type": "OfferCatalog",
                  name: "Web Development Services",
                  itemListElement: [
                    {
                      "@type": "Offer",
                      itemOffered: {
                        "@type": "Service",
                        name: "Full Stack Web Development",
                        description: "MERN stack development, React, Next.js, Node.js applications"
                      }
                    },
                    {
                      "@type": "Offer",
                      itemOffered: {
                        "@type": "Service",
                        name: "Project Management",
                        description: "Team leadership and project management services"
                      }
                    },
                    {
                      "@type": "Offer",
                      itemOffered: {
                        "@type": "Service",
                        name: "Tech Mentorship",
                        description: "MERN stack training and mentorship for students"
                      }
                    }
                  ]
                },
                sameAs: [
                  "https://www.linkedin.com/in/umeshmehta1245/",
                  "https://github.com/UmeshMehta1",
                  "https://www.tiktok.com/@hello__umesh",
                  "https://www.facebook.com/umesh.mehta.980967"
                ],
                openingHoursSpecification: [
                  {
                    "@type": "OpeningHoursSpecification",
                    dayOfWeek: [
                      "Monday",
                      "Tuesday",
                      "Wednesday",
                      "Thursday",
                      "Friday",
                      "Saturday",
                      "Sunday"
                    ],
                    opens: "00:00",
                    closes: "23:59"
                  }
                ]
              };
              
              // Add geo coordinates only if both lat and lng are provided
              if (process.env.NEXT_PUBLIC_BUSINESS_LAT && process.env.NEXT_PUBLIC_BUSINESS_LNG) {
                localBusiness.geo = {
                  "@type": "GeoCoordinates",
                  latitude: process.env.NEXT_PUBLIC_BUSINESS_LAT,
                  longitude: process.env.NEXT_PUBLIC_BUSINESS_LNG
                };
              }
              
              return localBusiness;
            })()),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              name: "Umesh Mehta - Full Stack Development",
              description: "Professional Full Stack Development Services - React, Next.js, Node.js, PostgreSQL, MERN Stack",
              url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
              provider: {
                "@type": "Person",
                name: "Umesh Mehta",
                jobTitle: "Full Stack Developer",
                worksFor: {
                  "@type": "Organization",
                  name: "Digital Pathshala"
                }
              },
              areaServed: [
                {
                  "@type": "Country",
                  name: "Nepal"
                },
                {
                  "@type": "State",
                  name: "Koshi Province"
                },
                {
                  "@type": "City",
                  name: "Itahari"
                }
              ],
              serviceType: [
                "Web Development",
                "Full Stack Development",
                "Project Management",
                "Tech Mentorship",
                "MERN Stack Development"
              ],
              offers: {
                "@type": "Offer",
                description: "Custom web application development, project management, and tech mentorship services"
              }
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
