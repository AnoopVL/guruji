// app/(main)/dashboard/_components/WelcomeContainer.jsx
"use client";
import React from "react";
import { useUser } from "@/app/provider";
import { Sparkles } from "lucide-react";
import UserMenu from "./UserMenu";

function WelcomeContainer() {
  const { user } = useUser();

  return (
    <div className="relative overflow-hidden backdrop-blur-sm bg-card/80 dark:bg-card/70 rounded-xl border border-border/50 shadow-sm p-6 mr-5">
      <div className="flex justify-between items-center relative z-10">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-semibold text-card-foreground">
              Welcome back, {user?.name}!
            </h2>
            <Sparkles className="h-5 w-5 text-primary animate-in fade-in" />
          </div>
          <p className="text-muted-foreground">
            AI-Driven interviews are just a few clicks away.
          </p>
        </div>
        {user && <UserMenu />}
      </div>
      {/* Decorative gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 dark:from-primary/10 dark:to-primary/10" />
    </div>
  );
}

export default WelcomeContainer;
