import { getPostById } from "@/lib/services/posts";
import { getAuthor } from "@/lib/services/users";
import { Article } from "@/lib/types/article";
import { User } from "@/lib/types/user";
import {
    Box,
    Card,
    Chip,
    Divider,
    Typography,
} from "@mui/material";

export default async function ArticleDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    const article: Article = await getPostById(Number(id));
    const author: User = await getAuthor(Number(article.userId));

    const stats = [
        ["Views", article.views],
        ["Likes", article.reactions?.likes],
        ["Dislikes", article.reactions?.dislikes],
    ];

    return (
        <Box
            component="main"
            sx={{
                maxWidth: 1200,
                mx: "auto",
                p: { xs: 2, sm: 3, md: 4 },
            }}
        >
            {/* Article */}
            <Box component="article">
                <Typography
                    component="h1"
                    variant="h5"
                    sx={{
                        fontWeight: 600,
                        mb: 2,
                    }}
                >
                    Article Details
                </Typography>

                <Card
                    sx={{
                        p: 3,
                        borderRadius: 3,
                        border: "1px solid #e0e0e0",
                        boxShadow: "0 4px 16px rgba(0, 0, 0, 0.06)",
                    }}
                >
                    {/* Title */}
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                        {article.title}
                    </Typography>

                    {/* Description */}
                    <Typography color="text.secondary" sx={{ lineHeight: 1.7, mb: 3 }}>
                        {article.body}
                    </Typography>

                    {/* Tags */}
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                        Tags:
                    </Typography>

                    <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 3 }}>
                        {article.tags?.map((tag) => (
                            <Chip key={tag} label={tag} size="small" />
                        ))}
                    </Box>

                    {/* Stats */}
                    <Box
                        sx={{
                            display: "flex",
                            gap: 2,
                            flexWrap: "wrap",
                        }}
                    >
                        {stats.map(([label, value]) => (
                            <Box
                                key={label}
                                sx={{
                                    px: 3,
                                    py: 1.5,
                                    minWidth: 100,
                                    borderRadius: 2,
                                    bgcolor: "#f5f5f5",
                                }}
                            >
                                <Typography variant="caption" color="text.secondary">
                                    {label}
                                </Typography>

                                <Typography sx={{ fontWeight: 600 }}>
                                    {value}
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                </Card>
            </Box>


            <Divider sx={{ mb: 3 }} />

            <Typography
                variant="h5"
                sx={{
                    fontWeight: 600,
                    mb: 3,
                }}
            >
                Author Information
            </Typography>

            <Card
                sx={{
                    p: 3,
                    borderRadius: 3,
                    border: "1px solid #e0e0e0",
                    boxShadow: "0 4px 16px rgba(0, 0, 0, 0.06)",
                }}
            >
                {/* Name */}
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                    Name: {author.firstName}{" "}{author.lastName}
                </Typography>

                {/* Email */}
                <Typography color="text.secondary" sx={{ lineHeight: 1.7, mb: 3 }}>
                    Email ID: {author.email}
                </Typography>

                {/* Company */}
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                    Company Name: {author.company.name}
                </Typography>

                {/* Profile Image */}
                <img src={author.image} alt="image" aria-label="author-image" width={200} height={200} style={{ borderRadius: "50%", border: "1px solid #aaa8a8" }} />
            </Card>
        </Box>
    );
}