import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { MessageSquareMore, MessageSquarePlus, UserPlus } from "lucide-react";

export const Nav = ({
  setItem,
}: {
  setItem: React.Dispatch<
    React.SetStateAction<"chats" | "newMessage" | "addContact">
  >;
}) => {
  return (
    <section>
      <nav className="m-3.5 flex justify-center gap-8 text-primaryColor">
        <TooltipProvider>
          <li
            onClick={() => setItem("chats")}
            className="flex h-9 w-9 items-center justify-center rounded-md p-1 hover:bg-primaryColorlt"
          >
            <Tooltip delayDuration={0}>
              <TooltipTrigger>
                <MessageSquareMore />
              </TooltipTrigger>
              <TooltipContent className="bg-primaryColor text-secondaryTextColor">
                <p>Chats</p>
              </TooltipContent>
            </Tooltip>
          </li>
        </TooltipProvider>
        <TooltipProvider>
          <li
            onClick={() => setItem("newMessage")}
            className="flex h-9 w-9 items-center justify-center rounded-md p-1 hover:bg-primaryColorlt"
          >
            <Tooltip delayDuration={0}>
              <TooltipTrigger>
                <MessageSquarePlus />
              </TooltipTrigger>
              <TooltipContent className="bg-primaryColor text-secondaryTextColor">
                <p>New Message</p>
              </TooltipContent>
            </Tooltip>
          </li>
        </TooltipProvider>
        <TooltipProvider>
          <li
            onClick={() => setItem("addContact")}
            className="flex h-9 w-9 items-center justify-center rounded-md p-1 hover:bg-primaryColorlt"
          >
            <Tooltip delayDuration={0}>
              <TooltipTrigger>
                <UserPlus />
              </TooltipTrigger>
              <TooltipContent className="bg-primaryColor text-secondaryTextColor">
                <p>Add Contact</p>
              </TooltipContent>
            </Tooltip>
          </li>
        </TooltipProvider>
      </nav>
    </section>
  );
};
