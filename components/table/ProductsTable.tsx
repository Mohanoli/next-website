'use client';

import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import axiosInstance from '@/lib/config/AxiosConfig';
import { toast } from 'sonner';
import { RowAction } from '@/components/table/RowAction';
import { ProductTableProps } from '@/lib/types/GlobalTypes';

export const ProductTable = ({
    endpoint,
    title,
    description,
    buttonText,
    loadingText,
    emptyText,
    minField,
    minLabel,
    modal,
}: ProductTableProps) => {
    const [items, setItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<any>(null);

    const fetchItems = async () => {
        try {
            setLoading(true);
            const response: any = await axiosInstance.get(endpoint);
            setItems(response?.result || []);
            setError('');
        } catch {
            toast.error(`Failed to fetch ${title.toLowerCase()}`);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchItems();
    }, []);

    const handleEdit = (item: any) => {
        setSelectedItem(item);
        setIsModalOpen(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm(`Are you sure you want to delete this ${title.toLowerCase()}?`))
            return;

        try {
            await axiosInstance.delete(`${endpoint}/${id}`);
            toast.success(`${title} deleted successfully`);
            setItems(items.filter(item => item.id !== id));
        } catch {
            toast.error(`Failed to delete ${title.toLowerCase()}`);
        }
    };

    const handleToggleStatus = async (
        id: number,
        currentStatus: string
    ) => {
        const newStatus =
            currentStatus === 'active' ? 'inactive' : 'active';

        try {
            const res: any = await axiosInstance.put(`${endpoint}/${id}`, {
                status: newStatus,
            });

            setItems(
                items.map(item =>
                    item.id === id ? res.result : item
                )
            );
        } catch {
            toast.error('Failed to update status');
        }
    };

    const handleSuccess = () => {
        setSelectedItem(null);
        fetchItems();
    };

    if (loading) {
        return <div className="p-6 text-center">{loadingText}</div>;
    }

    return (
        <div className="p-6 bg-white rounded-lg shadow">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl font-bold">{title}</h2>
                    <p className="text-gray-600">{description}</p>
                </div>

                <button
                    onClick={() => {
                        setSelectedItem(null);
                        setIsModalOpen(true);
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                    <Plus size={20} />
                    {buttonText}
                </button>
            </div>

            {error && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded">
                    {error}
                </div>
            )}

            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="bg-gray-50 border-b">
                            <th className="px-4 py-3 text-left text-sm font-semibold w-16">SN.</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold"> Title</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold">Interest Rate</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold">{minLabel}</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold">Status</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {items.map((item, index) => (
                            <tr
                                key={item.id}
                                className="border-b hover:bg-gray-50"
                            >
                                <td className="px-4 py-3 text-sm font-medium">
                                    {index + 1}
                                </td>

                                <td className="px-4 py-3 text-sm font-medium">
                                    {item.title}
                                </td>

                                <td className="px-4 py-3 text-sm">
                                    {item.interestRate}
                                </td>

                                <td className="px-4 py-3 text-sm">
                                    {item[minField]}
                                </td>

                                <td className="px-4 py-3 text-sm">
                                    <button
                                        onClick={() =>
                                            handleToggleStatus(
                                                item.id,
                                                item.status
                                            )
                                        }
                                        className={`px-3 py-1 rounded text-sm font-medium ${item.status === 'active'
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-gray-100 text-gray-800'
                                            }`}
                                    >
                                        {item.status}
                                    </button>
                                </td>

                                <td className="px-4 py-3 text-sm">
                                    <RowAction
                                        onEdit={() => handleEdit(item)}
                                        rowId={String(item.id)}
                                        deleteAction={handleDelete}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {items.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                        {emptyText}
                    </div>
                )}
            </div>

            {modal(
                isModalOpen,
                () => {
                    setIsModalOpen(false);
                    setSelectedItem(null);
                },
                handleSuccess,
                selectedItem
            )}
        </div>
    );
};