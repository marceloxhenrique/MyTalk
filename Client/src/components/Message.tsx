import { ScrollArea } from "@/components/ui/scroll-area";
import { Search } from "lucide-react";
import ChatWindownDrawer from "./ChatWindowDrawer";

const contacts = [
  {
    userId: "110982371-8732291923",
    userName: "Lucas",
    email: "lucas@gamil.com",
  },
  {
    userId: "11099892371232221-8732291923",
    userName: "Paul",
    email: "paul@gamil.com",
  },
  {
    userId: "110561333111871-8732291923",
    userName: "Chloe",
    email: "chloe@gamil.com",
  },
  {
    userId: "1109123657-873220955623191923",
    userName: "Marcelo",
    email: "marcelo@gamil.com",
  },
  {
    userId: "11099892123766371-8732291923",
    userName: "Pedro",
    email: "Pedro@gamil.com",
  },
  {
    userId: "11059055661871-873229192ZEZE3",
    userName: "Maria",
    email: "maria@gamil.com",
  },
  {
    userId: "11090019372123657-873229133434923",
    userName: "Jane",
    email: "jane@gamil.com",
  },
  {
    userId: "110982281757-87322919232323123123",
    userName: "Jane",
    email: "jane@gamil.com",
  },
  {
    userId: "110982371-8732291923223123",
    userName: "Marcelo",
    email: "marcelo@gamil.com",
  },
  {
    userId: "11099892371-873229192312312",
    userName: "Pedro",
    email: "Pedro@gamil.com",
  },
  {
    userId: "110561871-873229192311222",
    userName: "Maria",
    email: "maria@gamil.com",
  },
  {
    userId: "1109123657-8732291923112",
    userName: "Jane",
    email: "jane@gamil.com",
  },
];

const Message = () => {
  contacts.sort((a, b) => a.userName.localeCompare(b.userName));
  const openChatMessage = (contact: {
    userId: string;
    userName: string;
    email: string;
  }) => {
    console.log(contact);
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
            {contacts.map((contact) => (
              <ChatWindownDrawer key={contact.userId}>
                <li
                  className="group my-2 flex cursor-pointer flex-row items-center gap-2 rounded-md border border-gray-300 bg-background p-4 text-sm shadow-md hover:bg-primaryColorlt"
                  onClick={() => openChatMessage(contact)}
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-300 bg-primaryColorlt text-xl text-primaryColor group-hover:bg-secondaryColor">
                    {contact.userName.slice(0, 1).toUpperCase()}
                  </span>
                  <div className="flex flex-col justify-center">
                    <p className="text-lg">{contact.userName}</p>
                    <p className="text-gray-500">{contact.email}</p>
                  </div>
                </li>
              </ChatWindownDrawer>
            ))}
          </ul>
          <ul className="hidden md:block">
            {contacts.map((contact) => (
              <li
                key={contact.userId}
                className="group my-2 flex cursor-pointer flex-row items-center gap-2 rounded-md border border-gray-300 bg-background p-4 text-sm shadow-md hover:bg-primaryColorlt"
                onClick={() => openChatMessage(contact)}
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-300 bg-primaryColorlt text-xl text-primaryColor group-hover:bg-secondaryColor">
                  {contact.userName.slice(0, 1).toUpperCase()}
                </span>
                <div className="flex flex-col justify-center">
                  <p className="text-lg">{contact.userName}</p>
                  <p className="text-gray-500">{contact.email}</p>
                </div>
              </li>
            ))}
          </ul>
        </ScrollArea>
      </fieldset>
    </section>
  );
};

export default Message;
