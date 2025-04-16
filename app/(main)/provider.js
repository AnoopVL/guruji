// (main)/provider.js
import React from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./_components/AppSidebar";

function DashboardProvider({ children }) {
  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <SidebarTrigger />
        <div>{children}</div>
      </SidebarProvider>
    </>
  );
}

export default DashboardProvider;
