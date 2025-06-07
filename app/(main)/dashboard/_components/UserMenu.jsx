// app/(main)/dashboard/_components/UserMenu.jsx
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useUser } from "@/app/provider";
import { supabase } from "@/services/supabaseClient";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import SignOutAlertConfirmation from "./SignOutAlertConfirmation";

export default function UserMenu() {
  const { user, setUser } = useUser();
  const router = useRouter();
  const [showSignOutDialog, setShowSignOutDialog] = useState(false);

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setUser(null);
      toast.success("Signed out successfully!");
      window.location.href = "/";
    } catch (error) {
      console.error("Error signing out:", error);
      toast.error("Failed to sign out");
    }
  };

  const handleProfile = () => {
    router.replace("/profile");
  };

  if (!user) return null;

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Image
            src={user.picture}
            alt={user.name}
            width={40}
            height={40}
            className="rounded-full cursor-pointer"
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuLabel>{user?.name}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => handleProfile()}>
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setShowSignOutDialog(true)}>
            Sign Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <SignOutAlertConfirmation
        open={showSignOutDialog}
        onOpenChange={setShowSignOutDialog}
        handleSignOut={handleSignOut}
      />
    </>
  );
}
