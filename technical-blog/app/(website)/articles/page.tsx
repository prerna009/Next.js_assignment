import {
   Container,
   Typography,
} from "@mui/material";
import { getArticles } from "@/lib/services/articles";
import ArticleList from "@/components/ArticleList";
import Pagination from "@/components/Pagination";
import { getTagList } from "@/lib/services/tags";
import ArticleFilters from "@/components/ArticleFilters";

interface Props {
   searchParams: Promise<{
      page?: string;
      search?: string;
      tag?: string;
   }>;
}

export const metadata = {
   title: "Articles",
   description: "Browse all technical articles on TechBlog.",
   alternates: {
      canonical: "/articles",
   },
};

export default async function ArticlesPage({
   searchParams,
}: Props) {
   const params = await searchParams;

   const parsedPage = Number(params.page);

   const page =
      Number.isFinite(parsedPage) && parsedPage > 0
         ? Math.floor(parsedPage)
         : 1;

   const search = params.search || "";
   const tag = params.tag || "";

   const limit = 9;

   const data = await getArticles(page, limit, search, tag);

   const tags = await getTagList();

   return (
      <main>
         <Container maxWidth="lg" sx={{ py: 4 }}>
            <header>
               <Typography
                  variant="h4"
                  component="h1"
                  sx={{ fontWeight: 700, mb: 3 }}
               >
                  All Articles
               </Typography>
            </header>

            {/* Search + Tag Filters */}
            <ArticleFilters
               initialSearch={search}
               initialTag={tag}
               tags={tags}
            />

            <section aria-label="Article List">
               <ArticleList articles={data.posts} />
            </section>

            <nav aria-label="Article Pagination">
               <Pagination
                  total={data.total}
                  limit={limit}
               />
            </nav>
         </Container>
      </main>
   );
}