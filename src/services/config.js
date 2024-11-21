import axios from "axios";



const baseURL = import.meta.env.VITE_BASE_URL;

const token = localStorage.getItem("token") 

export const logout = () => {
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
}


if (token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export const apiClient = axios.create({
  baseURL: baseURL,
});
