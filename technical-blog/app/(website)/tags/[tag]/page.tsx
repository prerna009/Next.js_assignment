import ArticleList from "@/components/ArticleList";
import Pagination from "@/components/Pagination";
import { getArticlesByTag } from "@/lib/services/tags";
import { Container, Typography } from "@mui/material";
import { notFound } from "next/navigation";

interface Props {
    params: Promise<{
        tag: string;
    }>;
    searchParams: Promise<{
        page?: string;
    }>;
}

export async function generateMetadata({
    params,
}: Props) {
    const { tag } = await params;

    const tagName = decodeURIComponent(tag);

    return {
        title: `${tagName} Articles`,
        description: `Browse articles related to ${tagName}.`,
    };
}

export default async function TagPage({
    params,
    searchParams,
}: Props) {
    const { tag } = await params;
    const paramsData = await searchParams;

    const page = Math.max(
        1,
        Number(paramsData.page || 1)
    );

    const tagName = decodeURIComponent(tag);

    const limit = 9;

    const data = await getArticlesByTag(page, limit, tagName);

    if (!data || !data.posts?.length) {
        notFound();
    }

    return (
        <main>
            <Container maxWidth="lg" sx={{ py: 4 }}>
                <header>
                    <Typography
                        variant="h4"
                        sx={{
                            fontWeight: 700,
                            mb: 1,
                        }}
                    >
                        {tagName} Articles
                    </Typography>

                    <Typography
                        color="text.secondary"
                        sx={{ mb: 4 }}
                    >
                        Articles related to the "{tagName}" tag.
                    </Typography>
                </header>

                <section aria-label={`${tagName} articles`}>
                    <ArticleList
                        articles={data.posts}
                    />
                </section>

                <nav aria-label={`${tagName} articles Pagination`}>
                    <Pagination
                        total={data.total}
                        limit={limit}
                    />
                </nav>
            </Container>
        </main>
    )
}