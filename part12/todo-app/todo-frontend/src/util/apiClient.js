import axios from "axios";

const apiClient = axios.create({
  // baseURL: process.env.REACT_APP_BACKEND_URL,
  baseURL: "http://localhost:3000/",
});

export default apiClient;
