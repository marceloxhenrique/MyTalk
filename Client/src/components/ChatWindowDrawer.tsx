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

const ChatWindownDrawer = ({
  children,
}: React.DetailedHTMLProps<
  React.LiHTMLAttributes<HTMLLIElement>,
  HTMLLIElement
>) => {
  return (
    <Drawer.Root>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent className="flex h-screen items-center rounded-none">
        <section className="flex h-full w-full max-w-2xl flex-col items-center md:pb-4">
          <section className="h-10 w-[calc(100%-1.6em)]">
            <DrawerTrigger asChild>
              <Button variant="ghost" size="icon" className="">
                <ChevronLeft className="size-10 text-primaryColor" />
              </Button>
            </DrawerTrigger>
            <DrawerHeader className="flex flex-row justify-center">
              <DrawerTitle className="text-primaryColor"></DrawerTitle>
              <DrawerDescription></DrawerDescription>
            </DrawerHeader>
          </section>
          <section className="relative h-full w-full md:flex">
            <div className="relative flex h-full w-full flex-col border border-gray-300 bg-gray-300 p-4 md:rounded-md">
              <ScrollArea className="flex-1 p-4"></ScrollArea>
              <form
                className="flex flex-row overflow-hidden rounded-md focus-within:ring-1 focus-within:ring-primaryColor"
                onSubmit={() => {
                  console.log("");
                }}
              >
                <textarea
                  name="UserInput"
                  id=""
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
