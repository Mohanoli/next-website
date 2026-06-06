'use client';
import React, { useState, useEffect, useRef } from "react";
import Link from 'next/link';
import Image from 'next/image';
import { FaFacebook, FaTwitter, FaLinkedin, FaYoutube, FaBars, FaTimes, FaChevronDown, FaPhoneAlt, FaRegClock, FaSun, FaMoon } from "react-icons/fa";
import NepaliDate from 'nepali-date-converter';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { MenuItem } from "@/lib/types/GlobalTypes";
import DropdownMenu from "./DropdownMenu";
import axiosInstance from "@/lib/config/AxiosConfig";
import { getIconComponent } from "@/lib/utils/IconMapper";

// Animation Configs
const mobileMenuVariants: Variants = {
    closed: { x: "-100%", opacity: 0, transition: { duration: 0.3, ease: "easeInOut" as const } },
    open: { x: "0%", opacity: 1, transition: { duration: 0.3, ease: "easeInOut" as const } },
};

const dropdownVariants = {
    hidden: { opacity: 0, scaleY: 0.95, y: -10 },
    visible: { opacity: 1, scaleY: 1, y: 0 },
};


export const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isFixed, setIsFixed] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const [currentNepaliDate, setCurrentNepaliDate] = useState('');
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [dynamicMenuItems, setDynamicMenuItems] = useState<MenuItem[]>([]);
    const [companyInfo, setCompanyInfo] = useState<any>(null);

    const navMenuRef = useRef<HTMLElement>(null);

    const getLogoUrl = (url: string | undefined | null) => {
        if (!url) return "/logo.png";
        if (url.startsWith('/uploads')) {
            return `${process.env.NEXT_PUBLIC_BACKEND_URL || 'https://api.sanakisan.magnus.com.np'}${url}`;
        }
        return url;
    };

    // Fetch Menus
    useEffect(() => {
        const fetchMenus = async () => {
            try {
                const response: any = await axiosInstance.get('/menus/tree');
                const data = response?.result ? response : response?.data;
                if (data?.success && data?.result) {
                    const transformMenu = (item: any): MenuItem => ({
                        id: item.id.toString(),
                        title: item.title,
                        url: item.url || undefined,
                        icon: getIconComponent(item.icon),
                        dropdown: item.dropdown?.length > 0 ? item.dropdown.map(transformMenu) : undefined
                    });
                    setDynamicMenuItems(data.result.map(transformMenu));
                }
            } catch (error) {
                console.error("Failed to load header menus:", error);
            }
        };
        const fetchCompanyInfo = async () => {
            try {
                const response: any = await axiosInstance.get('/company-info');
                if (response?.success) {
                    setCompanyInfo(response.result);
                }
            } catch (error) {
                console.error("Failed to load company info:", error);
            }
        };
        fetchMenus();
        fetchCompanyInfo();
    }, []);

    // Dark Mode Logic
    useEffect(() => {
        const saved = localStorage.getItem('darkMode') === 'true';
        setIsDarkMode(saved);
        if (saved) document.documentElement.classList.add('dark');
    }, []);

    const toggleDarkMode = () => {
        const newMode = !isDarkMode;
        setIsDarkMode(newMode);
        localStorage.setItem('darkMode', String(newMode));
        if (newMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };

    // Nepali Date
    useEffect(() => {
        const today = new Date();
        const nepaliDate = new NepaliDate(today);
        setCurrentNepaliDate(nepaliDate.format('YYYY MMMM DD, ddd', 'np'));
    }, []);

    // Sticky Scroll Logic
    useEffect(() => {
        const handleScroll = () => {
            setIsFixed(window.scrollY > 110);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Helper function to render icon
    const renderIcon = (IconComponent: React.ElementType | undefined) => {
        if (!IconComponent) return null;
        return <IconComponent className="mr-2 text-sm" size={16} />;
    };

    // Helper function to render mobile icon
    const renderMobileIcon = (IconComponent: React.ElementType | undefined) => {
        if (!IconComponent) return null;
        return <IconComponent className="mr-3 w-5" size={20} />;
    };

    return (
        <>
            {/* 1. TOP NAV */}
            <div className="bg-[#0a8338] dark:bg-[#1a1a2e] text-white dark:text-gray-100 py-1 px-5 md:px-17 relative z-50">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">

                    {/* Left: Logo + Text */}
                    <Link href="/" className="flex items-center gap-4">
                        <div className="relative w-14 h-14 transition-transform">
                            <Image src={getLogoUrl(companyInfo?.logoUrl)} alt="Logo" fill className="object-contain" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold leading-none">{companyInfo?.name || ""}</h1>
                            <p className="text-xs mt-1">{companyInfo?.address || "Shantinagar, 07 Khareni Dang"}</p>
                        </div>
                    </Link>

                    {/* Right: Contact + Socials + Dark Mode */}
                    <div className="flex items-center gap-4 md:gap-6">
                        <a href={`tel:${companyInfo?.phone || "+9779818145290"}`} className="flex items-center gap-2 text-sm hover:text-yellow-400 transition-colors">
                            <FaPhoneAlt size={14} /> <span className="hidden sm:inline">{companyInfo?.phone || "+977 9818145290"}</span>
                        </a>

                        {/* Social Icons */}
                        <div className="flex gap-3 sm:gap-4 text-base sm:text-lg">
                            {companyInfo?.facebook && <a href={companyInfo.facebook} target="_blank" rel="noreferrer"><FaFacebook className="hover:text-yellow-400 cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:scale-110" /></a>}
                            {companyInfo?.twitter && <a href={companyInfo.twitter} target="_blank" rel="noreferrer"><FaTwitter className="hover:text-yellow-400 cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:scale-110" /></a>}
                            {companyInfo?.linkedin && <a href={companyInfo.linkedin} target="_blank" rel="noreferrer"><FaLinkedin className="hover:text-yellow-400 cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:scale-110" /></a>}
                            {companyInfo?.youtube && <a href={companyInfo.youtube} target="_blank" rel="noreferrer"><FaYoutube className="hover:text-yellow-400 cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:scale-110" /></a>}
                            {(!companyInfo?.facebook && !companyInfo?.twitter && !companyInfo?.linkedin && !companyInfo?.youtube) && [FaFacebook, FaTwitter, FaLinkedin, FaYoutube].map((Icon, index) => (
                                <Icon
                                    key={index}
                                    className="hover:text-yellow-400 cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:scale-110" />
                            ))}
                        </div>

                        {/* Dark Mode Button */}
                        <button
                            type="button"
                            onClick={toggleDarkMode}
                            className="p-2 bg-black/20 dark:bg-white/20 rounded-full hover:bg-black/40 dark:hover:bg-white/40 transition-colors text-xl"
                        >
                            {isDarkMode ? <FaSun /> : <FaMoon />}
                        </button>
                    </div>
                </div>
            </div>

            {/* 2. MAIN NAV */}
            <motion.nav
                initial={false}
                animate={isFixed ? { y: 0, opacity: 1 } : { y: 0, opacity: 1 }}
                transition={isFixed ? {
                    y: { duration: 0.6, ease: [0.25, 1, 0.5, 1] },
                    opacity: { duration: 0.4 }
                } : { duration: 0 }}
                className={`w-full z-50 will-change-transform ${isFixed
                    ? 'fixed top-0 left-0 right-0 bg-[#0b6b30]/95 dark:bg-[#1f2937]'
                    : 'relative bg-[#0b6b30] dark:bg-[#1f2937]'}`}>

                <div className={`max-w-6xl mx-auto px-4 md:px-8 flex justify-between items-center ${isFixed ? 'h-15' : 'h-12'}`}>

                    <div className="flex items-center gap-4 relative">

                        <Link href="/" className={`flex items-center gap-3 transition-all duration-800 ${isFixed ? 'opacity-100 translate-x-0' : 'opacity-0 translate-y-0 pointer-events-none w-0'}`}>
                            <div className="relative w-13 h-13">
                                <Image src={getLogoUrl(companyInfo?.logoUrl)} alt="Logo" fill className="object-contain" />
                            </div>
                        </Link>

                        {/* Floating Date Badge (as per screenshot) */}
                        <AnimatePresence>
                            {isFixed && (
                                <motion.div
                                    initial={{ opacity: 0, y: -15 }}
                                    animate={{ opacity: 1, y: 2 }}
                                    exit={{ opacity: 0, y: -15 }}
                                    className="absolute top-100% left-0 mt-18 bg-black text-white px-0.5 py-0.5 text-[10px] flex items-center gap-2 z-99">
                                    <FaRegClock size={10} />
                                    <span className="whitespace-nowrap">{currentNepaliDate}</span>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Desktop Menu */}
                    <ul className="hidden xl:flex items-center h-full">
                        {dynamicMenuItems.map((item) => (
                            <li
                                key={item.id}
                                className="relative h-full group"
                                onMouseEnter={() => item.dropdown && setActiveDropdown(item.title)}
                                onMouseLeave={() => setActiveDropdown(null)}>
                                <Link
                                    href={item.url || '#'}
                                    className="flex items-center px-4 h-full text-white font-small hover:text-yellow-400 transition-colors">
                                    {renderIcon(item.icon)}
                                    {item.title}
                                    {item.dropdown && <FaChevronDown className={`ml-2 text-[10px] transition-transform ${activeDropdown === item.title ? 'rotate-180' : ''}`} />}
                                </Link>

                                <AnimatePresence>
                                    {item.dropdown && activeDropdown === item.title && (
                                        <motion.div
                                            className="absolute top-full left-0 pt-0"
                                            variants={dropdownVariants} initial="hidden" animate="visible" exit="hidden"
                                        >
                                            <DropdownMenu
                                                dropdownType={item.title}
                                                isMobile={false}
                                                menuItemsData={dynamicMenuItems} />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </li>
                        ))}
                    </ul>

                    <div className="flex items-center gap-4 ml-auto">
                        <Link href="/online-banking" className="hidden sm:block bg-blue-600 hover:bg-[#077430]/90 text-white px-5 py-2 rounded font-semibold text-sm transition-all transform hover:scale-105 shadow-lg">
                            Online Banking
                        </Link>

                        {/* Mobile Toggle */}
                        <button type="button" className="xl:hidden text-white text-2xl p-2" onClick={() => setIsOpen(!isOpen)}>
                            {isOpen ? <FaTimes /> : <FaBars />}
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* 3. MOBILE MENU SIDEBAR */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Overlay */}
                        <motion.div
                            key="mobile-menu-overlay"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 bg-black/60 z-1000 backdrop-blur-sm xl:hidden" />

                        {/* Sidebar */}
                        <motion.div
                            key="mobile-menu-sidebar"
                            variants={mobileMenuVariants}
                            initial="closed"
                            animate="open"
                            exit="closed"
                            className="fixed top-0 left-0 w-[80%] max-w-300px h-full bg-[#088738] dark:bg-[#1f2937] z-1001 shadow-2xl xl:hidden flex flex-col"
                        >
                            {/* Header */}
                            <div className="p-2 border-b border-white/10 flex justify-between items-center">

                                {/* Left Side (Logo + Menu Text) */}
                                <div className="flex items-center gap-4">
                                    <div className="relative w-10 h-10">
                                        <Image
                                            src={getLogoUrl(companyInfo?.logoUrl)}
                                            alt="Logo"
                                            fill
                                            className="object-contain"
                                        />
                                    </div>
                                    <span className="text-white font-bold">MENU</span>
                                </div>

                                {/* Close Icon */}
                                <FaTimes
                                    className="text-white cursor-pointer"
                                    onClick={() => setIsOpen(false)} />
                            </div>


                            {/* Scrollable Content */}
                            <div className="flex-1 overflow-y-auto">
                                <ul className="flex flex-col">
                                    {dynamicMenuItems.map((item) => (
                                        <li key={item.id} className="border-b border-white/5">
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    item.dropdown
                                                        ? setActiveDropdown(
                                                            activeDropdown === item.title ? null : item.title
                                                        )
                                                        : setIsOpen(false)
                                                }
                                                className="w-full flex items-center justify-between p-4 text-white hover:bg-black/10">
                                                <span className="flex items-center">
                                                    {renderMobileIcon(item.icon)}
                                                    {item.title}
                                                </span>

                                                {item.dropdown && (
                                                    <FaChevronDown
                                                        className={`transition-transform ${activeDropdown === item.title ? "rotate-180" : ""
                                                            }`} />
                                                )}
                                            </button>

                                            <AnimatePresence>
                                                {item.dropdown &&
                                                    activeDropdown === item.title && (
                                                        <motion.div
                                                            initial={{ height: 0 }}
                                                            animate={{ height: "auto" }}
                                                            exit={{ height: 0 }}
                                                            className="overflow-hidden"
                                                        >
                                                            <DropdownMenu
                                                                dropdownType={item.title}
                                                                isMobile={true}
                                                                closeMobileMenu={() => setIsOpen(false)}
                                                                menuItemsData={dynamicMenuItems} />
                                                        </motion.div>
                                                    )}
                                            </AnimatePresence>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Footer (NOW FIXED) */}
                            <div className="">
                                <div className="flex gap-4 justify-center mb-4">
                                    {companyInfo?.facebook && <a href={companyInfo.facebook} target="_blank" rel="noreferrer"><FaFacebook className="text-white/80 hover:text-yellow-400 cursor-pointer transition-colors text-xl" /></a>}
                                    {companyInfo?.twitter && <a href={companyInfo.twitter} target="_blank" rel="noreferrer"><FaTwitter className="text-white/80 hover:text-yellow-400 cursor-pointer transition-colors text-xl" /></a>}
                                    {companyInfo?.linkedin && <a href={companyInfo.linkedin} target="_blank" rel="noreferrer"><FaLinkedin className="text-white/80 hover:text-yellow-400 cursor-pointer transition-colors text-xl" /></a>}
                                    {companyInfo?.youtube && <a href={companyInfo.youtube} target="_blank" rel="noreferrer"><FaYoutube className="text-white/80 hover:text-yellow-400 cursor-pointer transition-colors text-xl" /></a>}
                                    {(!companyInfo?.facebook && !companyInfo?.twitter && !companyInfo?.linkedin && !companyInfo?.youtube) && [FaFacebook, FaTwitter, FaLinkedin, FaYoutube].map(
                                        (Icon, index) => (
                                            <Icon
                                                key={index}
                                                className="text-white/80 hover:text-yellow-400 cursor-pointer transition-colors text-xl" />
                                        )
                                    )}
                                </div>
                                <p className="text-white/60 text-xs text-center">
                                    © 2024 {companyInfo?.name || "SFACL Dhanauri"}. All rights reserved.
                                </p>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};
export default Header;