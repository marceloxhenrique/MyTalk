import { MessageSquarePlus, Search } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { AddContact } from "./AddContact";

export const Nav = () => {
  return (
    <section>
      <nav className="m-3.5 flex justify-center gap-4">
        <TooltipProvider>
          <div className="flex h-9 w-9 items-center justify-center rounded-md p-1 hover:bg-primaryColorlt">
            <Tooltip delayDuration={0}>
              <TooltipTrigger>
                <AddContact />
              </TooltipTrigger>
              <TooltipContent className="bg-primaryColor text-secondaryTextColor">
                <p>Add Contact</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>
        <TooltipProvider>
          <div className="flex h-9 w-9 items-center justify-center rounded-md p-1 hover:bg-primaryColorlt">
            <Tooltip delayDuration={0}>
              <TooltipTrigger>
                {<MessageSquarePlus className="text-primaryColor" />}
              </TooltipTrigger>
              <TooltipContent className="bg-primaryColor text-secondaryTextColor">
                <p>New Message</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>
      </nav>
      <h1 className="text-center text-xl">Conversations</h1>
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
    </section>
  );
};
