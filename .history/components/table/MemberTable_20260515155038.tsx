"use client";

import { useEffect, useState } from "react";
import { Search, Plus, CheckCircle2, XCircle, Users } from "lucide-react";
import axiosInstance from "@/lib/config/AxiosConfig";
import { toast } from "sonner";
import { RowAction } from "@/components/table/RowAction";
import { MemberTableProps, Member, ModalProps } from "@/lib/types/GlobalTypes";


export const MemberTable = ({
    title,
    description,
    apiEndpoint,
    deleteEndpoint,
    ModalComponent,
}: MemberTableProps) => {
    const [members, setMembers] = useState<Member[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedMember, setSelectedMember] = useState<Member | undefined>(undefined);

    const fetchMembers = async () => {
        try {
            setLoading(true);
            // Use the provided apiEndpoint
            const res: any = await axiosInstance.get(`/${apiEndpoint}`);
            setMembers(res.result || []);
        } catch (error) {
            console.error(`Failed to fetch ${title}:`, error);
            toast.error(`Failed to fetch ${title}`);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMembers();
    }, [apiEndpoint]);

    const handleDelete = async (id: string) => {
        // Optional: You can keep or remove the window.confirm since RowAction has SweetAlert
        // If you want double confirmation:
        // if (!confirm("Are you sure?")) return; 

        try {
            // Use the provided deleteEndpoint
            await axiosInstance.delete(`/${deleteEndpoint}/${id}`);
            toast.success(`${title} member deleted successfully`);
            fetchMembers();
        } catch (error) {
            toast.error(`Failed to delete ${title} member`);
        }
    };

    const handleEdit = (member: Member) => {
        setSelectedMember(member);
        setIsModalOpen(true);
    };

    const handleAdd = () => {
        setSelectedMember(undefined);
        setIsModalOpen(true);
    };

    const filteredMembers = members.filter(member =>
        member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.role.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://api.sanakisan.magnus.com.np";

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-xl font-bold text-slate-900">{title}</h2>
                    <p className="text-sm text-slate-500 mt-1">{description}</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <input
                            type="text"
                            placeholder="Search members..."
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
                        <span>Add Member</span>
                    </button>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-100">
                        <tr>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">S.n</th>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Image</th>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Name & Role</th>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Tenure</th>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {loading ? (
                            Array.from({ length: 3 }).map((_, i) => (
                                <tr key={i} className="animate-pulse">
                                    <td className="px-6 py-4"><div className="h-4 w-8 bg-slate-100 rounded"></div></td>
                                    <td className="px-6 py-4"><div className="h-10 w-10 bg-slate-100 rounded-full"></div></td>
                                    <td className="px-6 py-4"><div className="h-4 w-32 bg-slate-100 rounded"></div></td>
                                    <td className="px-6 py-4"><div className="h-4 w-16 bg-slate-100 rounded"></div></td>
                                    <td className="px-6 py-4"><div className="h-4 w-16 bg-slate-100 rounded"></div></td>
                                    <td className="px-6 py-4"><div className="h-8 w-16 bg-slate-100 rounded ml-auto"></div></td>
                                </tr>
                            ))
                        ) : filteredMembers.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="px-6 py-12 text-center text-slate-500">No members found.</td>
                            </tr>
                        ) : (
                            filteredMembers.map((member) => (
                                <tr key={member.id} className="hover:bg-slate-50 transition-colors group">
                                    <td className="px-6 py-4 text-sm font-medium text-slate-700">
                                        {member.id}
                                    </td>
                                    <td className="px-6 py-3">
                                        <div className="w-12 h-12 rounded-full bg-slate-100 overflow-hidden border border-slate-200">
                                            {member.imageUrl ? (
                                                <img
                                                    src={`${baseUrl}${member.imageUrl}`}
                                                    alt={member.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-slate-400">
                                                    <Users size={20} />
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm font-semibold text-slate-900">{member.name}</div>
                                        <div className="text-xs text-slate-500">{member.role}</div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-600 font-medium">{member.tenure || '-'}</td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${member.status === 'active' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>
                                            {member.status === 'active' ? <CheckCircle2 size={12} /> : <XCircle size={12} />}
                                            {member.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            <RowAction
                                                onEdit={() => handleEdit(member)}
                                                rowId={String(member.id)}
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

            {/* Render the passed Modal Component dynamically */}
            <ModalComponent
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSuccess={fetchMembers}
                member={selectedMember}
            />
        </div>
    );
};