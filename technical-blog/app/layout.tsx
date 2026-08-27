import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = process.env.SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "TechBlog",
    template: "%s | TechBlog",
  },

  description: "TechBlog is a technology blog covering Next.js, React, Angular, JavaScript and modern web development.",

  keywords: [
    "TechBlog",
    "Next.js",
    "React",
    "JavaScript",
    "TypeScript",
    "Web Development",
  ],

  authors: [
    {
      name: "TechBlog",
    },
  ],

  publisher: "TechBlog",

  category: "Technology",

  robots: {
    index: true,
    follow: true,
  },

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: "TechBlog",
    description: "TechBlog is a technology blog covering Next.js, React, Angular, JavaScript and modern web development.",
    url: siteUrl,
    siteName: "TechBlog",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "TechBlog",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "TechBlog",
    description: "TechBlog is a technology blog covering Next.js, React, Angular, JavaScript and modern web development.",
    images: ["/twitter-image"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={geist.variable}
    >
      <body>
        <AppRouterCacheProvider>
          {children}
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
