import axios from "axios"

const BASE_URL = "http://localhost:8000";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 90000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const privateAxiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 90000,
    headers: {
        "Content-Type": "application/json",
    },

})
export default axiosInstance

