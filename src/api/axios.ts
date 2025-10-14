import { initDataRaw, isTMA } from "@telegram-apps/sdk";
import type { AxiosInstance } from "axios";
import axios from "axios";

export const axiosInstance: AxiosInstance = axios.create({
  timeout: 3000,
});

axiosInstance.interceptors.request.use((config) => {
  if (isTMA()) {
    config.headers.set("TG-Init-Data", initDataRaw());
  }

  return config;
});
