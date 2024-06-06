import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
const schemaSignUp = z.object({
  email: z
    .string()
    .min(1, { message: "This field is obligatory" })
    .email("This is not a valid email."),
  password: z.string().min(6, { message: "Password must have at least 6 characters" }),
});

export default function Signup() {
  type SignupFormProps = z.infer<typeof schemaSignUp>;
  function handleSignupForm(userInfo: SignupFormProps) {
    console.log(userInfo);
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormProps>({
    resolver: zodResolver(schemaSignUp),
  });

  return (
    <form
      onSubmit={handleSubmit((userInfo) => {
        handleSignupForm(userInfo);
      })}
      className=" flex flex-col w-full py-6 px-4 max-w-lg md:border md:border-blue-500 rounded-md md:bg-primaryColorlt"
    >
      <h2 className="text-primaryColor text-2xl mb-12 font-extrabold md:5xl">Sign up</h2>
      <label htmlFor="email" className="flex flex-col text-primaryTextColor font-semibold">
        Email
      </label>
      <input
        {...register("email")}
        type="text"
        name="email"
        className="input"
        placeholder="Enter your email adress"
      />
      {errors.email?.message && <p>{errors.email.message}</p>}
      <label htmlFor="password" className="flex flex-col text-primaryTextColor">
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
        Sign up
      </button>
      <p className="text-primaryTextColor mt-5 text-center">
        Already have an account?{" "}
        <a onClick={() => {}} className="underline text-primaryColor font-bold cursor-pointer">
          Log in
        </a>
      </p>
    </form>
  );
}
