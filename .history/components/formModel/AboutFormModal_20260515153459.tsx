"use client";

import { useState, useEffect, useRef } from "react";
import { X, Upload, Check, Loader2 } from "lucide-react";
import axiosInstance from "@/lib/config/AxiosConfig";
import { toast } from "sonner";
import { MemberFormModalProps } from "@/lib/types/GlobalTypes";


export const MemberFormModal = ({
    isOpen,
    onClose,
    onSuccess,
    member,
    apiEndpoint,
    entityName
}: MemberFormModalProps) => {
    const [name, setName] = useState("");
    const [role, setRole] = useState("");
    const [tenure, setTenure] = useState("");
    const [expertiseStr, setExpertiseStr] = useState("");
    const [linkedin, setLinkedin] = useState("");
    const [facebook, setFacebook] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [status, setStatus] = useState<'active' | 'inactive'>('active');

    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);

    const fileInputRef = useRef<HTMLInputElement>(null);
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://api.sanakisan.magnus.com.np";

    // Reset or Populate form
    useEffect(() => {
        if (member) {
            setName(member.name);
            setRole(member.role);
            setTenure(member.tenure || "");
            setStatus(member.status || "active");
            setImagePreview(member.imageUrl ? `${baseUrl}${member.imageUrl}` : null);
            setImageFile(null);

            if (member.expertise && Array.isArray(member.expertise)) {
                setExpertiseStr(member.expertise.join(", "));
            } else {
                setExpertiseStr("");
            }

            if (member.social) {
                setLinkedin(member.social.linkedin || "");
                setFacebook(member.social.facebook || "");
                setEmail(member.social.email || "");
                setPhone(member.social.phone || "");
            } else {
                setLinkedin("");
                setFacebook("");
                setEmail("");
                setPhone("");
            }
        } else {
            // Reset for new entry
            setName("");
            setRole("");
            setTenure("");
            setExpertiseStr("");
            setLinkedin("");
            setFacebook("");
            setEmail("");
            setPhone("");
            setStatus("active");
            setImagePreview(null);
            setImageFile(null);
        }
    }, [member, isOpen, baseUrl]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!name || !role) {
            toast.error("Name and Role are required");
            return;
        }

        if (!member && !imageFile) {
            toast.error(`Image is required for new ${entityName.toLowerCase()}`);
            return;
        }

        try {
            setLoading(true);
            const formData = new FormData();
            formData.append("name", name);
            formData.append("role", role);
            formData.append("tenure", tenure);
            formData.append("status", status);

            const expertiseArray = expertiseStr.split(",").map(item => item.trim()).filter(item => item !== "");
            formData.append("expertise", JSON.stringify(expertiseArray));

            const socialObj = { linkedin, facebook, email, phone };
            formData.append("social", JSON.stringify(socialObj));

            if (imageFile) {
                formData.append("image", imageFile);
            }

            if (member) {
                await axiosInstance.put(`/${apiEndpoint}/${member.id}`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                toast.success(`${entityName} updated successfully`);
            } else {
                await axiosInstance.post(`/${apiEndpoint}`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                toast.success(`${entityName} added successfully`);
            }

            onSuccess();
            onClose();
        } catch (error: any) {
            console.error("Submit error:", error);
            toast.error(error.response?.data?.message || `Failed to save ${entityName.toLowerCase()}`);
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
            <div
                className="bg-white rounded-2xl shadow-xl w-full max-w-3xl overflow-hidden flex flex-col max-h-[90vh]"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
                    <h3 className="text-lg font-bold text-slate-900">
                        {member ? `Edit ${entityName}` : `Add ${entityName}`}
                    </h3>
                    <button
                        onClick={onClose}
                        className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 overflow-y-auto">
                    <form id="member-form" onSubmit={handleSubmit} className="space-y-6">

                        {/* Image Upload */}
                        <div className="flex flex-col items-center justify-center">
                            <input
                                type="file"
                                ref={fileInputRef}
                                className="hidden"
                                accept="image/png, image/jpeg, image/jpg, image/webp"
                                onChange={handleImageChange}
                            />

                            <div
                                onClick={() => fileInputRef.current?.click()}
                                className={`relative w-32 h-32 rounded-full overflow-hidden border-2 border-dashed flex items-center justify-center cursor-pointer transition-colors ${imagePreview ? 'border-transparent' : 'border-slate-300 hover:border-teal-500 bg-slate-50 hover:bg-teal-50'}`}
                            >
                                {imagePreview ? (
                                    <>
                                        <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                                            <Upload className="text-white mb-1" size={20} />
                                            <span className="text-white text-xs font-medium">Change</span>
                                        </div>
                                    </>
                                ) : (
                                    <div className="flex flex-col items-center text-slate-400">
                                        <Upload size={24} className="mb-2" />
                                        <span className="text-xs font-medium text-center px-2">Upload Photo</span>
                                    </div>
                                )}
                            </div>
                            <p className="text-xs text-slate-500 mt-2">Recommended: Square format (1:1), Max 2MB</p>
                        </div>

                        {/* Basic Info Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700">Name <span className="text-red-500">*</span></label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="e.g. Mr. Rajesh Hamal"
                                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700">Role <span className="text-red-500">*</span></label>
                                <input
                                    type="text"
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                    placeholder="e.g. Chairman"
                                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700">Tenure</label>
                                <input
                                    type="text"
                                    value={tenure}
                                    onChange={(e) => setTenure(e.target.value)}
                                    placeholder="e.g. 12 Years"
                                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700">Status</label>
                                <select
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value as any)}
                                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 appearance-none"
                                >
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                </select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700">Expertise (Comma separated)</label>
                            <input
                                type="text"
                                value={expertiseStr}
                                onChange={(e) => setExpertiseStr(e.target.value)}
                                placeholder="e.g. Strategic Planning, Corporate Governance"
                                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                            />
                        </div>

                        {/* Socials Section */}
                        <div className="border-t border-slate-100 pt-6">
                            <h4 className="text-sm font-bold text-slate-900 mb-4">Social Links & Contact</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-700">Email</label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="email@example.com"
                                        className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-700">Phone</label>
                                    <input
                                        type="text"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        placeholder="Contact number"
                                        className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-700">LinkedIn URL</label>
                                    <input
                                        type="url"
                                        value={linkedin}
                                        onChange={(e) => setLinkedin(e.target.value)}
                                        placeholder="https://linkedin.com/..."
                                        className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-700">Facebook URL</label>
                                    <input
                                        type="url"
                                        value={facebook}
                                        onChange={(e) => setFacebook(e.target.value)}
                                        placeholder="https://facebook.com/..."
                                        className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                                    />
                                </div>
                            </div>
                        </div>

                    </form>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-semibold text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"
                        disabled={loading}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        form="member-form"
                        className="flex items-center gap-2 px-6 py-2 text-sm font-semibold text-white bg-teal-600 rounded-xl hover:bg-teal-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed shadow-md shadow-teal-600/20"
                        disabled={loading}
                    >
                        {loading ? <Loader2 size={16} className="animate-spin" /> : <Check size={16} />}
                        <span>{member ? "Save Changes" : `Add ${entityName}`}</span>
                    </button>
                </div>
            </div>
        </div>
    );
};