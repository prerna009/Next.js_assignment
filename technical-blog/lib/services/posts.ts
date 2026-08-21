import axios from "axios";

const _apiUrl = "https://dummyjson.com/posts";

export async function getPosts() {
    const res = await axios.get(_apiUrl);

    if (!res) {
        throw new Error("Failed to fetch articles");
    }

    return res.data;
};

export async function getPostById(id: number) {
    if (!id) return null;

    const res = await axios.get(`${_apiUrl}/${id}`);

    if (!res) {
        throw new Error("Failed to fetch article details");
    }

    return res.data;
};
