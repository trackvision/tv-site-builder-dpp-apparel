import axios from "axios";
import { Buffer } from "buffer";
import { API_ACCESS_TOKEN, API_URL } from "@/constants";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-type": "application/json",
    Authorization: `Bearer ${API_ACCESS_TOKEN}`,
  },
});

api.getBase64 = async (path: string) => {
  const res = await api.get(path, { responseType: "arraybuffer" });
  const type = res.headers["content-type"];
  const data = Buffer.from(res.data, "binary").toString("base64");
  return `data:${type};base64,${data}`;
};

export default api;