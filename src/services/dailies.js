import { apiClient } from "./config";

export const apiGetDailies = async () => apiClient.get("/users/me/dailies");


export const apiPostDaily = async (payload) =>
    apiClient.post("/daily", payload);

export const apiDeleteDaily = async (dailyId) =>
    apiClient.delete(`/daily/${dailyId}`);

export const apiUpdateDaily = async (dailyId, payload) =>
    apiClient.patch(`/daily/${dailyId}`, payload);

export const apiGetSingleDaily= async (dailyId) => apiClient.get(`/daily/${dailyId}`);