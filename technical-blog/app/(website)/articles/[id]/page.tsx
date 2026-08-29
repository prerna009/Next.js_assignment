import { getArticleById, getArticles } from "@/lib/services/articles";
import { getUser } from "@/lib/services/users";
import { Article } from "@/lib/types/article";
import { User } from "@/lib/types/user";
import { Box, Chip, Container, Paper, Typography } from "@mui/material";
import Image from "next/image";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";

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

        keywords: article.tag,

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
        },

        twitter: {
            card: "summary_large_image",
            title,
            description,
        },
    };
}

async function getRelatedArticles(currentArticle: Article, limit: number = 3) {
    try {
        if (!currentArticle.tags || currentArticle.tags.length === 0) {
            return [];
        }

        const firstTag = currentArticle.tags[0];
        const res = await getArticles(1, 50, "", firstTag);
        
        return (res?.posts || [])
            .filter((article: Article) => article.id !== currentArticle.id)
            .slice(0, limit);
    } catch {
        return [];
    }
}

export default async function ArticlePage({ params }: Props) {
    const { id } = await params;

    const article: Article = await getArticleById(Number(id));

    if (!article) {
        notFound();
    }

    const author: User = await getUser(Number(article.userId));
    const relatedArticles = await getRelatedArticles(article, 3);

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

                        {/* Related Articles */}
                        {relatedArticles && relatedArticles.length > 0 && (
                            <Box component="section" aria-labelledby="related-articles-heading" sx={{ mt: 6, pt: 4, borderTop: "1px solid #e0e0e0" }}>
                                <Typography
                                    id="related-articles-heading"
                                    variant="h6"
                                    sx={{ fontWeight: 600, mb: 3 }}
                                >
                                    Related Articles
                                </Typography>

                                <Box sx={{ display: "grid", gap: 2 }}>
                                    {relatedArticles.map((relatedArticle: Article) => (
                                        <Link
                                            key={relatedArticle.id}
                                            href={`/articles/${relatedArticle.id}`}
                                            style={{ textDecoration: "none" }}
                                        >
                                            <Paper
                                                sx={{
                                                    p: 2,
                                                    cursor: "pointer",
                                                    transition: "all 0.3s ease",
                                                    "&:hover": {
                                                        boxShadow: 2,
                                                        transform: "translateY(-2px)",
                                                    },
                                                }}
                                            >
                                                <Typography variant="body1" sx={{ fontWeight: 500, mb: 1 }}>
                                                    {relatedArticle.title}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    {relatedArticle.body.substring(0, 100)}...
                                                </Typography>
                                            </Paper>
                                        </Link>
                                    ))}
                                </Box>
                            </Box>
                        )}
                    </Paper>
                </article>
            </Container>
        </main>
    );
}