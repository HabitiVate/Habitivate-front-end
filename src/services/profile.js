import { apiClient } from "./config";

export const apiGetProfile = async () => {
  return await apiClient.get("/user/profile");
};

// export const apiUpdateProfile = async (payload, profileId) =>
//   apiClient.patch(`/user/me/${profileId}`, payload);


export const apiUpdateProfile = async (profileId, formData) => {
  return apiClient.patch(`/user/me/${profileId}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data', // Important for file upload
    },
  });
};

