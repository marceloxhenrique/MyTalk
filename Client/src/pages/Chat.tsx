import { AddContact } from "@/components/AddContact";
import { Header } from "@/components/Header";
import { Nav } from "@/components/Nav";
// import { Contact } from "@/components/Contact";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import { socket } from "@/Socket";
import Message from "@/components/Message";
import ChatWindow from "@/components/ChatWindow";

enum ListChoice {
  newContact = "newContact",
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

export const Chat = () => {
  const user = useContext(AuthContext);
  const [receiver, setReceiver] = useState<OutPutContact>();
  const [messages, setMessages] = useState<MessageProps[] | undefined>([]);
  const [item, setItem] = useState<keyof typeof ListChoice>("newContact");

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

  // const [userList, setUserList] = useState<
  //   {
  //     userEmail: string;
  //     userId: string;
  //     socketId: string;
  //   }[]
  // >();

  // socket.on("listOfUsers", (list) => {
  //   setUserList(list);
  // });

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
        <div className="flex h-[calc(100%-7px)] w-full flex-col md:max-w-sm">
          <Nav setItem={setItem} />
          {item === "newContact" && (
            <p></p>
            // <Contact settings={{ setReceiver, setMessages, userList }} />
          )}
          {item === "newMessage" && (
            <Message settings={{ setReceiver, setMessages }} />
          )}
          {item === "addContact" && <AddContact />}
        </div>
        <ChatWindow messages={messages} receiver={receiver} />
      </section>
    </main>
  );
};
type OutPutContact = {
  id: string;
  contactId: string;
  email: string;
  contactName: string;
  userId: string;
};
