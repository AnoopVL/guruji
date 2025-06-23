// app/provider.jsx
"use client";
import { useContext, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/services/supabaseClient";
import { UserDetailContext } from "./context/UserDetailContext";

function Provider({ children }) {
  const [user, setUser] = useState(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    CreateNewUser();
  }, []);

  const CreateNewUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const publicRoutes = ["/", "/auth", "/interview", "/guest"];
    const isPublicRoute = publicRoutes.some(
      (route) => pathname === route || pathname.startsWith(route + "/")
    );

    if (!user) {
      if (!isPublicRoute) {
        router.replace("/auth");
      }
      return;
    }

    // If the user is already logged in and is on a public route, redirect to /dashboard
    if (user && ["/auth"].includes(pathname)) {
      router.replace("/dashboard");
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
    <UserDetailContext.Provider value={{ user, setUser }}>
      {children}
    </UserDetailContext.Provider>
  );
}

export default Provider;
export const useUser = () => {
  const context = useContext(UserDetailContext);
  return context;
};
