import axios from "axios";
import { createContext, useEffect, useState } from "react";

type User = {
  email: string | undefined;
  id: string | undefined;
  userName?: string | undefined;
};

type AuthContextType = {
  currentUser: User | undefined;
  login: (user: User) => void;
  logOut: () => void;
};
const BACKEND_URL_BASE = import.meta.env.VITE_BACKEND_URL_BASE;
export const AuthContext = createContext<AuthContextType | null>(null);

export default function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentUser, setCurrentUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    async function checkUserAuth() {
      const { data } = await axios.get(`${BACKEND_URL_BASE}/authenticateuser`, {
        withCredentials: true,
      });
      setCurrentUser({
        id: data.id,
        email: data.email,
        userName: data.userName,
      });
      console.log(data);
    }
    checkUserAuth();
  }, []);
  const logOut = () => {
    setCurrentUser(undefined);
  };

  const login = (user: User): void => {
    setCurrentUser({ id: user.id, email: user.email });
  };
  return (
    <AuthContext.Provider value={{ currentUser, login, logOut }}>
      {children}
    </AuthContext.Provider>
  );
}
