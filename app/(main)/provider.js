// (main)/provider.js
import React from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import WelcomeContainer from "./dashboard/_components/WelcomeContainer";
import { AppSidebar } from "./_components/AppSidebar";

function DashboardProvider({ children }) {
  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <div className="w-full">
          {/* <SidebarTrigger /> */}
          <div className="p-5">
          <WelcomeContainer />
          </div>
          {children}
        </div>
      </SidebarProvider>
    </>
  );
}

export default DashboardProvider;
