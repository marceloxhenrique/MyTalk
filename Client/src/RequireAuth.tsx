import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function RequireAuth({ children }: { children: JSX.Element }) {
  const currentUser = useContext(AuthContext);

  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    if (!currentUser?.currentUser?.email) {
      return navigate("/");
    } else {
      setLoading(false);
    }
  }, [currentUser, navigate]);

  if (isLoading) {
    return <div className="h-screen w-full">Loading...</div>;
  }

  return children;
}
