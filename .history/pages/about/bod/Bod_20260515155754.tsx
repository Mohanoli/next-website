"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Director } from "@/lib/types/GlobalTypes";
import { PhotoCard } from "@/components/ui/photocard/PhotoCard";
import axiosInstance from "@/lib/config/AxiosConfig";

// --- Animation Variants ---
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15 }
    }
};

export default function BoardOfDirectorsPage() {
    const [boardMembers, setBoardMembers] = useState<Director[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchMembers = async () => {
        try {
            setLoading(true);
            const res: any = await axiosInstance.get("/bod");
            // API returns { success: true, result: [...] }
            // Ensure we map imageUrl correctly if needed, or if the PhotoCard component accepts imageUrl directly.
            // Wait, DirectorType requires image, but BodMember model returns imageUrl.
            // Let's map it so it matches the Director type if necessary.

            const fetchedData = res.result || [];

            const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://api.sanakisan.magnus.com.np";

            const mappedMembers = fetchedData.map((m: any) => ({
                id: m.id,
                name: m.name,
                role: m.role,
                image: m.imageUrl ? `${baseUrl}${m.imageUrl}` : "",
                tenure: m.tenure,
                expertise: m.expertise || [],
                social: m.social || {}
            }));

            setBoardMembers(mappedMembers);
        } catch (error) {
            console.error("Failed to fetch board members:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMembers();
    }, []);

    // ✅ NEW: Dynamic grouping logic
    const groupBoardMembers = (members: Director[]) => {
        const groups: Director[][] = [];

        if (members.length === 0) return groups;

        groups.push(members.slice(0, 2)); // first 2

        let index = 2;

        while (members.length - index > 4) {
            groups.push(members.slice(index, index + 4));
            index += 4;
        }

        if (index < members.length) {
            groups.push(members.slice(index));
        }

        return groups;
    };

    const groupedMembers = groupBoardMembers(boardMembers);

    return (
        <div className="min-h-screen bg-slate-50">

            {/* Hero Header */}
            <div className="bg-white relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}>

                        <h2 className="text-2xl md:text-[32px] font-bold tracking-tight text-slate-900">
                            Board Of <span className="text-amber-600 relative">Directors
                                <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 100 8" fill="none">
                                    <path d="M1 5.5C15 2 35 1 50 3C65 5 85 4.5 99 1.5" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" />
                                </svg>
                            </span>
                        </h2>
                    </motion.div>
                </div>
            </div>

            {/* Directors Layout (UPDATED) */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
                    </div>
                ) : boardMembers.length === 0 ? (
                    <div className="text-center py-20 text-slate-500">
                        No board members found.
                    </div>
                ) : (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="space-y-6"
                    >
                        {groupedMembers.map((group, i) => {
                            const isMiddle = group.length === 4;

                            return (
                                <div
                                    key={i}
                                    className={
                                        isMiddle
                                            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
                                            : "flex flex-wrap justify-center gap-4"
                                    }
                                >
                                    {group.map((member) => (
                                        <div
                                            key={member.id}
                                            className={!isMiddle ? "w-full md:w-[48%] lg:w-[23%]" : ""}
                                        >
                                            <PhotoCard director={member} />
                                        </div>
                                    ))}
                                </div>
                            );
                        })}
                    </motion.div>
                )}
            </div>

            {/* Message Section */}
            <div className="bg-slate-900 py-16 mt-8">
                <div className="max-w-4xl mx-auto text-center px-4">
                    <h2 className="text-2xl font-bold text-white mb-4">Message from the Chairman</h2>
                    <blockquote className="text-slate-300 text-lg italic leading-relaxed">
                        "Our commitment is to serve our members with integrity. We believe that financial growth should be accessible to everyone, and our cooperative model ensures that every member has a voice."
                    </blockquote>
                    <p className="mt-6 text-amber-400 font-semibold">- Rajesh Hamal, Chairman</p>
                </div>
            </div>
        </div>
    );
}