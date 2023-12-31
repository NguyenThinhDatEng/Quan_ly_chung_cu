import axios from "axios";

// Content-Type
const ApplicationJson = "application/json";
// tạo 1 axios instances
const httpClient = axios.create({
  baseURL: "https://localhost:4001/api/",
  // timeout: 30000, // Nếu kết nối có vấn đề -> tránh treo kết nối mãi mãi
  headers: {
    "Content-Type": ApplicationJson,
  },
});

/**
 * Kiểm tra lại với mỗi request xem có token không
 */
httpClient.interceptors.request.use(
  (config) => {
    const userToken = sessionStorage.getItem("userToken");
    if (userToken) {
      config.headers["Authorization"] = `Bearer ${userToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default httpClient;
