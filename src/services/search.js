import { apiClient } from "./config";



export const apiSearch = async (query) =>
    apiClient.get(`/search`, { params: { query } });

