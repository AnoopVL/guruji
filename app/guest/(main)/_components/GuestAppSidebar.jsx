// app/guest/(main)/_components/Guest.jsx
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
import { toast } from "sonner"; // <-- NEW
import { UserPlus } from "lucide-react"; // icon for the extra menu item
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

export function GuestAppSidebar() {
  const path = usePathname();
  const router = useRouter();

  /** Show toast, then navigate */
  const handleMenuClick = (dest) => {
    toast.info("Sign up to unlock all features ✨");
    // router.push(dest);
  };

  return (
    <Sidebar>
      {/* ---------- Header ---------- */}
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

          {/* “Create interview” still sends them to sign-up too */}
          <Button
            variant="default"
            onClick={() => handleMenuClick("/auth")} // <- toast + /auth
          >
            <FaPlus />
            Create New Interview
          </Button>
        </div>
      </SidebarHeader>

      {/* ---------- Main items ---------- */}
      <SidebarContent className="list-none">
        <SidebarGroup>
          {SidebarOptions.map((opt) => (
            <SidebarMenuItem key={opt.path} className="p-1">
              <SidebarMenuButton
                className={`p-5 flex items-center space-x-2 ${
                  path === opt.path ? "bg-green-100" : ""
                }`}
                onClick={() => handleMenuClick(opt.path)}>
                <opt.icon
                  className={path === opt.path ? "text-green-700" : ""}
                />
                <span
                  className={`text-sm ${
                    path === opt.path ? "text-green-700" : ""
                  }`}>
                  {opt.name}
                </span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}

          {/* ---------- Extra “Sign-up now” item ---------- */}
          <SidebarMenuItem className="p-1">
            <SidebarMenuButton
              className="p-5 flex items-center space-x-2 text-primary"
              onClick={() => router.push("/auth")} // direct, no toast
            >
              <UserPlus className="h-4 w-4" />
              <span className="text-sm">Sign up now</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarGroup>
      </SidebarContent>

      {/* ---------- Footer ---------- */}
      <SidebarFooter className="border-t border-border/50 p-4">
        <div className="text-xs text-center text-muted-foreground">
          © 2025 Guruji AI
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
