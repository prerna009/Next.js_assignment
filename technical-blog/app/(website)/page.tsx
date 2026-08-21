import SearchInput from "@/components/client/SearchInput";
import ArticleCard from "@/components/server/layouts/ArticleCard";
import { getPosts } from "@/lib/services/posts"
import { Article } from "@/lib/types/article";
import { Box, Typography } from "@mui/material";

export default async function HomePage() {
    const articles = await getPosts();

    const articleList: Article[] = Array.isArray(articles?.posts)
        ? [...articles.posts]
            .sort((a, b) => b.id - a.id)
            .slice(0, 6)
        : [];

    return (
        <Box>
            <Typography variant="h5" sx={{ fontWeight: 600, m: 2 }}>
                Latest Articles
            </Typography>

            <Box>
                <SearchInput />
            </Box>

            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: {
                        xs: "1fr",
                        sm: "repeat(2, 1fr)",
                        md: "repeat(3, 1fr)",
                    },
                    gap: 3,
                    p: 3,
                }}
            >
                {articleList?.map((article) => (
                    <ArticleCard
                        key={article.id}
                        article={article}
                    />
                ))}
            </Box>
        </Box>
    );
}