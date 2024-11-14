import { apiClient } from "./config";

export const apiGetProfile = async () => {
  return await apiClient.get("/user/profile");
};

export const apiUpdateProfile = async (payload) =>
  apiClient.patch(`/user/me`, payload);
