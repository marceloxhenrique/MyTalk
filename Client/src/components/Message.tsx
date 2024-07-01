import { ScrollArea } from "@/components/ui/scroll-area";
import { Search } from "lucide-react";
import ChatWindownDrawer from "./ChatWindowDrawer";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { socket } from "@/Socket";
import { GetHistoryMessages } from "./GetHistoryMessages";
const BACKEND_URL_BASE = import.meta.env.VITE_BACKEND_URL_BASE;

const Message = ({
  settings,
}: {
  settings: {
    setReceiverId: React.Dispatch<React.SetStateAction<string | undefined>>;
    setMessages: React.Dispatch<
      React.SetStateAction<MessageProps[] | undefined>
    >;
  };
}) => {
  const currentUser = useContext(AuthContext);
  const [previousReceiver, setPreviousReceiver] = useState<string>();
  const [contacts, setContacts] = useState<OutPutContact[]>();
  useEffect(() => {
    const getContactList = async () => {
      const res = await axios.get(
        `${BACKEND_URL_BASE}/contacts/${currentUser?.currentUser?.id}`,
        {
          withCredentials: true,
        },
      );
      setContacts(res.data);
    };
    getContactList();
  }, [currentUser?.currentUser?.id]);

  contacts?.sort((a, b) => a.email.localeCompare(b.email));

  const handleCreateRoom = async (receiverId: string) => {
    const message = await GetHistoryMessages(
      currentUser!.currentUser!.id!,
      receiverId,
    );
    console.log("MESSAGE", message);
    settings.setMessages([]);
    socket.emit("leaveRoom", {
      userId: currentUser?.currentUser?.id,
      receiverId: previousReceiver,
    });

    setPreviousReceiver(receiverId);
    settings.setReceiverId(receiverId);
    socket.emit("joinRoom", {
      userId: currentUser?.currentUser?.id,
      receiverId: receiverId,
    });
  };
  return (
    <section className="h-[calc(100%-57px)] w-full flex-col md:w-96 md:p-4">
      <fieldset className="flex h-full flex-col md:rounded-md md:border md:border-gray-300">
        <legend className="ml-4 px-1 text-lg font-medium">New Messages</legend>
        <div className="relative m-3.5 rounded-md border border-gray-300 md:my-4 md:rounded-md">
          <Search className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            name=""
            id=""
            className="w-full rounded-md p-2 pl-8"
            placeholder="Search"
          />
        </div>
        <ScrollArea className="flex w-full px-3 py-4 md:p-4">
          <ul className="md:hidden">
            {contacts ? (
              contacts.map((contact) => (
                <ChatWindownDrawer key={contact.contactId}>
                  <li
                    className="group my-2 flex cursor-pointer flex-row items-center gap-2 rounded-md border border-gray-300 bg-background p-4 text-sm shadow-md hover:bg-primaryColorlt"
                    onClick={() => handleCreateRoom(contact.contactId)}
                  >
                    <span className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-300 bg-primaryColorlt text-xl text-primaryColor group-hover:bg-secondaryColor">
                      {contact.contactName.slice(0, 1).toUpperCase()}
                    </span>
                    <div className="flex flex-col justify-center">
                      <p className="text-lg">{contact.contactName}</p>
                      <p className="text-gray-500">{contact.email}</p>
                    </div>
                  </li>
                </ChatWindownDrawer>
              ))
            ) : (
              <div className="flex w-full justify-center text-primaryColorlt">
                No contacts found
              </div>
            )}
          </ul>
          <ul className="hidden md:block">
            {contacts ? (
              contacts.map((contact) => (
                <li
                  key={contact.contactId}
                  className="group my-2 flex cursor-pointer flex-row items-center gap-2 rounded-md border border-gray-300 bg-background p-4 text-sm shadow-md hover:bg-primaryColorlt"
                  onClick={() => handleCreateRoom(contact.contactId)}
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-300 bg-primaryColorlt text-xl text-primaryColor group-hover:bg-secondaryColor">
                    {contact.contactName.slice(0, 1).toUpperCase()}
                  </span>
                  <div className="flex flex-col justify-center">
                    <p className="text-lg">{contact.contactName}</p>
                    <p className="text-gray-500">{contact.email}</p>
                  </div>
                </li>
              ))
            ) : (
              <div className="flex w-full justify-center text-primaryColorlt">
                No contacts found
              </div>
            )}
          </ul>
        </ScrollArea>
      </fieldset>
    </section>
  );
};

export default Message;

type MessageProps = {
  senderId: string | undefined;
  receiverId: string | undefined;
  content: string | undefined;
};

type OutPutContact = {
  id: string;
  contactId: string;
  email: string;
  contactName: string;
  userId: string;
};
