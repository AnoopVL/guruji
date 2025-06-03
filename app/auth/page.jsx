// app/auth/page.jsx
"use client";
import React from "react";
import Image from "next/image";
import { supabase } from "@/services/supabaseClient";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

function Login() {
  // Use window.location.origin to get the current domain dynamically
  const getRedirectUrl = () => {
    if (typeof window !== "undefined") {
      return `${window.location.origin}/dashboard`;
    }
    // Fallback for SSR (though this component is client-side)
    return `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard`;
  };

  const SignInWithGoogle = async () => {
    const redirectTo = getRedirectUrl();
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo,
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
        scopes: "openid email profile",
      },
    });
    if (error) {
      console.error("Error", error.message);
    }
  };

  const SignInWithGithub = async () => {
    const redirectTo = getRedirectUrl();
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: { redirectTo },
    });
    if (error) {
      console.error("Error", error.message);
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center h-screen items-center ">
        {/* card  */}
        <div className="flex flex-col items-center space-y-4 border rounded-lg p-4 shadow-md w-full max-w-md">
          <div className="flex flex-row items-center p-3">
            <div className="text-3xl">Get Started with</div>
            <Image
              src="/gurujiLogoSm.png"
              alt="logo small"
              width={40}
              height={40}
            />
            <div className="text-2xl text-green-700">GURUJI</div>
          </div>
          <div className="flex justify-center">
            <img
              src="aiInterviewTrans.png"
              alt="ImageInterview"
              height={200}
              width={600}
            />
          </div>
          {/* auth div  */}
          <Button
            onClick={SignInWithGoogle}
            variant="outline"
            className="w-full">
            <FcGoogle className="mr-2 size-5" />
            Login with Google
          </Button>
          <div className="text-center text-sm text-muted-foreground">or</div>
          <Button
            onClick={SignInWithGithub}
            variant="outline"
            className="w-full">
            <FaGithub className="mr-2 size5"></FaGithub>
            Login with Github
          </Button>
        </div>
      </div>
    </>
  );
}

export default Login;
