import { getTagList } from "@/lib/services/tags";
import { Box, Chip, Container, Link, Paper, Typography } from "@mui/material";

export const metadata = {
    title: "Tags",
    description: "Browse articles by tag.",
    alternates: {
        canonical: "/tags",
    },
};

export default async function TagsPage() {
    const tags = await getTagList();

    return (
        <main>
            <Container maxWidth="lg" sx={{ py: 2 }}>
                <header>
                    <Typography
                        variant="h4"
                        sx={{ fontWeight: 600, mb: 1 }}
                    >
                        All Tags
                    </Typography>
                </header>

                <section aria-labelledby="tags-heading">
                    <Typography
                        id="tags-heading"
                        variant="h6"
                        sx={{ mb: 2 }}
                    >
                        Topics
                    </Typography>

                    <Paper sx={{ p: 3 }}>
                        <Box
                            sx={{
                                display: "flex",
                                gap: 1,
                                flexWrap: "wrap",
                            }}
                        >
                            {tags.map((tag: string) => (
                                <Link
                                    key={tag}
                                    href={`/tags/${encodeURIComponent(tag)}`}
                                    style={{
                                        textDecoration: "none",
                                    }}
                                >
                                    <Chip
                                        label={tag}
                                        clickable
                                        variant="outlined"
                                    />
                                </Link>
                            ))}
                        </Box>
                    </Paper>
                </section>
            </Container>
        </main>
    )
}