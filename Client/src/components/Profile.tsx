import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthContext } from "@/contexts/AuthContext";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { User } from "lucide-react";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import z from "zod";
const BACKEND_URL_BASE = import.meta.env.VITE_BACKEND_URL_BASE;

const schemaUpdateUser = z.object({
  newUserName: z
    .string()
    .min(1, { message: "Name must have at least one character." }),
});

export function Profile() {
  const user = useContext(AuthContext);
  type NewUserName = z.infer<typeof schemaUpdateUser>;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewUserName>({
    resolver: zodResolver(schemaUpdateUser),
  });

  async function updateUserName(userName: NewUserName) {
    try {
      await axios.post(
        `${BACKEND_URL_BASE}/updateuser/${user?.currentUser?.id}`,
        { userName },
        {
          withCredentials: true,
        },
      );
      if (user?.currentUser) {
        user?.setCurrentUser({
          ...user.currentUser,
          userName: userName.newUserName,
        });
      }
      toast.success("User name update successfuly!");
    } catch (error) {
      console.error(error);
      toast.error("Fail user name could not be updated!");
    }
  }
  return (
    <Dialog>
      <DialogTrigger
        asChild
        className="w-full items-center rounded-sm p-1.5 text-sm font-normal hover:bg-primaryColorlt"
      >
        <button className="bg-red-5 flex">
          <User className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </button>
      </DialogTrigger>
      <DialogContent className="rounded-sm sm:max-w-[80em]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit((userName) => updateUserName(userName))}>
          <div className="grid gap-4 py-2">
            <div className="grid grid-cols-4 items-center gap-1 p-1">
              <Label htmlFor="name" className="">
                Name:
              </Label>
              <Input
                id="name"
                defaultValue={user?.currentUser?.userName}
                placeholder="Enter your name"
                className="col-span-3 outline-primaryColor"
                {...register("newUserName")}
              />
              <span className="col-span-3 col-start-2 mb-1 h-7 text-sm text-red-500">
                {errors.newUserName?.message && (
                  <p>{errors.newUserName.message}</p>
                )}
              </span>
            </div>
          </div>
          <div className="grid gap-4 py-2">
            <div className="grid grid-cols-4 items-center gap-4 p-1">
              <Label htmlFor="name" className="">
                Email:
              </Label>
              <p>{user?.currentUser?.email}</p>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" className="bg-primaryColor hover:bg-blue-500">
              Save changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
