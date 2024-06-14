import { useState } from "react";
import Login from "../components/Login";
import Signup from "../components/Signup";
import "animate.css";
export default function Home() {
  const [toggleForm, setToggleForm] = useState(true);
  return (
    <main
      className={`flex h-screen w-full flex-col bg-secondaryColor transition-all duration-100 lg:flex-row lg:px-36`}
    >
      <section className="animate__animated animate__slideInLeft flex w-full items-center justify-center lg:h-screen">
        <img
          src="/MyTalkLogo.png"
          alt="MytalkLogo"
          className="hidden transition-all duration-300 ease-linear hover:drop-shadow-[0px_0px_30px_#2363e3b8] lg:block"
        />
      </section>
      <section className="flex h-screen w-full flex-col items-center justify-center bg-secondaryColor">
        <h1 className="mb-6 text-5xl font-extrabold text-primaryColor transition-all duration-1000 md:text-7xl lg:hidden">
          MyTalk
        </h1>
        {toggleForm ? (
          <Login toggleForm={toggleForm} setToggleForm={setToggleForm} />
        ) : (
          <Signup toggleForm={toggleForm} setToggleForm={setToggleForm} />
        )}
      </section>
    </main>
  );
}
