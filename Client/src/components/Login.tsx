import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Loader2 } from "lucide-react";

const BACKEND_URL_BASE = import.meta.env.VITE_BACKEND_URL_BASE;

const schemaLogin = z.object({
  email: z
    .string()
    .min(1, { message: "This field is obligatory" })
    .email("This is not a valid email."),
  password: z
    .string()
    .min(6, { message: "Password must have at least 6 characters" }),
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
  const [isLoading, setIsLoading] = useState(false);
  async function handleLoginForm(userInfo: LoginFormProps) {
    setIsLoading(true);
    try {
      const result = await axios.post(`${BACKEND_URL_BASE}/login`, userInfo, {
        withCredentials: true,
      });
      if (authContext) {
        authContext.login(result.data);
        setIsLoading(false);
      }
      reset();
      navigate("/chat");
    } catch (error) {
      if (error instanceof Error) {
        toast.error("Email or password invalid!");
        console.error(error);
      }
      setIsLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit((userInfo) => handleLoginForm(userInfo))}
      className="flex w-full max-w-lg flex-col px-4 py-10 md:px-8 lg:rounded-md lg:border lg:border-primaryColor lg:bg-primaryColorlt"
    >
      <h2 className="mb-12 text-2xl font-extrabold text-primaryColor">
        Log in
      </h2>
      <label htmlFor="email" className="flex flex-col text-primaryTextColor">
        Email
      </label>
      <input
        {...register("email")}
        type="text"
        className="input"
        placeholder="Enter your email adress"
        disabled={isLoading}
      />
      <span className="mb-1 h-7 text-sm text-red-500">
        {errors.email?.message && <p>{errors.email.message}</p>}
      </span>
      <label htmlFor="password" className="flex flex-col text-primaryTextColor">
        Password
      </label>
      <input
        {...register("password")}
        type="password"
        name="password"
        className="input"
        placeholder="Enter your password"
        disabled={isLoading}
      />
      <section className="mb-1 h-7 text-sm text-red-500">
        {errors.password?.message && <p>{errors.password.message}</p>}
      </section>
      <button
        type="submit"
        className={`my-2 flex items-center justify-center gap-2 rounded-md bg-primaryColor py-3 text-lg font-semibold text-secondaryTextColor ${isLoading ? "bg-blue-500" : "bg-primaryColor"}`}
        disabled={isLoading}
      >
        {isLoading && <Loader2 className="h-6 w-6 animate-spin" />}
        Log in
      </button>

      <p className="pri mt-5 text-center text-primaryTextColor">
        Need an account?{" "}
        <a
          onClick={() => {
            props.setToggleForm(!props.toggleForm);
          }}
          className="cursor-pointer font-bold text-primaryColor underline"
        >
          Sign up
        </a>
      </p>
    </form>
  );
}
