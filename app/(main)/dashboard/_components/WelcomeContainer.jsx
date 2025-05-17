// app/(main)/dashboard/_components/WelcomeContainer.jsx
"use client";
import React from "react";
import { useUser } from "@/app/provider";
import Image from "next/image";
import UserMenu from "./UserMenu";

function WelcomeContainer() {
  const { user } = useUser();

  return (
    <>
      <div className="bg-gray-100 mr-5 rounded-2xl p-5 flex justify-between items-center">
        <div>
          <h2 className="text-lg font-bold">Welcome back, {user?.name}!</h2>
          <h2 className="text-grey-500">
            AI-Driven interviews are just a few clicks away.
          </h2>
        </div>
        {user && <UserMenu />}
      </div>
    </>
  );
}

export default WelcomeContainer;
