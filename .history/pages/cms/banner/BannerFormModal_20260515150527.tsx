"use client";

import { useEffect, useState, useRef } from "react";
import { X, Upload, Loader2, Image as ImageIcon } from "lucide-react";
import axiosInstance from "@/lib/config/AxiosConfig";
import { toast } from "sonner";
import { BannerFormModalProps } from "@/lib/types/GlobalTypes";


export const BannerFormModal = ({ isOpen, onClose, onSuccess, banner }: BannerFormModalProps) => {
    const [title, setTitle] = useState("");
    const [status, setStatus] = useState<'active' | 'inactive'>('active');
    const [image, setImage] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (banner) {
            setTitle(banner.title);
            setStatus(banner.status);
            setPreview(process.env.NEXT_PUBLIC_BASE_URL ? `${process.env.NEXT_PUBLIC_BASE_URL}${banner.imageUrl}` : `https://api.sanakisan.magnus.com.np${banner.imageUrl}`);
            setImage(null);
        } else {
            setTitle("");
            setStatus('active');
            setImage(null);
            setPreview(null);
        }
    }, [banner, isOpen]);

    if (!isOpen) return null;

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append("title", title);
        formData.append("status", status);
        if (image) {
            formData.append("image", image);
        }

        try {
            if (banner) {
                await axiosInstance.put(`/banners/${banner.id}`, formData, {
                    headers: { "Content-Type": "multipart/form-data" }
                });
                toast.success("Banner updated successfully");
            } else {
                if (!image) {
                    toast.error("Please select an image");
                    setLoading(false);
                    return;
                }
                await axiosInstance.post("/banners", formData, {
                    headers: { "Content-Type": "multipart/form-data" }
                });
                toast.success("Banner created successfully");
            }
            onSuccess();
            onClose();
        } catch (error) {
            console.error("Failed to save banner:", error);
            toast.error("Failed to save banner");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose}></div>
            <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in duration-200">
                <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                    <h3 className="text-xl font-bold text-slate-900">
                        {banner ? "Edit Banner" : "Add New Banner"}
                    </h3>
                    <button onClick={onClose} className="p-2 text-slate-400 hover:bg-slate-50 rounded-full transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Banner Title</label>
                        <input
                            type="text"
                            required
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="e.g., Welcome to our website"
                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Status</label>
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value as 'active' | 'inactive')}
                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                        >
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Banner Image</label>
                        <div
                            onClick={() => fileInputRef.current?.click()}
                            className="relative aspect-16/6rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer flex flex-col items-center justify-center gap-2 overflow-hidden"
                        >
                            {preview ? (
                                <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                            ) : (
                                <>
                                    <div className="w-12 h-12 rounded-full bg-teal-50 flex items-center justify-center text-teal-600">
                                        <Upload size={24} />
                                    </div>
                                    <div className="text-center">
                                        <p className="text-sm font-semibold text-slate-900">Click to upload image</p>
                                        <p className="text-xs text-slate-500 mt-1">Recommended size 1920x600px</p>
                                    </div>
                                </>
                            )}
                            {preview && (
                                <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <p className="text-white text-sm font-semibold">Change Image</p>
                                </div>
                            )}
                        </div>
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleImageChange}
                            accept="image/*"
                            className="hidden"
                        />
                    </div>

                    <div className="flex items-center gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-all"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-teal-600 text-white rounded-xl text-sm font-semibold hover:bg-teal-700 transition-all shadow-md shadow-teal-600/20 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {loading ? <Loader2 size={18} className="animate-spin" /> : null}
                            <span>{banner ? "Update Banner" : "Create Banner"}</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
