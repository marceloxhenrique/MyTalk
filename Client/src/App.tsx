import { Toaster } from "react-hot-toast";
import "./App.css";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import Contacts from "./pages/Contacts";
import RequireAuth from "./RequireAuth";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/contacts"
          element={
            <RequireAuth>
              <Contacts />
            </RequireAuth>
          }
        />
      </Routes>
      <Toaster position="top-center" />
    </>
  );
}

export default App;
