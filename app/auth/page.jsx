"use client";
import React from "react";
import { supabase } from "@/services/supabaseClient";
import { Button } from "@/components/ui/button";

function Login() {
  const SignInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
    if (error) {
      console.error("Error", error.message);
    }
  };
  const SignInWithGithub = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "github",
    });
    if (error) {
      console.error("Error", error.message);
    }
  };
  return (
    <>
      <div className="flex flex-col justify-center h-screen items-center space-y-1">
        <div>
          <Button onClick={SignInWithGoogle}>Login with Google</Button>
        </div>
        <div>
          <Button onClick={SignInWithGithub}>Login with Github</Button>
        </div>
      </div>
    </>
  );
}

export default Login;
