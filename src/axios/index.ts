import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://budget-control-production.up.railway.app", // Replace with your actual backend URL
    timeout: 10000, // Set a timeout limit if desired
});

// Optional: Add interceptors for requests or responses
axiosInstance.interceptors.request.use(
    (config) => {
        // Example: Add an authorization token if needed
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        // Handle response errors
        console.error("API error:", error.response?.data || error.message);
        return Promise.reject(error);
    },
);

export default axiosInstance;