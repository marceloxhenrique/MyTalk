import { useContext, useEffect } from "react";
import { AuthContext } from "./contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function RequireAuth({ children }: { children: JSX.Element }) {
  const currentUser = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser?.currentUser?.email) {
      return navigate("/");
    }
  }, [currentUser, navigate]);
  return children;
}
