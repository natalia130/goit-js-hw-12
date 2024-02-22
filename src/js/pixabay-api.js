import axios from "axios";

export async function fetchImages(userQuery, currentPage) {
    const API_KEY = "42441384-ae09b834f94a4016fb8b80a97";
    const BASE_URL = "https://pixabay.com";
    const END_POINT = "/api/";
    const url = BASE_URL + END_POINT;
    
    const params = {
        key: API_KEY,
        q: userQuery,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: true,
        per_page: 15,
        page: currentPage,
    };

    const res = await axios.get(url, { params });
    return res.data;
}