import axios from "axios";

// Content-Type
const ApplicationJson = "application/json";
// tạo 1 axios instances
const httpClient = axios.create({
  baseURL: "https://localhost:44364/api/v1/",
  timeout: 5000, // Nếu kết nối có vấn đề -> tránh treo kết nối mãi mãi
  headers: {
    "Content-Type": ApplicationJson,
  },
  withCredentials: false,
});

export default httpClient;
