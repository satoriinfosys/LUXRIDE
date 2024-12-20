import axios from "axios";

// export const BASE_URL = "http://localhost:8000/api"; // Replace this with your API base URL
export const BASE_URL = "https://parash-limo-backend.onrender.com/api";

const apiService = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

apiService.interceptors.request.use(
  (config) => {
    // You can modify config before sending the request
    // e.g., add authorization token
    // config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiService.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiService;
