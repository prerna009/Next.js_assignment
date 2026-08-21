import axios from "axios";

const _apiUrl = "https://dummyjson.com/posts";

export async function getTagList() {
    const res = await axios.get(`${_apiUrl}/tag-list`);

    if (!res) {
        throw new Error("Failed to fetch tag list");
    }

    return res.data;
};

export async function getArticlesByTag(tag: string) {
    const res = await axios.get(`${_apiUrl}/tag/${tag}`);

    if (!res) {
        throw new Error("Failed to fetch articles by tag");
    }

    return res.data;
};
