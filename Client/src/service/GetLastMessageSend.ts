import axios from "axios";

const BACKEND_URL_BASE = import.meta.env.VITE_BACKEND_URL_BASE;
export const GetLastMessageSend = async (userId: string) => {
  const res = await axios.get(`${BACKEND_URL_BASE}/lastmessage/${userId}`);
  console.log("ResDATA", res.data);
  return res.data;
};
