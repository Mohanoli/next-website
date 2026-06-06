'use client';
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MenuItem } from '@/lib/types/GlobalTypes';

const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
};

interface DropdownMenuProps {
    dropdownType: string;
    isMobile: boolean;
    closeMobileMenu?: () => void;
    menuItemsData: MenuItem[];
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({
    dropdownType,
    isMobile,
    closeMobileMenu,
    menuItemsData
}) => {
    const parentItem = menuItemsData.find(item => item.title === dropdownType);
    const items = parentItem?.dropdown || [];

    if (!items.length) return null;

    return (
        <motion.ul
            className={`
                flex flex-col py-2 min-w-60
                ${isMobile
                    ? 'bg-[#077430]/90 backdrop-blur-md dark:bg-[#1a1a2e] border-t border-white/10'
                    : 'bg-[#077430]/90 backdrop-blur-md dark:bg-[#1a1a2e] shadow-xl rounded-b-lg'
                }
            `}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={{
                visible: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
                hidden: { transition: { staggerChildren: 0.03, staggerDirection: -1 } }
            }}
        >
            {items.map((item) => {
                const Icon = item.icon; // Lucide component

                return (
                    <motion.li key={item.id} variants={itemVariants}>
                        <Link
                            href={item.url || '#'}
                            onClick={isMobile ? closeMobileMenu : undefined}
                            className="flex items-center px-6 py-3 text-sm text-white hover:bg-yellow-400 hover:text-black transition-colors duration-200"
                        >
                            {Icon && (
                                <Icon
                                    size={18}
                                    className="mr-3"
                                    aria-hidden="true"
                                />
                            )}
                            {item.title}
                        </Link>
                    </motion.li>
                );
            })}
        </motion.ul>
    );
};

export default DropdownMenu;