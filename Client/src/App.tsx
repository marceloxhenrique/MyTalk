import { Toaster } from "react-hot-toast";
import "./App.css";
import Home from "./pages/Home";
import { Routes, Route, Navigate } from "react-router-dom";
import Messages from "./pages/Messages";
import RequireAuth from "./RequireAuth";
import { useContext } from "react";
import { AuthContext } from "./contexts/AuthContext";
import NotFound from "./pages/NotFound";

const AnonymousRoute = ({ children }: { children: JSX.Element }) => {
  const user = useContext(AuthContext);

  if (!user?.currentUser?.email) {
    return children;
  }
  return <Navigate to={"/contacts"} />;
};

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <AnonymousRoute>
              <Home />
            </AnonymousRoute>
          }
        />
        <Route
          path="/messages"
          element={
            <RequireAuth>
              <Messages />
            </RequireAuth>
          }
        />
        <Route path="/*" element={<NotFound />} />
      </Routes>
      <Toaster position="top-center" />
    </>
  );
}

export default App;