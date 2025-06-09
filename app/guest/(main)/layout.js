import React from "react";
import { Toaster } from "@/components/ui/sonner";
import GuestDashboardProvider from "./provider";

function GuestDashboardLayout({ children }) {
  return (
    <div>
      <GuestDashboardProvider>
        {/* <div className="p-5"></div> */}
        {children}
        <Toaster />
      </GuestDashboardProvider>
    </div>
  );
}

export default GuestDashboardLayout;
