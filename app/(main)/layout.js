// (main)/layout.js
import React from "react";
import DashboardProvider from "./provider";
import { Toaster } from "@/components/ui/sonner";

function DashboardLayout({ children }) {
  return (
    <div>
      <DashboardProvider>
        {/* <div className="p-5"></div> */}
        {children}
        <Toaster />
      </DashboardProvider>
    </div>
  );
}

export default DashboardLayout;
