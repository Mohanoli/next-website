"use client";

import { useEffect, useState } from "react";
import { Search, Plus, CheckCircle2, XCircle, } from "lucide-react";
import axiosInstance from "@/lib/config/AxiosConfig";
import { toast } from "sonner";
import { BannerFormModal } from "./BannerFormModal";
import { RowAction } from "@/components/table/RowAction";
import { Banner } from "@/lib/types/GlobalTypes"

export const BannerTable = () => {
    const [banners, setBanners] = useState<Banner[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedBanner, setSelectedBanner] = useState<Banner | undefined>(undefined);

    const fetchBanners = async () => {
        try {
            setLoading(true);
            const res: any = await axiosInstance.get("/banners");
            setBanners(res.result || []);
        } catch (error) {
            console.error("Failed to fetch banners:", error);
            toast.error("Failed to fetch banners");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBanners();
    }, []);

    // Updated to accept string ID from RowAction and removed manual confirm dialog
    // RowAction handles the SweetAlert confirmation
    const handleDelete = async (id: string) => {
        try {
            // Convert string ID to number for API if necessary
            const numericId = Number(id);
            await axiosInstance.delete(`/banners/${numericId}`);
            toast.success("Banner deleted successfully");
            fetchBanners();
        } catch (error) {
            toast.error("Failed to delete banner");
        }
    };

    const handleEdit = (banner: Banner) => {
        setSelectedBanner(banner);
        setIsModalOpen(true);
    };

    const handleAdd = () => {
        setSelectedBanner(undefined);
        setIsModalOpen(true);
    };

    const filteredBanners = banners.filter(banner =>
        banner.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://api.sanakisan.magnus.com.np";

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-xl font-bold text-slate-900">Banners Management</h2>
                    <p className="text-sm text-slate-500 mt-1">Manage hero section images and titles.</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <input
                            type="text"
                            placeholder="Search banners..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                        />
                    </div>
                    <button
                        onClick={handleAdd}
                        className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-xl text-sm font-semibold hover:bg-teal-700 transition-all shadow-md shadow-teal-600/20 active:scale-[0.98]"
                    >
                        <Plus size={18} />
                        <span>Add New Banner</span>
                    </button>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-100">
                        <tr>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">ID</th>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Title</th>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Image</th>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {loading ? (
                            Array.from({ length: 3 }).map((_, i) => (
                                <tr key={i} className="animate-pulse">
                                    <td className="px-6 py-4"><div className="h-4 w-8 bg-slate-100 rounded"></div></td>
                                    <td className="px-6 py-4"><div className="h-4 w-32 bg-slate-100 rounded"></div></td>
                                    <td className="px-6 py-4"><div className="h-10 w-20 bg-slate-100 rounded"></div></td>
                                    <td className="px-6 py-4"><div className="h-4 w-16 bg-slate-100 rounded"></div></td>
                                    <td className="px-6 py-4"><div className="h-8 w-20 bg-slate-100 rounded ml-auto"></div></td>
                                </tr>
                            ))
                        ) : filteredBanners.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-6 py-12 text-center text-slate-500">No banners found.</td>
                            </tr>
                        ) : (
                            filteredBanners.map((banner) => (
                                <tr key={banner.id} className="hover:bg-slate-50 transition-colors group">
                                    <td className="px-6 py-4 text-sm text-slate-600 font-medium">#{banner.id}</td>
                                    <td className="px-6 py-4 text-sm text-slate-900 font-semibold">{banner.title}</td>
                                    <td className="px-6 py-4">
                                        <div className="w-20 h-12 rounded-lg bg-slate-100 overflow-hidden border border-slate-200">
                                            <img
                                                src={`${baseUrl}${banner.imageUrl}`}
                                                alt={banner.title}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${banner.status === 'active' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>
                                            {banner.status === 'active' ? <CheckCircle2 size={12} /> : <XCircle size={12} />}
                                            {banner.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        {/* Implementation of RowAction Component */}
                                        <div className="flex justify-end">
                                            <RowAction
                                                // We pass the function as a prop to open the modal
                                                onEdit={() => handleEdit(banner)}
                                                rowId={String(banner.id)}
                                                deleteAction={handleDelete}
                                            />
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            <BannerFormModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSuccess={fetchBanners}
                banner={selectedBanner}
            />
        </div>
    );
};