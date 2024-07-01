import axios from "axios";
const BACKEND_URL_BASE = import.meta.env.VITE_BACKEND_URL_BASE;

export const GetHistoryMessages = async (
  senderId: string,
  receiverId: string,
) => {
  const res = await axios.get(
    `${BACKEND_URL_BASE}/message/${senderId}/${receiverId}`,
    {
      withCredentials: true,
    },
  );
  return res.data;
};
