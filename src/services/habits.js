import { apiClient } from "./config";

export const apiGetHabits = async () => apiClient.get("/users/me/habits");

export const apiPostHabits = async (payload) =>
  apiClient.post("/habits", payload);

export const apiDeleteHabits = async (habitId) =>
  apiClient.delete(`/habits/${habitId}`);

export const apiUpdateHabit = async (habitId, payload) =>
    apiClient.patch(`/habits/${habitId}`, payload);

export const apiGetSingleHabit= async (habitId) => apiClient.get(`/habits/${habitId}`);
