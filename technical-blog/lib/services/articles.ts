import axios from "axios";

const _apiUrl = "https://dummyjson.com/posts";

export async function getArticles(page: number, limit: number, search: string = "", tag: string = "") {
    const skip = (page - 1) * limit;

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

export async function getArticleById(id: number) {
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