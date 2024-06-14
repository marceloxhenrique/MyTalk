import { createContext, useState } from "react";

type User = {
  email: string | undefined;
  id: string | undefined;
};

type AuthContextType = {
  currentUser: User | undefined;
  login: (user: User) => void;
};
export const AuthContext = createContext<AuthContextType | null>(null);

export default function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentUser, setCurrentUser] = useState<User>();

  const login = (user: User): void => {
    setCurrentUser({ id: user.id, email: user.email });
  };
  return (
    <AuthContext.Provider value={{ currentUser, login }}>
      {children}
    </AuthContext.Provider>
  );
}
