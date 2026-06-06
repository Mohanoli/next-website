"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import axiosInstance from "../../../lib/config/AxiosConfig";
import { toast } from "sonner";
import { Plus, Search, Edit, Trash2, ShieldCheck, UserCircle, } from "lucide-react";
import RowSkeleton from "@/components/table/RowSkeleton";
import { IUser } from "@/lib/types/GlobalTypes";

// Helper component for Status Badges
const StatusBadge = ({ status }: { status: string }) => {
    const statusStyles: Record<string, string> = {
        active: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
        inactive: "bg-gray-50 text-gray-600 ring-gray-500/10",
        suspended: "bg-red-50 text-red-700 ring-red-600/10",
        pending: "bg-yellow-50 text-yellow-800 ring-yellow-600/20",
    };

    const style = statusStyles[status.toLowerCase()] || statusStyles.inactive;

    return (
        <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${style}`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
    );
};

// Helper component for Role Badges
const RoleBadge = ({ role }: { role: string }) => {
    const isAdmin = role.toLowerCase() === 'admin';

    return (
        <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${isAdmin ? "bg-purple-100 text-purple-700" : "bg-sky-100 text-sky-700"}`}>
            {isAdmin && <ShieldCheck size={12} />}
            {role.charAt(0).toUpperCase() + role.slice(1)}
        </span>
    );
};

export default function UserList() {
    const [userList, setUserList] = useState<Array<IUser>>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [searchTerm, setSearchTerm] = useState<string>("");

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get("/auth/users");
            const users = response?.data?.result || [];
            setUserList(users);
        } catch (error) {
            console.error("Failed to fetch users", error);
            toast.error("Failed to fetch users");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (userId: string | number) => {
        if (confirm("Are you sure you want to delete this user?")) {
            try {
                await axiosInstance.delete(`/auth/users/${userId}`);
                toast.success("User deleted successfully");
                fetchData();
            } catch (error) {
                toast.error("Failed to delete user");
            }
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Filter logic for search
    const filteredUsers = userList.filter(user =>
        user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );



    return (
        <div className="min-h-screen bg-slate-50/50 p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto space-y-6">

                {/* Page Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">User Management</h1>
                        <p className="text-sm text-gray-500 mt-1">A list of all users in your application including their roles and status.</p>
                    </div>
                    <Link
                        href={"/admin/user/create"}
                        className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-teal-600 text-white text-sm font-semibold rounded-lg shadow-sm hover:bg-teal-700 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                    >
                        <Plus size={18} />
                        Add User
                    </Link>
                </div>

                {/* Main Card */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">

                    {/* Card Header / Search */}
                    <div className="px-6 py-4 border-b border-gray-200 bg-gray-50/50">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                            <h3 className="font-semibold text-gray-800">All Users</h3>
                            <div className="relative w-full sm:w-72">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                <input
                                    type="search"
                                    name="search"
                                    id="search"
                                    placeholder="Search users..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-shadow"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Table Area */}
                    <div className="overflow-x-auto">
                        <table className="min-w-full border-collapse border border-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="border border-gray-200 px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">S.N</th>
                                    <th className="border border-gray-200 px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">User</th>
                                    <th className="border border-gray-200 px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">Email</th>
                                    <th className="border border-gray-200 px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider hidden lg:table-cell">Gender</th>
                                    <th className="border border-gray-200 px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Role</th>
                                    <th className="border border-gray-200 px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="border border-gray-200 px-6 py-3.5 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>

                            {loading ? (
                                <tbody className="bg-white">
                                    <RowSkeleton rows={5} cols={7} />
                                </tbody>
                            ) : filteredUsers.length > 0 ? (
                                <tbody className="bg-white">
                                    {filteredUsers.map((user, ind) => (
                                        <tr key={user.id} className="hover:bg-gray-50/50 transition-colors duration-150">
                                            <td className="border border-gray-200 px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-medium">
                                                {ind + 1}
                                            </td>
                                            <td className="border border-gray-200 px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center gap-3">
                                                    <div>
                                                        <div className="text-sm font-medium text-gray-900">{user.username}</div>
                                                        <div className="text-xs text-gray-500 md:hidden">{user.email}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="border border-gray-200 px-6 py-4 whitespace-nowrap text-sm text-gray-600 hidden md:table-cell">
                                                {user.email}
                                            </td>
                                            <td className="border border-gray-200 px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden lg:table-cell">
                                                {user.gender}
                                            </td>
                                            <td className="border border-gray-200 px-6 py-4 whitespace-nowrap">
                                                <RoleBadge role={user.role} />
                                            </td>
                                            <td className="border border-gray-200 px-6 py-4 whitespace-nowrap">
                                                <StatusBadge status={user.status} />
                                            </td>
                                            <td className="border border-gray-200 px-6 py-4 whitespace-nowrap text-right">
                                                <div className="flex items-center justify-end gap-1">
                                                    <Link
                                                        href={`/admin/user/edit/${user.id}`}
                                                        className="p-2 text-gray-500 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors"
                                                        title="Edit"
                                                    >
                                                        <Edit size={16} />
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(user.id)}
                                                        className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                        title="Delete"
                                                    >
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
                                        <td colSpan={7} className="border border-gray-200 px-6 py-12 text-center">
                                            <div className="flex flex-col items-center gap-2 text-gray-500">
                                                <UserCircle size={40} strokeWidth={1} className="text-gray-300" />
                                                <p className="font-medium">No users found</p>
                                                <p className="text-sm text-gray-400">Try adjusting your search or filter to find what you are looking for.</p>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            )}
                        </table>
                    </div>

                    {/* Optional: Pagination Footer Placeholder */}
                    <div className="px-6 py-3 border-t border-gray-200 bg-gray-50/50 flex justify-between items-center text-sm text-gray-500">
                        <span className="font-medium">Total: {filteredUsers.length} users</span>
                        {/* You can add pagination controls here later */}
                    </div>
                </div>
            </div>
        </div>
    );
};