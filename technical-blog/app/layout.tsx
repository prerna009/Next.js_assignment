import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),

  title: {
    default: "TechBlog",
    template: "%s | TechBlog",
  },

  description: "A technical blog built with Next.js.",

  keywords: [
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
    description: "A technical blog built with Next.js.",
    siteName: "TechBlog",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "TechBlog",
    description: "A technical blog built with Next.js.",
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
      <body>{children}</body>
    </html>
  );
}
