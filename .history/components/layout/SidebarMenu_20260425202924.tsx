"use client";

import {
    LayoutDashboard,
    Users,
    Settings,
    ShoppingBag,
    BarChart3,
    Bell,
    Image as ImageIcon,
    FileText,
    Shield,
    Database,
    HelpCircle,
} from "lucide-react";

import { NavItem } from "@/lib/types/GlobalTypes";


// --- Navigation Structure ---
export const mainNavItems: NavItem[] = [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    {
        name: "User",
        href: "/admin/users",
        icon: Users,
        children: [
            { name: "All Users", href: "/admin/users", icon: Users },
            { name: "Admins", href: "/admin/users/admins", icon: Shield },
            { name: "Roles & Permissions", href: "/admin/users/roles", icon: Shield },
        ]
    },
    {
        name: "Content",
        href: "/admin/content",
        icon: ImageIcon,
        children: [
            { name: "Banners", href: "/admin/banner", icon: ImageIcon },
            { name: "Navbar", href: "/admin/navbar", icon: Bell, badge: 3 },
            { name: "Pages", href: "/admin/pages", icon: FileText },
        ]
    },
    {
        name: "Nav-menu",
        href: "/admin/nav-menus",
        icon: ShoppingBag,
        children: [
            { name: "Manage Menu", href: "/admin/menus", icon: ShoppingBag },
            { name: "Products", href: "/admin/products", icon: ShoppingBag },
            { name: "Inventory", href: "/admin/inventory", icon: Database },
        ]
    },
    { name: "Analytics", href: "/admin/analytics", icon: BarChart3 },
];

export const systemNavItems: NavItem[] = [
    { name: "Settings", href: "/admin/settings", icon: Settings },
    { name: "Support", href: "/admin/support", icon: HelpCircle },
];
