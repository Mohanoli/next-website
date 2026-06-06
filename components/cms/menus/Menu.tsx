"use client";
import { useState, useEffect } from "react";
import axiosInstance from "@/lib/config/AxiosConfig";
import { toast } from "sonner";
import { Plus, Edit, Trash2, MenuSquare, X } from "lucide-react";
import RowSkeleton from "@/components/table/RowSkeleton";
import { INavMenu } from "@/lib/types/GlobalTypes";

export default function MenusPage() {
    const [menus, setMenus] = useState<INavMenu[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const [formData, setFormData] = useState<{
        id?: number; title: string; url: string; icon: string; parent_id: string; order: number; isActive: boolean;
    }>({ title: "", url: "", icon: "", parent_id: "", order: 0, isActive: true });

    const fetchMenus = async () => {
        try {
            setLoading(true);
            const response: any = await axiosInstance.get("/menus/flat");
            setMenus(response?.result || []);
        } catch (error) {
            toast.error("Failed to fetch menus");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMenus();
    }, []);

    const handleDelete = async (id: number) => {
        if (confirm("Are you sure you want to delete this menu?")) {
            try {
                await axiosInstance.delete(`/menus/${id}`);
                toast.success("Menu deleted successfully");
                fetchMenus();
            } catch (error) {
                toast.error("Failed to delete menu");
            }
        }
    };

    const handleOpenModal = (menu?: INavMenu) => {
        if (menu) {
            setFormData({
                id: menu.id,
                title: menu.title,
                url: menu.url || "",
                icon: menu.icon || "",
                parent_id: menu.parent_id?.toString() || "",
                order: menu.order,
                isActive: menu.isActive,
            });
        } else {
            setFormData({ title: "", url: "", icon: "", parent_id: "", order: 0, isActive: true });
        }
        setIsModalOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const payload = {
                ...formData,
                parent_id: formData.parent_id ? parseInt(formData.parent_id) : null,
            };

            if (formData.id) {
                await axiosInstance.put(`/menus/${formData.id}`, payload);
                toast.success("Menu updated successfully");
            } else {
                await axiosInstance.post("/menus", payload);
                toast.success("Menu created successfully");
            }
            setIsModalOpen(false);
            fetchMenus();
        } catch (error) {
            toast.error("Failed to save menu");
        }
    };

    // Filter parent menus for the dropdown
    const parentOptions = menus.filter(m => !m.parent_id);

    return (
        <div className="min-h-screen bg-slate-50/50 p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Page Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Nav-Menu Management</h1>
                        <p className="text-sm text-gray-500 mt-1">Manage header links, dropdowns, and navigation.</p>
                    </div>
                    <button
                        onClick={() => handleOpenModal()}
                        className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-teal-600 text-white text-sm font-semibold rounded-lg shadow-sm hover:bg-teal-700 transition"
                    >
                        <Plus size={18} />
                        Add New Menu
                    </button>
                </div>

                {/* Main Card */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full border-collapse border border-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="border border-gray-200 px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase">Title</th>
                                    <th className="border border-gray-200 px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase">URL</th>
                                    <th className="border border-gray-200 px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase">Icon</th>
                                    <th className="border border-gray-200 px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase">Type</th>
                                    <th className="border border-gray-200 px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase">Order</th>
                                    <th className="border border-gray-200 px-6 py-3.5 text-right text-xs font-semibold text-gray-500 uppercase">Actions</th>
                                </tr>
                            </thead>
                            {loading ? (
                                <tbody className="bg-white">
                                    <RowSkeleton rows={5} cols={6} />
                                </tbody>
                            ) : menus.length > 0 ? (
                                <tbody className="bg-white">
                                    {menus.map((menu) => (
                                        <tr key={menu.id} className="hover:bg-gray-50/50">
                                            <td className="border border-gray-200 px-6 py-4 text-sm font-medium text-gray-900">
                                                {menu.title}
                                            </td>
                                            <td className="border border-gray-200 px-6 py-4 text-sm text-gray-500">
                                                {menu.url || <span className="text-gray-400 italic">None</span>}
                                            </td>
                                            <td className="border border-gray-200 px-6 py-4 text-sm text-gray-500">
                                                {menu.icon || "-"}
                                            </td>
                                            <td className="border border-gray-200 px-6 py-4 text-sm">
                                                {menu.parent_id ? (
                                                    <span className="bg-indigo-50 text-indigo-700 px-2.5 py-0.5 rounded-full text-xs font-medium">Dropdown of {menu.parent?.title}</span>
                                                ) : (
                                                    <span className="bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded-full text-xs font-medium">Main Header</span>
                                                )}
                                            </td>
                                            <td className="border border-gray-200 px-6 py-4 text-sm text-gray-500">
                                                {menu.order}
                                            </td>
                                            <td className="border border-gray-200 px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-1">
                                                    <button onClick={() => handleOpenModal(menu)} className="p-2 text-gray-500 hover:text-teal-600 hover:bg-teal-50 rounded-lg">
                                                        <Edit size={16} />
                                                    </button>
                                                    <button onClick={() => handleDelete(menu.id)} className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg">
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            ) : (
                                <tbody className="bg-white">
                                    <tr>
                                        <td colSpan={6} className="border border-gray-200 px-6 py-12 text-center text-gray-500">
                                            <MenuSquare className="mx-auto text-gray-300 mb-2" size={40} />
                                            <p>No menus found</p>
                                        </td>
                                    </tr>
                                </tbody>
                            )}
                        </table>
                    </div>
                </div>

                {/* Form Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                        <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
                                <h3 className="font-semibold text-lg">{formData.id ? "Edit Menu" : "Add Menu"}</h3>
                                <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                                    <X size={20} />
                                </button>
                            </div>
                            <form onSubmit={handleSubmit} className="p-6 space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                                    <input required type="text" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-teal-500 focus:border-teal-500" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">URL (Optional, leave blank for headers with Dropdowns)</label>
                                    <input type="text" value={formData.url || ""} onChange={e => setFormData({ ...formData, url: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-teal-500 focus:border-teal-500" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Icon Name (lucide-react or react-icons/fa)</label>
                                    <input type="text" placeholder="e.g., FaHome, User, Building" value={formData.icon || ""} onChange={e => setFormData({ ...formData, icon: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-teal-500 focus:border-teal-500" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Parent Menu (Select if Dropdown item)</label>
                                    <select value={formData.parent_id} onChange={e => setFormData({ ...formData, parent_id: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-teal-500 focus:border-teal-500">
                                        <option value="">-- No Parent (Make this a Top Level Header) --</option>
                                        {parentOptions.map(p => (
                                            <option key={p.id} value={p.id}>{p.title}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Order (Sort placement)</label>
                                    <input required type="number" value={formData.order} onChange={e => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-teal-500 focus:border-teal-500" />
                                </div>

                                <div className="pt-4 flex justify-end gap-3">
                                    <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 hidden sm:block">Cancel</button>
                                    <button type="submit" className="px-4 py-2 bg-teal-600 text-white rounded-lg text-sm font-medium hover:bg-teal-700 w-full sm:w-auto">Save Menu</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
