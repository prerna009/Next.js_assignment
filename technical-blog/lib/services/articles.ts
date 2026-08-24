import axios from "axios";

const _apiUrl = "https://dummyjson.com/posts";

export async function getArticles(page: number, limit: number, search: string = "", tag: string = "") {
    const skip = (page - 1) * limit;

    let url = _apiUrl;

    if (search) {
        url = `${_apiUrl}/search?q=${encodeURIComponent(search)}`;
    } else if (tag) {
        url = `${_apiUrl}/tag/${encodeURIComponent(tag)}`;
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
    if (!id) return null;

    const res = await axios.get(`${_apiUrl}/${id}`);

    return res.data;
};

export async function searchArticles(query: string) {
    if (!query) return null;

    const res = await axios.get(`${_apiUrl}/search`, {
        params: {
            q: query,
        },
    });

    return res.data;
};