import { SendHorizontal } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";
import { AuthContext } from "@/contexts/AuthContext";
import { useContext, useRef, useEffect, FormEvent, useState } from "react";
import { socket } from "@/Socket";

type ChatProps = {
  senderId: string | undefined;
  receiverId: string | undefined;
  content: string | undefined;
  id?: string;
  sentAt?: string;
};

export default function ChatWindow({
  messages,
  receiverId,
}: {
  messages: ChatProps[] | undefined;
  receiverId: string | undefined;
}) {
  const user = useContext(AuthContext);
  const scrollBottom = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [message, setMessage] = useState("");
  const handlesubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (message.length > 0 && receiverId) {
      socket.emit("privateMessages", {
        senderId: user?.currentUser?.id,
        receiverId: receiverId,
        content: message,
      });
      setMessage("");
    }
    textareaRef.current?.focus();
  };

  useEffect(() => {
    if (scrollBottom.current) {
      scrollBottom.current.scrollIntoView();
    }
  }, [messages]);
  return (
    <section className="relative hidden h-full w-full md:flex md:flex-1 md:py-4 md:pr-4">
      <div className="relative flex h-full w-full flex-col gap-5 border border-gray-300 bg-gray-100 p-1 md:rounded-md">
        <ScrollArea className="flex-1 p-1">
          <ul className="flex-1">
            {messages &&
              messages.map((item, index) =>
                item.senderId == user?.currentUser?.id ? (
                  <li key={index} className="flex justify-end">
                    <p className="m-2 my-6 ml-10 max-w-xl rounded-l-3xl rounded-br-sm rounded-tr-3xl bg-primaryColor p-4 text-secondaryTextColor shadow-md shadow-zinc-400">
                      {item.content}
                    </p>
                  </li>
                ) : item.content?.valueOf() != undefined ? (
                  <li key={index} className="flex w-full justify-start">
                    <p className="m-2 my-6 mr-10 max-w-xl rounded-r-3xl rounded-bl-sm rounded-tl-3xl bg-backgroundMessageReceived p-4 text-primaryTextColor shadow-md shadow-zinc-400">
                      {item.content}
                    </p>
                  </li>
                ) : undefined,
              )}
          </ul>
          <div ref={scrollBottom}></div>
        </ScrollArea>
        <form
          onSubmit={(e: FormEvent<HTMLFormElement>) => {
            handlesubmit(e);
          }}
          className="m-2 flex flex-row overflow-hidden rounded-md focus-within:ring-1 focus-within:ring-primaryColor"
        >
          <textarea
            ref={textareaRef}
            value={message}
            autoFocus
            name="UserInput"
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            className="none sticky bottom-0 h-20 w-full resize-none rounded-l-md border border-gray-500 p-4 outline-none"
            placeholder="Message"
          />
          <button
            type="submit"
            className="cursor-pointer bg-primaryColor px-6 text-lg text-secondaryColor hover:bg-blue-500"
          >
            <SendHorizontal />
          </button>
        </form>
      </div>
    </section>
  );
}
