import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { socket } from "../Socket";

type MessageProps = {
  senderId: string | undefined;
  receiverId: string | undefined;
  content: string | undefined;
};

export default function Contacts({
  settings,
}: {
  settings: {
    setReceiverId: React.Dispatch<React.SetStateAction<string | undefined>>;
    setMessages: React.Dispatch<
      React.SetStateAction<MessageProps[] | undefined>
    >;
  };
}) {
  const userInfo = useContext(AuthContext);
  const firstLetter = userInfo?.currentUser?.email?.slice(0, 1).toUpperCase();
  const [previousReceiver, setPreviousReceiver] = useState<string>();
  const [userList, setUserList] = useState<
    {
      userEmail: string;
      userId: string;
      socketId: string;
    }[]
  >();

  socket.on("listOfUsers", (list) => {
    setUserList(list);
    console.log("List of Users", list);
  });

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
    <section className="bg-primaryColor h-screen w-full p-1 transition-all">
      <section className="flex flex-row p-2">
        <span className="bg-primaryColorlt text-primaryColor flex h-12 w-14 items-center justify-center rounded-full text-xl font-bold">
          {firstLetter}
        </span>
        <p className="flex w-full items-center justify-center text-xl">
          Conversations
        </p>
      </section>
      <ul className="max-h-[80vh] overflow-y-auto rounded-md bg-blue-100 p-2">
        {userList &&
          userList.map((user) => (
            <li
              key={user.socketId}
              className="border-primaryColorlt hover:bg-primaryColorlt flex cursor-pointer flex-row items-center rounded-md border-b p-2 py-4 hover:bg-blue-200"
            >
              <span className="bg-primaryColorlt text-primaryColor mr-4 flex h-12 w-12 items-center justify-center rounded-full text-xl font-bold">
                {user.userEmail && user.userEmail.slice(0, 2)}
              </span>
              <button
                onClick={() => {
                  handleCreateRoom(user.userId);
                }}
                className="h-full text-lg"
              >
                {user.userEmail}
              </button>
            </li>
          ))}
      </ul>
    </section>
  );
}
