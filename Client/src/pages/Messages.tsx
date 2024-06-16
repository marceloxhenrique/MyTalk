import { useContext, useEffect, useState } from "react";
import ChatWindow from "../components/ChatWindow";
import Contacts from "../components/Contacts";
import { socket } from "../Socket";
import UserInput from "../components/UserInput";
import Header from "../components/Header";
import { AuthContext } from "../contexts/AuthContext";

type MessageProps = {
  senderId: string | undefined;
  receiverId: string | undefined;
  content: string | undefined;
};

export default function Messages() {
  const user = useContext(AuthContext);

  const [chatWindow] = useState(false);
  const [messages, setMessages] = useState<MessageProps[] | undefined>([]);
  const [receiverId, setReceiverId] = useState<string>();

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
    <main className="flex h-screen w-full flex-row items-center justify-center transition-all">
      <section
        className={`flex w-full md:w-80 ${!chatWindow ? "hidden" : "block"} md:block`}
      >
        <Contacts settings={{ setReceiverId, setMessages }} />
      </section>
      <section
        className={`flex h-screen flex-1 flex-col overflow-y-auto md:block ${
          chatWindow ? "hidden" : "block"
        } `}
      >
        <Header />
        <ChatWindow messages={messages} />
        <UserInput receiverId={receiverId} />
      </section>
    </main>
  );
}
