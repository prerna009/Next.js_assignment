import { Article } from "@/lib/types/article";
import { notFound } from "next/navigation";
import { Card, CardContent, Typography } from "@mui/material";
import Link from "next/link";

interface Props {
    articles: Article[];
}

export default function ArticleList({ articles }: Props) {
    if (articles.length === 0) {
        notFound();
    }

    return (
        <div>
            {articles.map((article) => (
                <section key={article.id} style={{ paddingBottom: "30px" }}>
                    <Card
                        sx={{
                            borderRadius: 3,
                            border: "1px solid #e0e0e0",
                            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
                        }}
                    >
                        <CardContent sx={{ p: 3 }}>
                            <Typography
                                variant="h6"
                                sx={{
                                    fontWeight: 600,
                                    mb: 2,
                                    display: "-webkit-box",
                                    WebkitBoxOrient: "vertical",
                                    WebkitLineClamp: 2,
                                    overflow: "hidden",
                                }}
                            >
                                <Link href={`/articles/${article.id}`}>
                                    {article.title}
                                </Link>
                            </Typography>

                            <Typography
                                variant="body1"
                                sx={{
                                    display: "-webkit-box",
                                    WebkitBoxOrient: "vertical",
                                    WebkitLineClamp: 5,
                                    overflow: "hidden",
                                }}
                            >
                                {article.body}
                            </Typography>
                        </CardContent>
                    </Card>
                </section>
            ))}
        </div>
    );
}