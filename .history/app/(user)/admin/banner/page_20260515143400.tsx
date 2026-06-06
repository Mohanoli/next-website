"use client";

import { BannerTable } from "@/pages/cms/banner/BannerTable";
import { BannerTable } from "@/pages/cms/banner/BannerTable";
import { Image as ImageIcon } from "lucide-react";

export default function BannersPage() {
    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
                        <ImageIcon className="text-teal-600" size={32} />
                        <span>Banners</span>
                    </h1>
                    <p className="text-slate-500 mt-1">Manage the hero section carousels of your website.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-8">
                <BannerTable />
            </div>
        </div>
    );
}
