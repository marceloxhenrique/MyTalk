import axios from "axios";
import { LogOut } from "lucide-react";
import { AuthContext } from "@/contexts/AuthContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Profile } from "./Profile";

const BACKEND_URL_BASE = import.meta.env.VITE_BACKEND_URL_BASE;

export const Header = () => {
  const navigate = useNavigate();
  const user = useContext(AuthContext);
  const handleLogout = async () => {
    try {
      await axios.get(`${BACKEND_URL_BASE}/logout`, {
        withCredentials: true,
      });
      user?.logOut();
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <header className="top-0 z-10 flex h-[57px] items-center justify-between border-b border-gray-300 px-4">
      <img src="/MyTalkLogo.png" alt="MyTalk Logo" className="w-28" />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="h-10 w-10 rounded-full bg-primaryColor text-secondaryColor">
            {user?.currentUser?.email?.slice(0, 1).toUpperCase()}
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>{user?.currentUser?.email}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <Profile />
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout} className="font-normal">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};
