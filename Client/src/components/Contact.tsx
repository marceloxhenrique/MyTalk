import { ScrollArea } from "@/components/ui/scroll-area";
import { Search } from "lucide-react";
import ConversationDrawer from "./ChatWindowDrawer";
import { socket } from "@/Socket";
import { useContext, useState } from "react";
import { AuthContext } from "@/contexts/AuthContext";

type MessageProps = {
  senderId: string | undefined;
  receiverId: string | undefined;
  content: string | undefined;
};

type UserList =
  | {
      userEmail: string;
      userId: string;
      socketId: string;
    }[]
  | undefined;

export function Contact({
  settings,
}: {
  settings: {
    setReceiverId: React.Dispatch<React.SetStateAction<string | undefined>>;
    setMessages: React.Dispatch<
      React.SetStateAction<MessageProps[] | undefined>
    >;
    userList: UserList;
  };
}) {
  const userInfo = useContext(AuthContext);
  const [previousReceiver, setPreviousReceiver] = useState<string>();

  const handleCreateRoom = (receiverId: string) => {
    settings.setMessages([]);
    socket.emit("leaveRoom", {
      userId: userInfo?.currentUser?.id,
      receiverId: previousReceiver,
    });

    setPreviousReceiver(receiverId);
    settings.setReceiverId(receiverId);
    socket.emit("joinRoom", {
      userId: userInfo?.currentUser?.id,
      receiverId: receiverId,
    });
  };
  return (
    <section className="h-[calc(100%-57px)] w-full flex-col md:w-96 md:p-4">
      <fieldset className="flex h-full flex-col md:rounded-md md:border md:border-gray-300">
        <legend className="ml-4 px-1 text-lg font-medium">Chats</legend>
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
            {settings.userList &&
              settings.userList.map((user) => (
                <ConversationDrawer key={user.userId}>
                  <li
                    className="group my-2 flex cursor-pointer flex-row items-center gap-2 rounded-md border border-gray-300 bg-background p-4 text-sm shadow-md hover:bg-primaryColorlt"
                    onClick={() => handleCreateRoom(user.userId)}
                  >
                    <span className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-300 bg-primaryColorlt text-xl text-primaryColor group-hover:bg-secondaryColor">
                      {user.userEmail.slice(0, 1).toUpperCase()}
                    </span>
                    <div className="flex flex-col justify-center">
                      {/* <p className="text-lg">{user.userName}</p> */}
                      <p className="text-gray-500">{user.userEmail}</p>
                    </div>
                  </li>
                </ConversationDrawer>
              ))}
          </ul>
          <ul className="hidden md:block">
            {settings.userList &&
              settings.userList.map((user) => (
                <li
                  key={user.userId}
                  className="group my-2 flex cursor-pointer flex-row items-center gap-2 rounded-md border border-gray-300 bg-background p-4 text-sm shadow-md hover:bg-primaryColorlt"
                  onClick={() => handleCreateRoom(user.userId)}
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-300 bg-primaryColorlt text-xl text-primaryColor group-hover:bg-secondaryColor">
                    {user.userEmail.slice(0, 1).toUpperCase()}
                  </span>
                  <div className="flex flex-col justify-center">
                    {/* <p className="text-lg">{user.userName}</p> */}
                    <p className="text-gray-500">{user.userEmail}</p>
                  </div>
                </li>
              ))}
          </ul>
        </ScrollArea>
      </fieldset>
    </section>
  );
}
