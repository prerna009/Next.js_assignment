import axios from "axios";

const _apiUrl = "https://dummyjson.com/posts";

export async function getTagList() {
    const res = await axios.get(`${_apiUrl}/tag-list`);

    return res.data;
};

export async function getArticlesByTag(page: number, limit: number, tag: string) {
    if (!tag) return null;

    const skip = (page - 1) * limit;

    const res = await axios.get(
        `${_apiUrl}/tag/${encodeURIComponent(tag)}`,
        {
            params: {
                limit,
                skip,
            },
        }
    );

    return res.data;
};
