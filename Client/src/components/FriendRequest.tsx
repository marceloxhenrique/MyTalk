import axios from "axios";
import { AuthContext } from "@/contexts/AuthContext";
import { useContext, useEffect, useState } from "react";
import { ScrollArea } from "./ui/scroll-area";
import { Check, X } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import toast from "react-hot-toast";
const BACKEND_URL_BASE = import.meta.env.VITE_BACKEND_URL_BASE;

const FriendRequest = () => {
  const [friendRequestList, setFriendRequestList] =
    useState<FriendRequestInput[]>();
  const user = useContext(AuthContext);
  const getFriendRequest = async () => {
    const res = await axios.get(
      `${BACKEND_URL_BASE}/friendrequest/${user?.currentUser?.email}`,
      {
        withCredentials: true,
      },
    );
    setFriendRequestList(res.data);
  };
  const acceptFriendRequest = async (data: FriendRequestInput) => {
    const res = await axios.post(
      `${BACKEND_URL_BASE}/contact`,
      { ...data, contact_id: `${user?.currentUser?.id}` },
      {
        withCredentials: true,
      },
    );
    getFriendRequest();
    toast.success(res.data);
  };
  const ignoreFriendRequest = async (data: FriendRequestInput) => {
    const res = await axios.post(
      `${BACKEND_URL_BASE}/friendrequest/ignore`,
      { ...data, contact_id: `${user?.currentUser?.id}` },
      {
        withCredentials: true,
      },
    );
    getFriendRequest();
    toast.success(res.data);
  };
  useEffect(() => {
    getFriendRequest();
  }, []);
  return (
    <section className="mt-4 w-full flex-col md:w-96 md:p-4">
      <fieldset className="mx-2 h-full flex-col p-1.5 md:mx-0 md:rounded-md md:border md:border-gray-300 md:p-1">
        <legend className="pl-1.5 text-lg font-medium md:pl-1">
          Friends Request
        </legend>
        <ScrollArea className="p-1">
          {friendRequestList === undefined ||
          friendRequestList?.length === 0 ? (
            <p className="text-gray-400">No friend request</p>
          ) : (
            <ul className="max-h-60">
              {friendRequestList?.map((friendRequest) => (
                <li
                  key={friendRequest.id}
                  className="justify m-1 my-1 flex flex-row justify-between rounded-md p-1 py-2 hover:bg-primaryColorlt"
                >
                  <p className="flex items-center">
                    {friendRequest.user_email}
                  </p>

                  <div>
                    <TooltipProvider>
                      <Tooltip delayDuration={0}>
                        <TooltipTrigger>
                          <Check
                            onClick={() => acceptFriendRequest(friendRequest)}
                            className="mx-1 flex h-8 w-8 items-center justify-center rounded-full bg-gray-300 p-1 text-primaryColor"
                          />
                        </TooltipTrigger>
                        <TooltipContent className="bg-primaryColor text-secondaryTextColor">
                          <p>Accept</p>
                        </TooltipContent>
                      </Tooltip>
                      <Tooltip delayDuration={0}>
                        <TooltipTrigger>
                          <X
                            onClick={() => ignoreFriendRequest(friendRequest)}
                            className="mx-1 flex h-8 w-8 items-center justify-center rounded-full bg-gray-300 p-1 font-sans text-primaryColor"
                          />
                        </TooltipTrigger>
                        <TooltipContent className="bg-primaryColor text-secondaryTextColor">
                          <p>Ignore</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </ScrollArea>
      </fieldset>
    </section>
  );
};

export default FriendRequest;
type FriendRequestInput = {
  id: string;
  user_email: string;
  userId: string;
  contact_email: string;
};
