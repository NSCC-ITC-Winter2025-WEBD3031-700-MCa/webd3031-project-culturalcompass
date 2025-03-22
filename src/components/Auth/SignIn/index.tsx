"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useContext, useState } from "react";
import SocialSignIn from "../SocialSignIn";
import Logo from "@/components/Layout/Header/Logo";
import AuthDialogContext from "@/app/context/AuthDialogContext";
import { useRouter } from "next/navigation"; // Import useRouter for redirecting

interface SigninProps {
  signInOpen?: (open: boolean) => void;
}

const Signin = ({ signInOpen }: SigninProps) => {
  const [email, setEmail] = useState<string>(""); // Using email instead of username
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false); // Track loading state
  const [error, setError] = useState<string | null>(null); // Track error message
  const authDialog = useContext(AuthDialogContext);
  const router = useRouter(); // Router hook for redirection

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true); // Start loading
    setError(null); // Clear previous errors
    const result = await signIn("credentials", {
      redirect: false,
      email, // Send email instead of username
      password,
    });

    setLoading(false); // End loading

    // Handle the result of the sign-in
    if (result?.status === 200) {
      // Close dialog after successful login
      setTimeout(() => {
        signInOpen?.(false);
      }, 1200);

      authDialog?.setIsSuccessDialogOpen(true);
      setTimeout(() => {
        authDialog?.setIsSuccessDialogOpen(false);
      }, 1100);

      // Clear fields after success
      setEmail("");
      setPassword("");

      // Redirect to homepage (or another page if needed)
      router.push("/"); // Example redirection to home page
    } else {
      // Handle errors and set the error state
      setError(result?.error || "Login failed. Please try again.");
    }
  };

  return (
    <>
      <div className="mb-10 text-center mx-auto inline-block max-w-[160px]">
        <Logo />
      </div>

      <SocialSignIn />

      <span className="z-1 relative my-8 block text-center">
        <span className="-z-1 absolute left-0 top-1/2 block h-px w-full bg-border dark:bg-dark_border"></span>
        <span className="text-body-secondary relative z-10 inline-block bg-white px-3 text-base dark:bg-darklight">
          OR
        </span>
      </span>

      <form onSubmit={handleSubmit}>
        <div className="mb-[22px]">
          <input
            type="email" // Using email input instead of text
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md border placeholder:text-gray-400 border-border dark:border-dark_border border-solid bg-transparent px-5 py-3 text-base text-dark outline-none transition focus:border-primary focus-visible:shadow-none dark:border-border_color dark:text-white dark:focus:border-primary"
          />
        </div>
        <div className="mb-[22px]">
          <input
            type="password"
            required
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-md border border-border dark:border-dark_border border-solid bg-transparent px-5 py-3 text-base text-dark outline-none transition focus:border-primary focus-visible:shadow-none dark:border-border_color dark:text-white dark:focus:border-primary"
          />
        </div>

        {error && (
          <div className="text-red-500 text-sm mb-4">
            {error} {/* Display error message */}
          </div>
        )}

        <div className="mb-9">
          <button
            type="submit"
            disabled={loading} // Disable button when loading
            className="flex w-full cursor-pointer items-center justify-center rounded-md border border-primary bg-primary hover:bg-darkprimary dark:hover:!bg-darkprimary px-5 py-3 text-base text-white transition duration-300 ease-in-out "
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </div>
      </form>

      <Link
        href="/"
        className="mb-2 inline-block text-base text-dark hover:text-primary dark:text-white dark:hover:text-primary"
      >
        Forget Password?
      </Link>
      <p className="text-body-secondary text-base">
        Not a member yet?{" "}
        <Link href="/" className="text-primary hover:underline">
          Sign Up
        </Link>
      </p>
    </>
  );
};

export default Signin;