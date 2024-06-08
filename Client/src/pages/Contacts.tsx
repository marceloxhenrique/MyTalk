import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export default function Contacts() {
  const userInfo = useContext(AuthContext);

  return (
    <>
      <h1>Contacts</h1>
      <p>{userInfo?.currentUser?.email}</p>
      <p>{userInfo?.currentUser?.id}</p>
    </>
  );
}
