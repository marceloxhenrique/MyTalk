import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const BACKEND_URL_BASE = import.meta.env.VITE_BACKEND_URL_BASE;

const schemaLogin = z.object({
  email: z
    .string()
    .min(1, { message: "This field is obligatory" })
    .email("This is not a valid email."),
  password: z.string().min(6, { message: "Password must have at least 6 characters" }),
});

export default function Login(props: {
  toggleForm: boolean;
  setToggleForm: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const navigate = useNavigate();
  type LoginFormProps = z.infer<typeof schemaLogin>;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormProps>({
    resolver: zodResolver(schemaLogin),
  });
  const authContext = useContext(AuthContext);

  async function handleLoginForm(userInfo: LoginFormProps) {
    try {
      const result = await axios.post(`${BACKEND_URL_BASE}/login`, userInfo, {
        withCredentials: true,
      });
      if (authContext) {
        authContext.login(result.data);
      }
      reset();
      navigate("/contacts");
    } catch (error) {
      if (error instanceof Error) {
        toast.error("Email or password invalid!");
        console.error(error);
      }
    }
  }

  return (
    <form
      onSubmit={handleSubmit((userInfo) => handleLoginForm(userInfo))}
      className="flex flex-col w-full px-4 md:px-8 py-10 max-w-lg lg:border lg:border-primaryColor lg:rounded-md lg:bg-primaryColorlt"
    >
      <h2 className="text-primaryColor text-2xl mb-12 font-extrabold">Log in</h2>
      <label htmlFor="email" className="flex flex-col text-primaryTextColor">
        Email
      </label>
      <input
        {...register("email")}
        type="text"
        className="input"
        placeholder="Enter your email adress"
      />
      <span className="h-7 text-red-500 mb-1 text-sm">
        {errors.email?.message && <p>{errors.email.message}</p>}
      </span>
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

      <section className="h-7 text-red-500 mb-1 text-sm ">
        {errors.password?.message && <p>{errors.password.message}</p>}
      </section>
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
            props.setToggleForm(!props.toggleForm);
          }}
          className="underline text-primaryColor font-bold cursor-pointer"
        >
          Sign up
        </a>
      </p>
    </form>
  );
}
