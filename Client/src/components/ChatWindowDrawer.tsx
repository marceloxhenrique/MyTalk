import { SendHorizontal } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";

import { ChevronLeft } from "lucide-react";
import { Drawer } from "vaul";
import { Button } from "./ui/button";
import {
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "./ui/drawer";
import {
  FormEvent,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { AuthContext } from "@/contexts/AuthContext";
import { socket } from "@/Socket";

type ChatProps = {
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

const ChatWindownDrawer = ({
  children,
  messages,
  receiver,
}: {
  children: ReactNode;
  messages: ChatProps[] | undefined;
  receiver: OutPutContact | undefined;
}) => {
  const user = useContext(AuthContext);
  const scrollBottom = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [message, setMessage] = useState("");
  const handlesubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (message.length > 0 && receiver?.contactId) {
      socket.emit("privateMessages", {
        senderId: user?.currentUser?.id,
        receiverId: receiver.contactId,
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
    <Drawer.Root>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent className="flex h-screen items-center rounded-none">
        <section className="flex h-full w-full max-w-2xl flex-col items-center md:pb-4">
          <section className="h-18 flex w-[calc(100%-1.6em)] items-center">
            <DrawerTrigger asChild>
              <Button variant="ghost" size="icon" className="">
                <ChevronLeft className="size-10 text-primaryColor" />
              </Button>
            </DrawerTrigger>
            {receiver && (
              <div className="flex flex-row gap-3 rounded-sm p-2">
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-300 bg-primaryColorlt text-xl text-primaryColor group-hover:bg-secondaryColor">
                  {receiver?.email.slice(0, 1).toUpperCase()}
                </span>
                <div>
                  <p>{receiver?.contactName}</p>
                  <p>{receiver?.email}</p>
                </div>
              </div>
            )}
            <DrawerHeader className="flex flex-row justify-center">
              <DrawerTitle className="text-primaryColor"></DrawerTitle>
              <DrawerDescription></DrawerDescription>
            </DrawerHeader>
          </section>
          <section className="relative h-[calc(100%-5rem)] w-full md:flex">
            <div className="relative flex h-full w-full flex-col border border-gray-300 p-2 md:rounded-md">
              <ScrollArea className="flex-1">
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
                className="last: mt-1 flex flex-row overflow-hidden rounded-md focus-within:ring-1 focus-within:ring-primaryColor"
                onSubmit={(e: FormEvent<HTMLFormElement>) => {
                  handlesubmit(e);
                }}
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
                  className="cursor-pointer bg-primaryColor px-6 text-lg text-secondaryColor"
                >
                  <SendHorizontal />
                </button>
              </form>
            </div>
          </section>
        </section>
      </DrawerContent>
    </Drawer.Root>
  );
};

export default ChatWindownDrawer;
