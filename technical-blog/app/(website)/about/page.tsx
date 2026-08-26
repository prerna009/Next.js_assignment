import {
    Container,
    Typography,
    Paper,
} from "@mui/material";

export const metadata = {
    title: "About",
    description: "Learn more about TechBlog.",
    alternates: {
        canonical: "/about",
    },
};

export default function AboutPage() {
    return (
        <main>
            <Container maxWidth="md">
                <Paper
                    component="section"
                    sx={{
                        my: 16,
                        p: 5,
                    }}
                >
                    <article>
                        <header>
                            <Typography
                                variant="h4"
                                sx={{ fontWeight: 700, mb: 2 }}
                            >
                                About TechBlog
                            </Typography>
                        </header>

                        <section>
                            <Typography
                                color="text.secondary"
                            >
                                TechBlog is a simple technical blog built
                                using Next.js, TypeScript and Material UI.
                            </Typography>

                            <Typography
                                color="text.secondary"
                            >
                                The project demonstrates App Router,
                                Server Components, SEO, performance and
                                accessibility best practices.
                            </Typography>
                        </section>
                    </article>
                </Paper>
            </Container>
        </main>
    );
}