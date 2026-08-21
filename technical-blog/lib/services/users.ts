import axios from "axios";

const _apiUrl = "https://dummyjson.com/users";

export async function getAuthor(id: number) {
    const res = await axios.get(`${_apiUrl}/${id}`);

    if (!res) {
        throw new Error("Failed to fetch author");
    }

    return res.data;
};