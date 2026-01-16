// src/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api", // your Laravel API URL
  withCredentials: true, // if using sanctum for auth
});

export default api;
