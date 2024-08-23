import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";
import { Loader2 } from "lucide-react";

const schemaSignUp = z.object({
  email: z
    .string()
    .min(1, { message: "This field is obligatory" })
    .email("This is not a valid email."),
  password: z
    .string()
    .min(6, { message: "Password must have at least 6 characters" }),
});

const BACKEND_URL_BASE = import.meta.env.VITE_BACKEND_URL_BASE;
export default function Signup(props: {
  toggleForm: boolean;
  setToggleForm: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  type SignupFormProps = z.infer<typeof schemaSignUp>;
  const [displayMessageAccountCreated, setDisplayMessageAccountCreated] =
    useState<boolean>(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignupFormProps>({
    resolver: zodResolver(schemaSignUp),
  });
  const [isLoading, setIsLoading] = useState(false);
  async function handleSignupForm(userInfo: SignupFormProps) {
    setIsLoading(true);
    try {
      await axios.post(`${BACKEND_URL_BASE}/register`, userInfo, {
        withCredentials: true,
      });
      setDisplayMessageAccountCreated(true);
      reset();
      setIsLoading(false);
    } catch (error) {
      if (error instanceof Error) {
        toast.error("Email or password invalid!");
        console.error(error);
      }
      setIsLoading(false);
    }
  }

  return displayMessageAccountCreated ? (
    <section className="flex w-full max-w-lg flex-col px-4 py-10 md:px-8 lg:rounded-md lg:border lg:border-primaryColor lg:bg-primaryColorlt">
      <h2 className="md:5xl mb-12 text-2xl font-medium text-primaryColor">
        Account successfully created!
      </h2>

      <a
        onClick={() => {
          props.setToggleForm(!props.toggleForm);
        }}
        className="cursor-pointer font-bold underline"
      >
        <p>Return to login</p>
      </a>
    </section>
  ) : (
    <form
      onSubmit={handleSubmit((userInfo) => {
        handleSignupForm(userInfo);
      })}
      className="flex w-full max-w-lg flex-col px-4 py-10 md:px-8 lg:rounded-md lg:border lg:border-primaryColor lg:bg-primaryColorlt"
    >
      <h2 className="md:5xl mb-12 text-2xl font-extrabold text-primaryColor">
        Sign up
      </h2>
      <label htmlFor="email" className="flex flex-col text-primaryTextColor">
        Email
      </label>
      <input
        {...register("email")}
        type="text"
        name="email"
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
      <span className="mb-1 h-7 text-sm text-red-500">
        {errors.password?.message && <p>{errors.password.message}</p>}
      </span>
      <button
        type="submit"
        className={`my-2 flex items-center justify-center gap-2 rounded-md bg-primaryColor py-3 text-lg font-semibold text-secondaryTextColor ${isLoading ? "bg-blue-500" : "bg-primaryColor"}`}
        disabled={isLoading}
      >
        {isLoading && <Loader2 className="h-6 w-6 animate-spin" />}
        Sign up
      </button>
      <p className="mt-5 text-center text-primaryTextColor">
        Already have an account?{" "}
        <a
          onClick={() => {
            props.setToggleForm(!props.toggleForm);
          }}
          className="cursor-pointer font-bold text-primaryColor underline"
        >
          Log in
        </a>
      </p>
    </form>
  );
}
