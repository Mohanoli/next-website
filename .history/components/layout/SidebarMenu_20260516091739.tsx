"use client";

import {
    LayoutDashboard, UsersRound, Info, Barrel, Users, Settings, ShoppingBag, Image as ImageIcon,
    FileText, HelpCircle, Landmark, Banknote, CreditCard, IdCard, Network,
} from "lucide-react";
import { NavItem } from "@/lib/types/GlobalTypes";
import { FaHome } from "react-icons/fa";
import { BiLogoProductHunt } from "react-icons/bi";
import { CgWebsite } from "react-icons/cg";





// --- Navigation Structure ---
export const mainNavItems: NavItem[] = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "User", href: "/admin/users", icon: Users },

    {
        name: "Home",
        href: "/admin/home",
        icon: FaHome,
        children: [
            { name: "Menu Items", href: "/admin/menus", icon: Barrel },
            { name: "Banner", href: "/admin/banner", icon: ImageIcon, badge: 3 },
            { name: "Pages", href: "/admin/pages", icon: FileText },
        ]
    },
    {
        name: "Services",
        href: "/admin/service",
        icon: BiLogoProductHunt,
        children: [
            { name: "Loan", href: "/admin/loan", icon: Landmark },
            { name: "Saving", href: "/admin/saving", icon: Banknote },
            { name: "Share", href: "/admin/share", icon: CreditCard },
            { name: "Insurance", href: "/admin/insurance", icon: IdCard },
            { name: "Others", href: "/admin/others", icon: Network },

        ]
    },

    {
        name: "About",
        href: "/admin/about",
        icon: Info,
        children: [
            { name: "Board Of Directors", href: "/admin/bod", icon: ShoppingBag },
            { name: "Teams", href: "/admin/teams", icon: Users },
            { name: "Committe Members", href: "/admin/committe", icon: UsersRound },
        ]
    },
    { name: "Company-Profile", href: "/admin/company-profile", icon: CgWebsite },
];

export const systemNavItems: NavItem[] = [
    { name: "Settings", href: "/admin/settings", icon: Settings },
    { name: "Support", href: "/admin/support", icon: HelpCircle },
];
