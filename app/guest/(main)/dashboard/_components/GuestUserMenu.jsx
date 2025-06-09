// app/guest/(main)/dashboard/_components/GuestUserMenu.jsx
import { useRouter } from "next/navigation";
import { User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

export default function GuestUserMenu() {
  const router = useRouter();

  const handleSignupRoute = () => {
    router.push("/auth");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center justify-center h-12 w-12 rounded-full bg-gradient-to-br from-primary/10 to-primary/30 text-primary dark:from-primary/20 dark:to-primary/40">
          <User className="h-6 w-6 cursor-pointer" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel>Wanna unlock all features?</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignupRoute}>
          Sign up now
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
