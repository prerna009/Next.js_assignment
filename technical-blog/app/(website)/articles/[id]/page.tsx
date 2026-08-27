import { getArticleById } from "@/lib/services/articles";
import { getUser } from "@/lib/services/users";
import { Article } from "@/lib/types/article";
import { User } from "@/lib/types/user";
import { Box, Chip, Container, Paper, Typography } from "@mui/material";

import Image from "next/image";
import { Metadata } from "next";
import { notFound } from "next/navigation";

interface Props {
    params: Promise<{ id: string }>;
}

export async function generateMetadata({
    params,
}: Props): Promise<Metadata> {
    const { id } = await params;

    const article = await getArticleById(Number(id));

    const siteUrl = process.env.SITE_URL || "http://localhost:3000";

    if (!article) {
        return {
            title: "Article Not Found",
            description: "The requested article was not found.",
        };
    }

    const title = article.title || "TechBlog Article";
    const description = article.body.slice(0, 160) || "Read this article on TechBlog.";
    const canonicalUrl = `${siteUrl}/articles/${id}`;

    return {
        title,
        description,

        keywords: [
            "TechBlog",
            "Technology",
            "Programming",
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
            canonical: canonicalUrl,
        },

        openGraph: {
            title,
            description,
            url: canonicalUrl,
            siteName: "TechBlog",
            type: "article",
            images: [
                {
                    url: `${siteUrl}/articles/${id}/opengraph-image`,
                    width: 1200,
                    height: 630,
                    alt: title,
                },
            ],
        },

        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [
                `${siteUrl}/articles/${id}/twitter-image`,
            ],
        },
    };
}

export default async function ArticlePage({ params }: Props) {
    const { id } = await params;

    const article: Article = await getArticleById(Number(id));

    if (!article) {
        notFound();
    }

    const author: User = await getUser(Number(article.userId));

    const stats = [
        ["Views", article.views],
        ["Likes", article.reactions?.likes ?? 0],
        ["Dislikes", article.reactions?.dislikes ?? 0],
    ];

    return (
        <main>
            <Container maxWidth="md" sx={{ py: 4 }}>
                <article>
                    <Paper sx={{ p: 4 }}>
                        <section>
                            <Typography variant="h5" sx={{ fontWeight: 600 }} gutterBottom>{article.title}</Typography>
                            <Typography color="text.secondary" sx={{ mb: 3 }}>{article.body}</Typography>
                        </section>

                        <section aria-labelledby="tags-heading">
                            <Typography id="tags-heading" variant="h6" sx={{ mb: 1 }}>
                                Tags
                            </Typography>

                            <Box sx={{ mb: 3 }}>
                                {article.tags.map((tag: string) => (
                                    <Chip
                                        key={tag}
                                        label={tag}
                                        size="small"
                                        sx={{ mr: 1 }}
                                    />
                                ))}
                            </Box>
                        </section>

                        <section aria-labelledby="stats-heading">
                            <Typography
                                id="stats-heading"
                                variant="h6"
                                sx={{ mb: 1 }}
                            >
                                Statistics
                            </Typography>

                            <Box
                                sx={{
                                    display: "flex",
                                    gap: 2,
                                    mb: 4,
                                }}
                            >
                                {stats.map(([label, value]) => (
                                    <Box
                                        key={label}
                                        sx={{
                                            p: 2,
                                            width: 120,
                                            borderRadius: 2,
                                            bgcolor: "#f5f5f5",
                                        }}
                                    >
                                        <Typography variant="body2" color="text.secondary">
                                            {label}
                                        </Typography>

                                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                            {value}
                                        </Typography>
                                    </Box>
                                ))}
                            </Box>
                        </section>

                        {/* Author */}
                        {author && (
                            <section aria-labelledby="author-heading">
                                <Typography
                                    id="author-heading"
                                    variant="h6"
                                    sx={{ fontWeight: 600, mb: 2 }}
                                >
                                    Author
                                </Typography>

                                <Box
                                    component="section"
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 2,
                                        padding: 2,
                                        border: "1px solid #ddd",
                                        borderRadius: 2,
                                    }}
                                >
                                    <Image
                                        src={author.image}
                                        alt={`${author.firstName} ${author.lastName}`}
                                        width={60}
                                        height={60}
                                        style={{
                                            borderRadius: "50%",
                                        }}
                                    />

                                    <Box>
                                        <Typography sx={{ fontWeight: 600 }}>
                                            {author.firstName}{" "}{author.lastName}
                                        </Typography>

                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                        >
                                            {author.email}
                                        </Typography>

                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                        >
                                            {author.company?.name}
                                        </Typography>
                                    </Box>
                                </Box>
                            </section>
                        )}
                    </Paper>
                </article>
            </Container>
        </main>
    );
}