import {
    Box,
    Container,
    Typography,
} from "@mui/material";

import ArticleList from "@/components/ArticleList";
import { getArticles } from "@/lib/services/articles";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",

  description: "Welcome to TechBlog, a technical blog about modern web development.",

  keywords: [
    "TechBlog",
    "Next.js",
    "React",
    "JavaScript",
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
    description: "Welcome to TechBlog.",
    url: "/",
    siteName: "TechBlog",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "TechBlog",
    description: "Welcome to TechBlog.",
  },
};

export default async function HomePage() {
    const data = await getArticles(1, 6);

    return (
        <main>
            <Container>
                <Box
                    component="section"
                    aria-labelledby="latest-articles"
                    sx={{ mb: 6 }}
                >
                    <Typography
                        id="latest-articles"
                        variant="h4"
                        sx={{ fontWeight: 700, mb: 3 }}
                    >
                        Latest Articles
                    </Typography>

                    <ArticleList articles={data.posts} />
                </Box>
            </Container>
        </main>
    );
}