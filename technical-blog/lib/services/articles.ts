import axios from "axios";
import { unstable_cache } from "next/cache";

const _apiUrl = "https://dummyjson.com/posts";

export async function getArticles(page?: number, limit?: number, search: string = "", tag: string = "") {
    let skip = 0;

    if (page && limit) {
        skip = (page - 1) * limit;
    }

    let url = "";

    if (search) {
        url = `${_apiUrl}/search?q=${encodeURIComponent(search)}`;
    } else if (tag) {
        url = `${_apiUrl}/tag/${encodeURIComponent(tag)}`;
    } else {
        url = _apiUrl;
    }

    const res = await axios.get(url, {
        params: {
            limit,
            skip,
        },
    });

    return res.data;
};

export async function fetchArticleById(id: number) {
    try {
        const res = await axios.get(
            `${_apiUrl}/${id}`
        );

        return res.data;
    } catch (error) {
        if (
            axios.isAxiosError(error) &&
            error.response?.status === 404
        ) {
            return null;
        }

        throw error;
    }
};

export const getArticleById = (id: number) =>
    unstable_cache(
        () => fetchArticleById(id),
        [`article-${id}`],
        {
            revalidate: 3600,
            tags: [`article-${id}`],
        }
    )();