"use client"; 
import SignUp from "@/components/Auth/SignUp";
import Breadcrumb from "@/components/Common/Breadcrumb";


const SignupPage = () => {
  return (
    <>
      <Breadcrumb pageName="Sign Up Page" />

      <SignUp />
    </>
  );
};

export default SignupPage;
