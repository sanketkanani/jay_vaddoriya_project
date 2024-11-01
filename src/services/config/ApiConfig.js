import axios from "axios";
import { ApiBaseURL } from "./Endpoints";

// Axios instance
const axiosInstance = axios.create({
  baseURL: ApiBaseURL,
  timeout: 600000,
  headers: {
    "Content-Type": "application/json; charset=utf-8",
  },
});

axiosInstance.defaults.withCredentials = true;

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

axiosInstance.interceptors.request.use(
  async function (config) {
    if (typeof window !== "undefined") {
      const maangCookie = getCookie("maang");
      console.log(maangCookie);
      if (maangCookie && !config.url.startsWith("/public")) {
        try {
          const maangData = JSON.parse(decodeURIComponent(maangCookie));
          const token = maangData.token;
          if (token) {
            config.headers["Authorization"] = `Token ${token}`;
          }
        } catch (e) {
          console.error("Error parsing maang cookie:", e);
        }
      }
    }
    return config;
  },
  function (error) {
    // Handle the error
    return Promise.reject(error);
  }
);

export default axiosInstance;
