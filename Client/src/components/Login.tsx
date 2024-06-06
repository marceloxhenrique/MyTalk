import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import * as z from "zod";

const schemaLogin = z.object({
  email: z
    .string()
    .min(1, { message: "This field is obligatory" })
    .email("This is not a valid email."),
  password: z.string().min(6, { message: "Password must have at least 6 characters" }),
});

export default function Login() {
  const [toogleForm, setToggleForm] = useState(true);

  type LoginFormProps = z.infer<typeof schemaLogin>;
  function handleLoingForm(userInfo: LoginFormProps) {
    console.log(userInfo);
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormProps>({
    resolver: zodResolver(schemaLogin),
  });

  return (
    <main className="w-full h-screen flex flex-col justify-center  items-center bg-secondaryColor">
      <section className="md:h-screen w-full flex justify-center items-center">
        <img src="/MyTalkLogo.png" alt="MytalkLogo" className="hidden md:block" />
      </section>
      <section className="w-full flex flex-col justify-center items-center bg-secondaryColor">
        <h1 className="text-5xl md:text-7xl text-primaryColor font-extrabold md:hidden">MyTalk</h1>
        <form
          onSubmit={handleSubmit((userInfo) => handleLoingForm(userInfo))}
          className=" flex flex-col w-full px-4 py-6 max-w-lg md:border md:border-blue-500 rounded-md"
        >
          <h2 className="text-primaryColor text-2xl mb-12 font-extrabold">Log in</h2>
          <label htmlFor="email" className="flex flex-col text-primaryTextColor font-semibold">
            Email
          </label>
          <input
            {...register("email")}
            type="text"
            className="input"
            placeholder="Enter your email adress"
          />
          {errors.email?.message && <p>{errors.email.message}</p>}
          <label htmlFor="password" className="flex flex-col text-primaryTextColor ">
            Password
          </label>
          <input
            {...register("password")}
            type="password"
            name="password"
            className="input"
            placeholder="Enter your password"
          />
          {errors.password?.message && <p>{errors.password.message}</p>}
          <button
            type="submit"
            className="bg-primaryColor rounded-md py-3 my-2 text-secondaryTextColor text-lg font-semibold"
          >
            Log in
          </button>
          <p className="text-primaryTextColor mt-5 text-center">
            Need an account?{" "}
            <a
              onClick={() => {
                setToggleForm(!toogleForm);
              }}
              className="underline text-primaryColor font-bold cursor-pointer"
            >
              Sign up
            </a>
          </p>
        </form>
      </section>
    </main>
  );
}
