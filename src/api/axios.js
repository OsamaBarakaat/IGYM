import axios from "axios";

//  const BASE_URL = "https://api.igymsystem.com/";
const BASE_URL = "http://localhost:8000";
//const BASE_URL = "https://gym-api-d2a5.onrender.com";

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const privateAxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
export default axiosInstance;
