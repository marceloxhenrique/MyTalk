import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import toast from "react-hot-toast";
const schemaAddContact = z.object({
  email: z
    .string()
    .min(1, { message: "This field is obligatory" })
    .email("This is not a valid email."),
  contactName: z
    .string()
    .min(1, { message: "Name must have at least one character." }),
});

const BACKEND_URL_BASE = import.meta.env.VITE_BACKEND_URL_BASE;

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

  const user = useContext(AuthContext);

  const handleAddContact = async (userInfo: NewContact) => {
    try {
      await axios.post(
        `${BACKEND_URL_BASE}/contact`,
        { ...userInfo, userId: `${user?.currentUser?.id}` },
        {
          withCredentials: true,
        },
      );

      toast.success("New contact added to you contac list");
      reset();
    } catch (error) {
      toast.error("Contact email Invalid");
      console.error(error);
    }
  };
  return (
    <form
      onSubmit={handleSubmit((userInfo) => handleAddContact(userInfo))}
      className="h-[calc(100%-57px)] w-full flex-col md:w-96 md:p-4"
    >
      <fieldset className="mx-2 flex flex-col p-1.5 md:mx-0 md:rounded-md md:border md:border-gray-300 md:p-4">
        <legend className="pl-1.5 text-lg font-medium md:pl-1">
          New Contact
        </legend>
        <label htmlFor="email" className="flex flex-col text-primaryTextColor">
          Name
        </label>
        <input
          {...register("contactName")}
          type="text"
          className="input"
          placeholder="Enter new contact name"
        />
        <span className="mb-1 h-7 text-sm text-red-500">
          {errors.contactName?.message && <p>{errors.contactName.message}</p>}
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
          placeholder="Enter new contact email"
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
          <button
            onClick={() => {
              reset();
            }}
            className="rounded-md border border-primaryColor px-4 py-2 text-primaryColor"
          >
            Cancel
          </button>
        </div>
      </fieldset>
    </form>
  );
};
