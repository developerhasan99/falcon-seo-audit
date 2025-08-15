import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://0.0.0.0:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
