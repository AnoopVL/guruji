"use client";
import React from "react";
import { Video, Phone } from "lucide-react";
import Link from "next/link";

function CreateOptions() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-5">
      {/* Create Interview Card */}
      <Link
        href="dashboard/create-interview"
        className="group relative overflow-hidden backdrop-blur-sm bg-card/80 dark:bg-card/70 rounded-xl border border-border/50 p-6 transition-all duration-200 hover:shadow-lg hover:border-border/80">
        <div className="relative z-10 flex flex-col space-y-4">
          <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-gradient-to-br from-primary/10 to-primary/30 text-primary dark:from-primary/20 dark:to-primary/40">
            <Video className="h-6 w-6" />
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-card-foreground">
              Create New Interview
            </h2>
            <p className="text-sm text-muted-foreground">
              Create AI interviews and schedule them with candidates.
            </p>
          </div>
        </div>

        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent dark:from-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </Link>

      {/* Phone Screening Card */}
      <div className="relative group">
        <div className="overflow-hidden backdrop-blur-sm bg-card/80 dark:bg-card/70 rounded-xl border border-border/50 p-6">
          <div className="relative z-10 flex flex-col space-y-4">
            <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-gradient-to-br from-primary/10 to-primary/30 text-primary dark:from-primary/20 dark:to-primary/40">
              <Phone className="h-6 w-6" />
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-card-foreground">
                Create Phone Screening Call
              </h2>
              <p className="text-sm text-muted-foreground">
                Schedule phone screening calls with potential candidates.
              </p>
            </div>
          </div>
        </div>

        {/* Coming Soon Overlay */}
        <div className="absolute inset-0 backdrop-blur-[2px] bg-background/80 dark:bg-background/90 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
          <span className="text-lg font-medium text-primary animate-in fade-in slide-in-from-bottom-4 duration-300">
            Feature coming soon
          </span>
        </div>
      </div>
    </div>
  );
}

export default CreateOptions;
