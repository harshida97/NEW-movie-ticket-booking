// axiosInstance.js
import axios from 'axios';

export const userInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
});

userInstance.interceptors.request.use((request) => {
  const token = localStorage.getItem("token")
  request.headers.Authorization = `Bearer ${token}`
  return request;
})

export const adminInstance = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true,
});

adminInstance.interceptors.request.use((request) => {
  const token = localStorage.getItem("admin-token")
  request.headers.Authorization = `Bearer ${token}`
  return request;
})

export const ownerInstance = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true,
});

ownerInstance.interceptors.request.use((request) => {
  const token = localStorage.getItem("owner-token")
  request.headers.Authorization = `Bearer ${token}`
  return request;
})