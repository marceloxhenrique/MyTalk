import { useState } from "react";
import Login from "../components/Login";
import Signup from "../components/Signup";
import "animate.css";
const Home = () => {
  const [toggleForm, setToggleForm] = useState(true);
  return (
    <main
      className={`w-full h-screen flex flex-col lg:flex-row bg-secondaryColor transition-all duration-100 lg:px-36`}
    >
      <section className="animate__animated animate__slideInLeft lg:h-screen w-full flex justify-center items-center">
        <img src="/MyTalkLogo.png" alt="MytalkLogo" className="hidden lg:block" />
      </section>
      <section className="w-full h-screen flex flex-col justify-center items-center bg-secondaryColor ">
        <h1 className="text-5xl md:text-7xl text-primaryColor font-extrabold lg:hidden mb-6 transition-all duration-1000">
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
};
export default Home;
