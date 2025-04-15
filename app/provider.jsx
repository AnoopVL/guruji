"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // useRouter from 'next/navigation'
import { supabase } from "@/services/supabaseClient";
import { UserDetailContext } from "./context/UserDetailContext";

function Provider({ children }) {
  const [user, setUser] = useState(null);
  const router = useRouter();
  useEffect(() => {
    CreateNewUser();
  }, []);

  const CreateNewUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      router.replace("/auth");
      return;
    }
    const { data: Users, error: fetchError } = await supabase
      .from("Users")
      .select("*")
      .eq("email", user.email);
    if (fetchError) {
      console.error("Error fetching user:", fetchError);
      return;
    }
    if (Users?.length === 0) {
      const { data: newUser, error: insertError } = await supabase
        .from("Users")
        .insert([
          {
            name: user.user_metadata?.name,
            email: user.email,
            picture: user.user_metadata?.picture,
          },
        ])
        .select();
      if (insertError) {
        console.error("Error inserting user:", insertError);
        return;
      }
      setUser(newUser[0]);
    } else {
      setUser(Users[0]);
    }
  };

  return (
    <>
      <UserDetailContext value={(user, setUser)}>{children}</UserDetailContext>
    </>
  );
}

export default Provider;
