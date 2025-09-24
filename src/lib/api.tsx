import axios from "axios";

export const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("redseamToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
