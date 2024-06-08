import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import axios from "axios";
import toast from "react-hot-toast";

const schemaSignUp = z.object({
  email: z
    .string()
    .min(1, { message: "This field is obligatory" })
    .email("This is not a valid email."),
  password: z.string().min(6, { message: "Password must have at least 6 characters" }),
});

const BACKEND_URL_BASE = import.meta.env.VITE_BACKEND_URL_BASE;
export default function Signup(props: {
  toggleForm: boolean;
  setToggleForm: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  type SignupFormProps = z.infer<typeof schemaSignUp>;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignupFormProps>({
    resolver: zodResolver(schemaSignUp),
  });

  async function handleSignupForm(userInfo: SignupFormProps) {
    try {
      await axios.post(`${BACKEND_URL_BASE}/register`, userInfo, {
        withCredentials: true,
      });
      props.setToggleForm(!props.toggleForm);
      toast.success("Account successfully created!");
      reset();
    } catch (error) {
      if (error instanceof Error) {
        toast.error("Email or password invalid!");
        console.error(error);
      }
    }
  }

  return (
    <form
      onSubmit={handleSubmit((userInfo) => {
        handleSignupForm(userInfo);
      })}
      className=" flex flex-col w-full py-10 px-4 md:px-8 max-w-lg  lg:border lg:border-primaryColor lg:rounded-md lg:bg-primaryColorlt"
    >
      <h2 className="text-primaryColor text-2xl mb-12 font-extrabold md:5xl">Sign up</h2>
      <label htmlFor="email" className="flex flex-col text-primaryTextColor">
        Email
      </label>
      <input
        {...register("email")}
        type="text"
        name="email"
        className="input"
        placeholder="Enter your email adress"
      />
      <span className="h-7 text-red-500 mb-1 text-sm">
        {errors.email?.message && <p>{errors.email.message}</p>}
      </span>
      <label htmlFor="password" className="flex flex-col text-primaryTextColor">
        Password
      </label>
      <input
        {...register("password")}
        type="password"
        name="password"
        className="input "
        placeholder="Enter your password"
      />
      <span className="h-7 text-red-500 mb-1 text-sm">
        {errors.password?.message && <p>{errors.password.message}</p>}
      </span>
      <button
        type="submit"
        className="bg-primaryColor rounded-md py-3 my-2 text-secondaryTextColor text-lg font-semibold"
      >
        Sign up
      </button>
      <p className="text-primaryTextColor mt-5 text-center">
        Already have an account?{" "}
        <a
          onClick={() => {
            props.setToggleForm(!props.toggleForm);
          }}
          className="underline text-primaryColor font-bold cursor-pointer"
        >
          Log in
        </a>
      </p>
    </form>
  );
}
