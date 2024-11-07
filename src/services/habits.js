import { apiClient } from "./config";

export const apiGetHabits = async () => apiClient.get("/habits")