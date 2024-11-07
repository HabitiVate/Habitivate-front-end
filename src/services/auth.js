
import { apiClient } from "./config";

export const apiSignup = async (payload) => {
    return await apiClient.post("/user/register", payload);
  };


  export const apiSignin = async (payload) => {
    return await apiClient.post("/user/login", payload);
  };