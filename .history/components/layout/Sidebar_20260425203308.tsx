"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { ChevronDown, Menu as MenuIcon, PanelLeft, PanelLeftClose } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { NavItem, SidebarProps } from "@/lib/types/GlobalTypes";
import { mainNavItems, systemNavItems } from "./SidebarMenu";
import Image from "next/image";

// --- Optimized NavItem Component ---
const NavItemComponent = ({
    item,
    isActive,
    isCollapsed,
    depth = 0
}: {
    item: NavItem;
    isActive: boolean;
    isCollapsed: boolean;
    depth?: number;
}) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const pathname = usePathname();
    const hasChildren = item.children && item.children.length > 0;
    const isChildActive = hasChildren && item.children?.some(child => pathname === child.href);

    // Auto-expand if child is active (for better UX)
    useEffect(() => {
        if (isChildActive && !isCollapsed) {
            setIsExpanded(true);
        }
    }, [isChildActive, isCollapsed]);

    // Collapsed mode: icon only with tooltip
    if (isCollapsed) {
        return (
            <div className="relative group">
                <Link
                    href={hasChildren ? '#' : item.href}
                    onClick={() => hasChildren && setIsExpanded(!isExpanded)}
                    className={`relative flex items-center justify-center p-3 mx-2 rounded-xl transition-all duration-200 ${isActive || isChildActive
                        ? "bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400"
                        : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                        }`}>
                    <item.icon size={22} className="shrink-0" />
                    {item.badge && (
                        <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-white dark:ring-slate-900">
                            {item.badge > 9 ? '9+' : item.badge}
                        </span>
                    )}
                </Link>

                {/* Tooltip */}
                <div className="absolute left-full ml-3 px-3 py-2 bg-slate-800 dark:bg-slate-700 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 pointer-events-none shadow-lg">
                    {item.name}
                    <div className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 border-4 border-transparent border-r-slate-800 dark:border-r-slate-700" />
                </div>
            </div>
        );
    }

    // Expanded mode: full item with text
    return (
        <div className="mb-1">
            <button
                onClick={() => hasChildren && setIsExpanded(!isExpanded)}
                className={`w-full flex items-center justify-between group px-4 py-2 rounded-lg text-[13.5px] font-medium transition-all duration-200 ${isActive || isChildActive
                    ? "bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400"
                    : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                    }`}>
                <div className="flex items-center gap-3">
                    <item.icon size={20} className="shrink-0" />
                    <span className="truncate">{item.name}</span>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                    {item.badge && (
                        <span className="px-1.5 py-0.5 bg-red-500 text-white text-[10px] font-bold rounded-full min-w-20px text-center">
                            {item.badge > 99 ? '99+' : item.badge}
                        </span>
                    )}
                    {hasChildren && (
                        <motion.div
                            animate={{ rotate: isExpanded ? 180 : 0 }}
                            transition={{ duration: 0.2 }}>
                            <ChevronDown size={16} className="text-slate-400" />
                        </motion.div>
                    )}
                </div>
            </button>

            {/* Submenu with smooth animation */}
            <AnimatePresence initial={false}>
                {hasChildren && isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2, ease: 'easeInOut' }}
                        className="overflow-hidden ml-2 pl-1 dark:border-slate-700 mt-1 space-y-1">
                        {item.children?.map((child) => {
                            const isChildActive = pathname === child.href;
                            return (
                                <Link
                                    key={child.name}
                                    href={child.href}
                                    className={`flex items-center gap-3 px-4 py-1.5 rounded-lg text-[12.5px] transition-all duration-200 ${isChildActive
                                        ? "text-white dark:text-teal-400 bg-teal-50 dark:bg-teal-900/30"
                                        : "text-white dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800"
                                        }`}>
                                    <child.icon size={16} className="shrink-0" />
                                    <span className="truncate">{child.name}</span>
                                </Link>
                            );
                        })}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

// --- Main Sidebar Component ---
export const Sidebar = ({ isCollapsed: initialCollapsed = false }: SidebarProps) => {
    const [isCollapsed, setIsCollapsed] = useState(initialCollapsed);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const pathname = usePathname();
    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    // Sidebar content that will be used in both desktop and mobile
    const SidebarContent = ({ isMobile = false }) => (
        <div className="h-full flex flex-col bg-white dark:bg-slate-900">
            {/* Header with smooth transitions */}
            <div className={`
                relative flex items-center gap-3 p-3 border-b border-slate-200 dark:border-slate-800
                ${isMobile ? 'justify-between' : (isCollapsed ? 'justify-center' : 'justify-between')}
            `}>
                {/* Logo and Title - with smooth hide/show */}
                <motion.div
                    className="flex items-center gap-3 overflow-hidden"
                    animate={{
                        width: (isMobile || !isCollapsed) ? 'auto' : 0,
                        opacity: (isMobile || !isCollapsed) ? 1 : 0,
                    }}
                    transition={{ duration: 0.2, ease: 'easeInOut' }}>
                    <div className="relative w-10 h-10 shrink-0">
                        <Image
                            src="/logo.png"
                            alt="Logo"
                            fill
                            className="object-contain"
                            priority />
                    </div>
                    <motion.h1
                        className="text-slate-800 dark:text-white text-[18px] font-bold whitespace-nowrap"
                        animate={{ opacity: (isMobile || !isCollapsed) ? 1 : 0 }}
                        transition={{ duration: 0.15 }}>
                        ADMIN SITE
                    </motion.h1>
                </motion.div>

                {/* Toggle Button - only show on desktop */}
                {!isMobile && (
                    <motion.button
                        onClick={toggleCollapse}
                        className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors duration-200 shrink-0"
                        aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
                        whileTap={{ scale: 0.95 }}>
                        <motion.div
                            animate={{ rotate: isCollapsed ? 180 : 0 }}
                            transition={{ duration: 0.2 }} >
                            {isCollapsed ? <PanelLeft size={20} /> : <PanelLeftClose size={20} />}
                        </motion.div>
                    </motion.button>
                )}

                {/* Close button for mobile */}
                {isMobile && (
                    <button
                        onClick={() => setIsMobileOpen(false)}
                        className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500">
                        <MenuIcon size={24} />
                    </button>
                )}
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto overflow-x-hidden py-4 px-3 space-y-1 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-700 scrollbar-track-transparent">
                {/* Main Menu Section */}
                {(!isCollapsed || isMobile) && (
                    <div className="px-4 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                        Main Menu
                    </div>
                )}
                {mainNavItems.map((item) => (
                    <NavItemComponent
                        key={item.name}
                        item={item}
                        isActive={pathname === item.href}
                        isCollapsed={isCollapsed && !isMobile} />
                ))}

                {/* System Section */}
                {(!isCollapsed || isMobile) && (
                    <div className="mt-6 px-4 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                        System
                    </div>
                )}
                {systemNavItems.map((item) => (
                    <NavItemComponent
                        key={item.name}
                        item={item}
                        isActive={pathname === item.href}
                        isCollapsed={isCollapsed && !isMobile} />
                ))}
            </nav>

        </div>

    );

    return (
        <>
            {/* Desktop Sidebar - with smooth width transition */}
            <motion.aside
                className="hidden lg:block h-screen sticky top-0 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 shadow-lg z-30"
                animate={{
                    width: isCollapsed ? 80 : 240, // w-20 = 80px, w-64 = 256px
                }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                style={{ overflow: 'hidden' }}>
                <SidebarContent isMobile={false} />
            </motion.aside>

            {/* Mobile Sidebar Overlay */}
            <AnimatePresence>
                {isMobileOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMobileOpen(false)}
                            className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm" />
                        <motion.aside
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed inset-y-0 left-0 z-50 lg:hidden w-72 bg-white dark:bg-slate-900 shadow-xl">
                            <SidebarContent isMobile={true} />
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>

            {/* Mobile Toggle Button */}
            <button
                onClick={() => setIsMobileOpen(true)}
                className="fixed top-2.5 left-168 z-30 lg:hidden p-3 dark:border-slate-800 text-white hover:text-slate-900 transition-all duration-200 hover:scale-105 active:scale-95" >
                <MenuIcon size={20} />
            </button>
        </>
    );
};