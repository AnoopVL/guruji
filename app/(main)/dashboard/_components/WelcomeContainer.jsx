// app/(main)/dashboard/_components/WelcomeContainer.jsx
"use client";
import React from "react";
import { useUser } from "@/app/provider";

function WelcomeContainer() {
  const { user } = useUser();
  if (user == null) {
    console.log("no user");
  } else {
    console.log(user.name);
  }

  return (
    <>
      <div className="bg-gray-100 mr-5 rounded-2xl p-5 flex justify-between items-center">
        <div>
          <h2 className="text-lg font-bold">Welcome back, {user?.name}!</h2>
          <h2 className="text-grey-500">
            AI-Driven interviews are just few a clicks away.
          </h2>
          {/* inside next.config.mjs make changes for domain 1.11. */}
          {user && (
            <img
              src="{user?.picture}"
              alt="userAvatar"
              width={40}
              height={40}
              className="rounded-full"
            />
          )}
        </div>
      </div>
    </>
  );
}

export default WelcomeContainer;
