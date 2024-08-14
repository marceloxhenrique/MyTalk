import axios from "axios";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search } from "lucide-react";
import { socket } from "@/Socket";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import { GetHistoryMessages } from "./GetHistoryMessages";
const BACKEND_URL_BASE = import.meta.env.VITE_BACKEND_URL_BASE;

type MessageProps = {
  senderId: string | undefined;
  receiverId: string | undefined;
  content: string | undefined;
  id?: string;
  sentAt?: string;
};

type OutPutContact = {
  id: string;
  contactId: string;
  email: string;
  contactName: string;
  userId: string;
};
type ChatProps = {
  senderId: string | undefined;
  receiverId: string | undefined;
  content: string | undefined;
  id?: string;
  sentAt?: string;
};

export function ContactList({
  settings,
}: {
  settings: {
    setReceiver: React.Dispatch<
      React.SetStateAction<OutPutContact | undefined>
    >;
    setMessages: React.Dispatch<
      React.SetStateAction<MessageProps[] | undefined>
    >;
    messages: ChatProps[] | undefined;
    receiver: OutPutContact | undefined;
  };
}) {
  const currentUser = useContext(AuthContext);
  const [previousReceiver, setPreviousReceiver] = useState<OutPutContact>();
  const [contacts, setContacts] = useState<OutPutContact[]>();
  const getListOfContacts = async () => {
    try {
      const res = await axios.get(
        `${BACKEND_URL_BASE}/contacts/${currentUser?.currentUser?.id}`,
        {
          withCredentials: true,
        },
      );
      setContacts(res.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getListOfContacts();
  }, [currentUser?.currentUser, currentUser?.currentUser?.id]);

  contacts?.sort((a, b) => a.email.localeCompare(b.email));

  const handleCreateRoom = async (contact: OutPutContact) => {
    if (currentUser?.currentUser?.id) {
      try {
        const message = await GetHistoryMessages(
          currentUser.currentUser.id,
          contact.contactId,
        );

        settings.setMessages([]);
        socket.emit("leaveRoom", {
          userId: currentUser?.currentUser?.id,
          receiverId: previousReceiver,
        });

        if (message) {
          settings.setMessages(
            message.sort((a: MessageProps, b: MessageProps) =>
              a.sentAt?.localeCompare(b.sentAt ?? ""),
            ),
          );
        }
        setPreviousReceiver(contact);
        settings.setReceiver(contact);
        socket.emit("joinRoom", {
          userId: currentUser?.currentUser?.id,
          receiverId: contact.contactId,
        });
      } catch (error) {
        console.error("Error creating room", error);
      }
    }
  };

  function filterContacts(contactName: string) {
    if (contactName.length > 0) {
      const newContact = contacts?.filter((contact) =>
        contact.email.includes(contactName),
      );
      return setContacts(newContact);
    }
    getListOfContacts();
  }
  return (
    <section className="relative hidden h-full w-full flex-col md:flex md:flex-1 md:py-4 md:pr-4">
      <div className="relative flex h-full w-full flex-col gap-5 border border-gray-300 bg-gray-100 p-1 md:rounded-md">
        <h1 className="mx-4 mt-2 font-semibold text-primaryColor">
          All Friends
        </h1>
        <div className="relative m-3.5 rounded-md border border-gray-300 md:my-1 md:rounded-md">
          <Search className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            name="filtercontact"
            className="w-full rounded-md p-2 pl-8 shadow-md"
            placeholder="Search"
            onChange={(e) => filterContacts(e.target.value)}
          />
        </div>
        <ScrollArea className="flex w-full px-3">
          <ul>
            {contacts?.map((contact) => (
              <li
                key={contact.contactId}
                className="group my-2 flex cursor-pointer flex-row items-center gap-2 rounded-md border border-gray-300 bg-background p-4 text-sm shadow-md hover:bg-primaryColorlt"
                onClick={() => handleCreateRoom(contact)}
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-300 bg-primaryColorlt text-xl text-primaryColor group-hover:bg-secondaryColor">
                  {contact.email.slice(0, 1).toUpperCase()}
                </span>
                <div className="flex flex-col justify-center">
                  <p className="text-lg">{contact.contactName}</p>
                  <p className="text-gray-500">{contact.email}</p>
                </div>
              </li>
            ))}
          </ul>
        </ScrollArea>
      </div>
    </section>
  );
}
export default ContactList;
