"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Mail, Award, Phone } from "lucide-react";
import { FaFacebook, FaLinkedin } from "react-icons/fa";
import { Director } from "@/lib/types/GlobalTypes";

export const PhotoCard = ({ director, isFeatured = false }: { director: Director; isFeatured?: boolean }) => {
    return (
        <motion.div
            className={`group relative bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 hover:border-transparent hover:shadow-2xl transition-all duration-500 ${isFeatured ? "md:col-span-2 md:row-span-2" : ""}`}
        >
            {/* Image Section */}
            <div className={`relative w-full overflow-hidden ${isFeatured ? 'h-80 md:h-96' : 'h-85'}`}>
                <Image
                    src={director.image}
                    alt={director.name}
                    fill
                    priority={isFeatured}
                    className="object-cover transition-all duration-700 scale-105 group-hover:scale-100"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient from-slate-900/80 via-slate-900/10 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
            </div>

            {/* Content Section */}
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-10">
                <div className="flex items-center gap-2 mb-2">
                    <span className="px-3 py-1 text-[11px] font-bold bg-green-500 text-slate-900 rounded-xl shadow-lg">
                        {director.role}
                    </span>
                    <span className="text-xs text-slate-300 flex items-center gap-1">
                        <Award size={12} /> {director.tenure}
                    </span>
                </div>

                <h3 className="text-[15px] font-bold mb-1 tracking-tight">{director.name}</h3>

                <div className="overflow-hidden max-h-0 group-hover:max-h-40 transition-all duration-500 ease-in-out mt-2">
                    <div className="flex flex-wrap gap-2 mb-3">
                        {director.expertise.map((exp, i) => (
                            <span key={i} className="text-xs px-2 py-0.5 bg-white/10 rounded backdrop-blur-sm">
                                {exp}
                            </span>
                        ))}
                    </div>

                    {director.social && (
                        <div className="flex items-center gap-3 pt-2 border-t border-white/20">
                            {director.social.linkedin && (
                                <a href={director.social.linkedin} className="hover:text-amber-400 transition-colors">
                                    <FaLinkedin size={18} />
                                </a>)}
                            {director.social.email && (
                                <a href={`mailto:${director.social.email}`} className="hover:text-amber-400 transition-colors">
                                    <Mail size={18} />
                                </a>
                            )}
                            {director.social.phone && (
                                <a href={`tel:${director.social.phone}`} className="hover:text-amber-400 transition-colors">
                                    <Phone size={18} />
                                </a>
                            )}
                            {director.social.facebook && (
                                <a href={director.social.facebook}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-red-600 transition-colors">
                                    <FaFacebook size={18} />
                                </a>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
};