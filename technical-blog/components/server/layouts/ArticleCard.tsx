import { Article } from "@/lib/types/article";
import { Button, Card, CardContent, Typography } from "@mui/material";
import Link from "next/link";

export default function ArticleCard({ article }: { article: Article }) {
    return (
        <Card
            sx={{
                height: "100%",
                borderRadius: 3,
                border: "1px solid #e0e0e0",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
            }}
        >
            <CardContent
                sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    p: 3,
                }}
            >
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
                    {article.title}
                </Typography>

                <Typography
                    variant="body1"
                    sx={{
                        mb: 2,
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: 5,
                        overflow: "hidden",
                    }}
                >
                    {article.body}
                </Typography>

                <Button
                    variant="contained"
                    sx={{
                        alignSelf: "flex-start",
                        mt: "auto",
                    }}
                >
                    <Link href={`/articles/${article.id}`}>
                        VIEW DETAILS
                    </Link>
                </Button>
            </CardContent>
        </Card>
    );
}