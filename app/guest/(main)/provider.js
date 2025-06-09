import React from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import GuestWelcomeContainer from "./dashboard/_components/GuestWelcomeContainer";
import { GuestAppSidebar } from "./_components/GuestAppSidebar";

function GuestDashboardProvider({ children }) {
  return (
    <>
      <SidebarProvider>
        <GuestAppSidebar />
        <div className="w-full">
          {/* <SidebarTrigger /> */}
          <div className="p-5">
            <GuestWelcomeContainer />
          </div>
          {children}
        </div>
      </SidebarProvider>
    </>
  );
}

export default GuestDashboardProvider;
