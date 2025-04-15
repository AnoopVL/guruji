// app/services/Constants.jsx
import { Calendar } from "lucide-react";
import { LayoutDashboard } from "lucide-react";
import { RxHamburgerMenu } from "react-icons/rx";
import { CiCreditCard1 } from "react-icons/ci";
import { Settings } from "lucide-react";

export const SidebarOptions = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    name: "Schedule Interview",
    icon: Calendar,
    path: "/schedule-interview",
  },
  {
    name: "All Interviews",
    icon: RxHamburgerMenu,
    path: "/all-interviews",
  },
  {
    name: "Billing",
    icon: CiCreditCard1,
    path: "/billing",
  },
  {
    name: "Settings",
    icon: Settings,
    path: "/settings",
  },
];
