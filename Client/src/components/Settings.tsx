import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AuthContext } from "@/contexts/AuthContext";
import axios from "axios";
import { SettingsIcon } from "lucide-react";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const BACKEND_URL_BASE = import.meta.env.VITE_BACKEND_URL_BASE;

export function Settings() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const user = useContext(AuthContext);
  const userId = user?.currentUser?.id;
  async function deleteAccount() {
    try {
      await axios.post(
        `${BACKEND_URL_BASE}/deleteaccount`,
        { userId },
        {
          withCredentials: true,
        },
      );
      setOpen(false);
      toast.success(`Account successfuly deleted! 🥲`, {
        duration: 4000,
      });
      user?.logOut();
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("Account could not be deleted");
    }
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        asChild
        className="w-full items-center rounded-sm p-1.5 text-sm font-normal hover:bg-primaryColorlt"
      >
        <button className="bg-red-5 flex">
          <SettingsIcon className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </button>
      </DialogTrigger>
      <DialogContent className="rounded-sm sm:max-w-[80em]">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>
            Make changes to your account here.
          </DialogDescription>
        </DialogHeader>
        <hr />
        <h2 className="text-red-500">Delete account</h2>
        <p>
          Once you delete your account, there is no going back. Please be
          certain.
        </p>
        <section className="items-center">
          <Button variant={"destructive"} onClick={deleteAccount}>
            Delete your account
          </Button>
        </section>
      </DialogContent>
    </Dialog>
  );
}
