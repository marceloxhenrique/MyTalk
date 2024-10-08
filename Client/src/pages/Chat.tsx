import { AddContact } from "@/components/AddContact";
import { Header } from "@/components/Header";
import { Nav } from "@/components/Nav";
import { Contact } from "@/components/Contact";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import { socket } from "@/Socket";
import Message from "@/components/Message";
import ChatWindow from "@/components/ChatWindow";
import ContactList from "@/components/ContactList";

enum ListChoice {
  chats = "chats",
  newMessage = "newMessage",
  addContact = "addContact",
}

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

export const Chat = () => {
  const user = useContext(AuthContext);
  const [receiver, setReceiver] = useState<OutPutContact>();
  const [messages, setMessages] = useState<MessageProps[] | undefined>([]);
  const [item, setItem] = useState<keyof typeof ListChoice>("chats");

  useEffect(() => {
    if (user?.currentUser) {
      socket.connect();
      socket.emit("registerUser", {
        userEmail: user?.currentUser?.email,
        userId: user?.currentUser?.id,
        socketId: socket.id,
      });
    }
    if (!user) {
      socket.disconnect();
    }
    return () => {
      socket.off("private-message");
      socket.disconnect();
    };
  }, [user]);
  socket.on(
    "private_message",
    (msg: { senderId: string; receiverId: string; content: string }) => {
      setMessages([...messages!, msg]);
    },
  );

  return (
    <main className="flex h-screen flex-col">
      <Header />
      <section className="flex h-[calc(100%-57px)] flex-row">
        <div className="flex h-full w-full flex-col md:max-w-sm">
          <Nav setItem={setItem} />
          {item === "chats" && (
            <Contact
              settings={{ setReceiver, setMessages, messages, receiver }}
            />
          )}
          {item === "newMessage" && (
            <Message
              settings={{ setReceiver, setMessages, messages, receiver }}
            />
          )}
          {item === "addContact" && <AddContact />}
        </div>

        {receiver === undefined ? (
          <ContactList
            settings={{ setReceiver, setMessages, messages, receiver }}
          />
        ) : (
          <ChatWindow messages={messages} receiver={receiver} />
        )}
      </section>
    </main>
  );
};
