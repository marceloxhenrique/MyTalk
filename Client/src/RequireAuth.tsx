import { useContext } from "react";
import { AuthContext } from "./contexts/AuthContext";
import { Navigate } from "react-router-dom";

export default function RequireAuth({ children }: { children: JSX.Element }) {
  const currentUser = useContext(AuthContext);
  if (!currentUser) {
    return <Navigate to={"/"} />;
  }
  return children;
}
