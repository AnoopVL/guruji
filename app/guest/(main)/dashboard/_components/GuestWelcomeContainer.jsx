// app/guest/(main)/dashboard/_components/WelcomeContainer.jsx
"use client";
import React from "react";
import { useUser } from "@/app/provider";
import { Sparkles, User } from "lucide-react";
import Image from "next/image";
import GuestUserMenu from "./GuestUserMenu";

function GuestWelcomeContainer() {
  return (
    <div className="relative overflow-hidden backdrop-blur-sm bg-card/80 dark:bg-card/70 rounded-xl border border-border/50 shadow-sm p-6 mr-5">
      <div className="flex justify-between items-center relative z-10">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-semibold text-card-foreground">
              Hey There!
            </h2>
            <Sparkles className="h-5 w-5 text-primary animate-in fade-in" />
          </div>
          <p className="text-muted-foreground">
            AI-Driven interviews are just a few clicks away.
          </p>
        </div>
        <GuestUserMenu />
      </div>
      {/* Decorative gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 dark:from-primary/10 dark:to-primary/10" />
    </div>
  );
}

export default GuestWelcomeContainer;
