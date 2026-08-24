import axios from "axios";

const _apiUrl = "https://dummyjson.com/users";

export async function getUser(id: number) {
    if (!id) return null;
    
    const res = await axios.get(`${_apiUrl}/${id}`);

    return res.data;
};