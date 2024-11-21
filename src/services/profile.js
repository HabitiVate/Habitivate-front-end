import { apiClient } from "./config";

export const apiGetProfile = async () => {
  return await apiClient.get("/user/profile");
};

export const apiUpdateProfile = async (payload, profileId) =>
  apiClient.patch(`/user/me/${profileId}`, payload);
