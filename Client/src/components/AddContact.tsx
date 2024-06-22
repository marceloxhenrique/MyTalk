import { ChevronLeft, UserPlus } from "lucide-react";
import { Drawer } from "vaul";
import { Button } from "./ui/button";

import {
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "./ui/drawer";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

const schemaAddContact = z.object({
  email: z
    .string()
    .min(1, { message: "This field is obligatory" })
    .email("This is not a valid email."),
  name: z
    .string()
    .min(1, { message: "Name must have at least one character." }),
});

export const AddContact = () => {
  type NewContact = z.infer<typeof schemaAddContact>;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewContact>({
    resolver: zodResolver(schemaAddContact),
  });

  const handleAddContact = (userInfo: NewContact) => {
    console.log(userInfo);
    reset();
  };
  return (
    <Drawer.Root>
      <DrawerTrigger asChild>
        <UserPlus className="text-primaryColor" />
      </DrawerTrigger>
      <DrawerContent className="flex h-screen items-center">
        <section className="w-full max-w-2xl px-4">
          <DrawerTrigger asChild>
            <Button variant="ghost" size="icon" className="">
              <ChevronLeft className="size-10 text-primaryColor" />
              <span className="sr-only">Settings</span>
            </Button>
          </DrawerTrigger>
          <DrawerHeader className="flex flex-row justify-center">
            <DrawerTitle className="text-primaryColor">Add Contact</DrawerTitle>
            <DrawerDescription></DrawerDescription>
          </DrawerHeader>
        </section>
        <form
          onSubmit={handleSubmit((userInfo) => handleAddContact(userInfo))}
          className="grid w-full max-w-2xl items-start gap-6 overflow-auto p-4 pt-0"
        >
          <fieldset className="grid rounded-lg border p-4">
            <legend className="-ml-1 px-1 text-sm font-medium">
              New Contact
            </legend>
            <label
              htmlFor="email"
              className="flex flex-col text-primaryTextColor"
            >
              Name
            </label>
            <input
              {...register("name")}
              type="text"
              className="input"
              placeholder="Enter new contact name"
            />
            <span className="mb-1 h-7 text-sm text-red-500">
              {errors.name?.message && <p>{errors.name.message}</p>}
            </span>
            <label
              htmlFor="password"
              className="flex flex-col text-primaryTextColor"
            >
              Email
            </label>
            <input
              {...register("email")}
              type="email"
              name="email"
              className="input"
              placeholder="New contact email"
            />
            <section className="mb-1 h-7 text-sm text-red-500">
              {errors.email?.message && <p>{errors.email.message}</p>}
            </section>
            <div className="flex w-full flex-row items-end justify-center gap-2">
              <button
                className="rounded-md border border-primaryColor bg-primaryColor px-4 py-2 text-secondaryColor"
                type="submit"
              >
                Submit
              </button>
              <DrawerTrigger asChild>
                <button
                  onClick={() => {
                    reset();
                  }}
                  className="rounded-md border border-primaryColor px-4 py-2 text-primaryColor"
                >
                  Cancel
                </button>
              </DrawerTrigger>
            </div>
          </fieldset>
        </form>
      </DrawerContent>
    </Drawer.Root>
  );
};
