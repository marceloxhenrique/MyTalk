import { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../contexts/AuthContext";

type ChatProps = {
  senderId: string | undefined;
  receiverId: string | undefined;
  content: string | undefined;
};

export default function ChatWindow({
  messages,
}: {
  messages: ChatProps[] | undefined;
}) {
  const user = useContext(AuthContext);
  const scrollBottom = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollBottom.current) {
      scrollBottom.current.scrollIntoView();
    }
  }, [messages]);

  return (
    <div className="flex h-[80vh] w-full flex-1 flex-col overflow-y-auto p-2">
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
    </div>
  );
}
