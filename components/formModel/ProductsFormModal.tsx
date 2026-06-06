'use client';

import { useState, useEffect } from 'react';
import { X, Plus } from 'lucide-react';
import axiosInstance from '@/lib/config/AxiosConfig';
import { toast } from 'sonner';
import { ProductFormModalProps } from '@/lib/types/GlobalTypes';


export const ProductsFormModal = ({
    isOpen,
    onClose,
    onSuccess,
    data,
    title,
    endpoint,
    amountKey,
    amountLabel,
}: ProductFormModalProps) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [facilities, setFacilities] = useState<string[]>([]);
    const [newFacility, setNewFacility] = useState('');

    const defaultForm = {
        title: '',
        subtitle: '',
        description: '',
        icon: '',
        accentColor: '#14b8a6',
        interestRate: '8.5% p.a.',
        [amountKey]: 'Rs. 500',
        tenure: 'Flexible',
        status: 'active',
    };

    const [formData, setFormData] = useState(defaultForm);
    useEffect(() => {
        if (!isOpen) return;

        if (data) {
            setFormData({
                ...defaultForm,
                ...data,
            });

            setFacilities(data.facilities || []);
        } else {
            setFormData(defaultForm);
            setFacilities([]);
        }
    }, [data, isOpen]);

    const handleChange = (e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const addFacility = () => {
        const value = newFacility.trim();

        if (value && !facilities.includes(value)) {
            setFacilities([...facilities, value]);
            setNewFacility('');
        }
    };

    const removeFacility = (index: number) => {
        setFacilities(facilities.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const payload = {
                ...formData,
                facilities,
            };

            if (data?.id) {
                await axiosInstance.put(
                    `${endpoint}/${data.id}`,
                    payload
                );
                toast.success(`${title} updated successfully`);
            } else {
                await axiosInstance.post(endpoint, payload);
                toast.success(`${title} created successfully`);
            }

            onSuccess();
            onClose();
        } catch (err) {
            const message =
                err instanceof Error
                    ? err.message
                    : `Failed to save ${title}`;

            setError(message);
            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full">
                <div className="flex justify-between items-center p-6 border-b">
                    <h2 className="text-xl font-bold">
                        {data ? `Edit ${title}` : `Add New ${title}`}
                    </h2>

                    <button onClick={onClose}>
                        <X size={24} />
                    </button>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="p-6 space-y-4 max-h-[70vh] overflow-y-auto"
                >
                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                            {error}
                        </div>
                    )}

                    {/* same design */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded-lg"
                            placeholder='please put title..'
                        />

                        <input
                            name="subtitle"
                            value={formData.subtitle}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded-lg"
                            placeholder='please put subtitle..'
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Description *</label>

                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows={3}
                            required
                            className="w-full px-4 py-2 border rounded-lg"
                        />
                    </div>


                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Icon Name</label>
                            <input
                                type="text"
                                name="icon"
                                placeholder="e.g., Calendar, PiggyBank"
                                value={formData.icon}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Color</label>
                            <input
                                type="color"
                                name="accentColor"
                                value={formData.accentColor}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none h-10"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Interest Rate</label>
                            <input
                                type="text"
                                name="interestRate"
                                placeholder="e.g., 8.5% p.a."
                                value={formData.interestRate}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Min. Balance</label>
                            <input
                                type="text"
                                name="minBalance"
                                placeholder="e.g., Rs. 500"
                                value={formData.minBalance || ''}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Tenure</label>
                            <input
                                type="text"
                                name="tenure"
                                placeholder="e.g., Flexible"
                                value={formData.tenure}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>
                    </div>

                    {/* facilities */}
                    <div className="space-y-2 border rounded-lg p-4 bg-gray-50">
                        <div className="flex gap-2">
                            <input
                                type='text'
                                value={newFacility}
                                placeholder='type features here..'
                                onChange={(e) =>
                                    setNewFacility(e.target.value)
                                }
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                        addFacility();
                                    }
                                }}
                                className="flex-1 px-3 py-2 border rounded-lg"
                            />

                            <button
                                type="button"
                                onClick={addFacility}
                                className="px-3 py-2 bg-green-600 text-white rounded-lg"
                            >
                                <Plus size={16} />
                            </button>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {facilities.map((facility, index) => (
                                <div
                                    key={index}
                                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center gap-2 text-sm"
                                >
                                    {facility}

                                    <button
                                        type="button"
                                        onClick={() =>
                                            removeFacility(index)
                                        }
                                    >
                                        <X size={14} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg"
                    >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>

                    <div className="flex justify-end gap-3 pt-4 border-t">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-100 rounded-lg"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                        >
                            {loading ? 'Saving...' : `Save ${title}`}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};