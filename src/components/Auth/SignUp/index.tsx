"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from 'react-hot-toast';
import SocialSignUp from "../SocialSignUp";
import Logo from "@/components/Layout/Header/Logo";
import { useContext, useState } from "react";
import Loader from "@/components/Common/Loader";
import AuthDialogContext from "@/app/context/AuthDialogContext";

type SignUpProps = {
  signUpOpen?: (open: boolean) => void;
};

const SignUp = ({ signUpOpen }: SignUpProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
  });
  const authDialog = useContext(AuthDialogContext);

  // Regex for basic email validation
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // Password strength validation
  const isPasswordStrong = (password: string) => {
    return /[a-z]/.test(password) && /[A-Z]/.test(password) && /[0-9]/.test(password) && password.length >= 8;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted!');
    setLoading(true);

    // Reset errors before validation
    setErrors({
      name: '',
      email: '',
      password: '',
    });

    const data = new FormData(e.currentTarget);
    const finalData = {
      name: data.get("name"),
      email: data.get("email"),
      password: data.get("password"),
    };

    console.log('Final form data:', finalData); // Log the form data

    // Validation before sending data
    let isValid = true;

    // Check if all fields are filled
    if (!finalData.name || !finalData.email || !finalData.password) {
      setErrors(prev => ({
        ...prev,
        name: finalData.name ? '' : 'Name is required.',
        email: finalData.email ? '' : 'Email is required.',
        password: finalData.password ? '' : 'Password is required.',
      }));
      toast.error("Please fill in all fields.");
      console.log('Toast error triggered: Please fill in all fields.');
      setLoading(false);
      return;
    }

    // Validate email format
    if (!emailRegex.test(finalData.email as string)) {
      setErrors(prev => ({
        ...prev,
        email: 'Please enter a valid email address.',
      }));
      isValid = false;
    }

    // Validate password strength
    if (!isPasswordStrong(finalData.password as string)) {
      setErrors(prev => ({
        ...prev,
        password: 'Password must be at least 8 characters long, include uppercase, lowercase, and a number.',
      }));
      isValid = false;
    }

    if (!isValid) {
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(finalData),
      });

      console.log("Response status:", res.status); // Log response status

      const errorData = await res.json();
      if (!res.ok) {
        console.log("API Error Data:", errorData); // Log error data if any
        if (errorData.field === "email") {
          setErrors(prev => ({
            ...prev,
            email: errorData.message,
          }));
        } else if (errorData.field === "name") {
          setErrors(prev => ({
            ...prev,
            name: errorData.message,
          }));
        } else {
          toast.error(errorData.message || "An error occurred. Please try again.");
          console.log('Toast error triggered:', errorData.message);
        }
      } else {
        toast.success("Successfully registered.");
        console.log("Registration successful! Redirecting...");

        router.push("/");

        if (signUpOpen) {
          signUpOpen(false);
        }

        setTimeout(() => {
          authDialog?.setIsUserRegistered(false);
        }, 1100);
      }
    } catch (err: any) {
      console.error("Registration error:", err);
      toast.error("An error occurred. Please try again.");
      console.log('Toast error triggered: An error occurred.');
    } finally {
      setLoading(false);
    }
  };


  return (
    <>
      <div className="mb-10 text-center mx-auto inline-block max-w-[160px]">
        <Logo />
      </div>

      <SocialSignUp />

      <span className="z-1 relative my-8 block text-center">
        <span className="-z-1 absolute left-0 top-1/2 block h-px w-full bg-border dark:bg-dark_border"></span>
        <span className="text-body-secondary relative z-10 inline-block bg-white dark:bg-darklight px-3 text-base dark:bg-dark">
          OR
        </span>
      </span>

      <form onSubmit={handleSubmit}>
        <div className="mb-[22px]">
          <input
            type="text"
            placeholder="Name"
            name="name"
            required
            className="w-full rounded-md border border-border dark:border-dark_border border-solid bg-transparent px-5 py-3 text-base text-dark outline-none transition placeholder:text-gray-300 focus:border-primary focus-visible:shadow-none dark:text-white dark:focus:border-primary"
          />
          {errors.name && <p className="text-red-500 text-sm mt-2">{errors.name}</p>}
        </div>

        <div className="mb-[22px]">
          <input
            type="email"
            placeholder="Email"
            name="email"
            required
            className="w-full rounded-md border border-border dark:border-dark_border border-solid bg-transparent px-5 py-3 text-base text-dark outline-none transition placeholder:text-gray-300 focus:border-primary focus-visible:shadow-none dark:text-white dark:focus:border-primary"
          />
          {errors.email && <p className="text-red-500 text-sm mt-2">{errors.email}</p>}
        </div>

        <div className="mb-[22px]">
          <input
            type="password"
            placeholder="Password"
            name="password"
            required
            className="w-full rounded-md border border-border dark:border-dark_border border-solid bg-transparent px-5 py-3 text-base text-dark outline-none transition placeholder:text-gray-300 focus:border-primary focus-visible:shadow-none dark:text-white dark:focus:border-primary"
          />
          {errors.password && <p className="text-red-500 text-sm mt-2">{errors.password}</p>}
        </div>

        <div className="mb-9">
          <button
            type="submit"
            className="flex w-full cursor-pointer items-center justify-center rounded-md bg-primary px-5 py-3 text-base text-white transition duration-300 ease-in-out hover:!bg-darkprimary dark:hover:!bg-darkprimary"
            disabled={loading}
          >
            Sign Up {loading && <Loader />}
          </button>
        </div>
      </form>

      <p className="text-body-secondary mb-4 text-base">
        By creating an account you are agreeing with our{" "}
        <Link href="/#" className="text-primary hover:underline">
          Privacy
        </Link>{" "}
        and{" "}
        <Link href="/#" className="text-primary hover:underline">
          Policy
        </Link>
      </p>

      <p className="text-body-secondary text-base">
        Already have an account?
        <Link
          href="/"
          className="pl-2 text-primary hover:bg-darkprimary hover:underline"
        >
          Sign In
        </Link>
      </p>
    </>
  );
};

export default SignUp;