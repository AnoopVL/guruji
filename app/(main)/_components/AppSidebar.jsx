// app/(main)/_components/AppSidebar.jsx
"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { FaPlus } from "react-icons/fa";
import { SidebarOptions } from "@/services/Constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

export function AppSidebar() {
  const path = usePathname();

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex flex-col space-y-3 justify-center items-center">
          <div className="flex flex-row items-center space-x-1 p-3">
            <Image
              src="/gurujiLogoSm.png"
              alt="logo small"
              width={40}
              height={40}
            />
            <div className="text-2xl text-green-700">GURUJI</div>
          </div>
          <Button variant="default">
            <FaPlus />
            Create New Interview
          </Button>
        </div>
      </SidebarHeader>
      <SidebarContent className="list-none">
        <SidebarGroup>
          {SidebarOptions.map((option, index) => (
            <SidebarMenuItem key={index} className="p-1">
              <SidebarMenuButton
                asChild
                className={`p-5 ${path === option.path ? "bg-green-100" : ""}`}>
                <Link
                  href={option.path}
                  className="flex items-center space-x-2">
                  <option.icon
                    className={path === option.path ? "text-green-700" : ""}
                  />
                  <span
                    className={`text-[16px] ${
                      path === option.path ? "text-green-700" : ""
                    }`}>
                    {option.name}
                  </span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter />
    </Sidebar>
  );
}
