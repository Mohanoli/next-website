'use client';

import React, { useState, useEffect, useRef } from 'react';
import axiosInstance from '@/lib/config/AxiosConfig';
import { toast } from 'sonner';
import Image from 'next/image';

const CompanyProfilePage = () => {
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        phone: '',
        facebook: '',
        twitter: '',
        linkedin: '',
        youtube: ''
    });
    const [logoPreview, setLogoPreview] = useState<string | null>(null);
    const [logoFile, setLogoFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const fetchCompanyInfo = async () => {
            try {
                const response: any = await axiosInstance.get('/company-info');
                const data = response.result;
                if (data) {
                    setFormData({
                        name: data.name || '',
                        address: data.address || '',
                        phone: data.phone || '',
                        facebook: data.facebook || '',
                        twitter: data.twitter || '',
                        linkedin: data.linkedin || '',
                        youtube: data.youtube || ''
                    });
                    if (data.logoUrl) {
                        if (data.logoUrl.startsWith('/uploads')) {
                            setLogoPreview(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000'}${data.logoUrl}`);
                        } else {
                            setLogoPreview(data.logoUrl);
                        }
                    }
                }
            } catch (error) {
                console.error("Failed to load company info", error);
            }
        };
        fetchCompanyInfo();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setLogoFile(file);
            setLogoPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const data = new FormData();
        data.append('name', formData.name);
        data.append('address', formData.address);
        data.append('phone', formData.phone);
        data.append('facebook', formData.facebook);
        data.append('twitter', formData.twitter);
        data.append('linkedin', formData.linkedin);
        data.append('youtube', formData.youtube);
        if (logoFile) {
            data.append('logo', logoFile);
        }

        try {
            const response: any = await axiosInstance.post('/company-info', data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            if (response.success) {
                toast.success('Company Info updated successfully');
            } else {
                toast.error(response.message || 'Failed to update');
            }
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-0">
            <h1 className="text-2xl font-bold mb-6">Company Profile</h1>

            <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-md max-w-4xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Basic Info */}
                    <div className="space-y-4">
                        <h2 className="text-lg font-semibold border-b pb-2">Basic Information</h2>

                        <div>
                            <label className="block text-sm font-medium mb-1">Company Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Address</label>
                            <input
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Phone Number</label>
                            <input
                                type="text"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Company Logo</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                ref={fileInputRef}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {logoPreview && (
                                <div className="mt-3 relative w-32 h-32 border rounded-md overflow-hidden bg-gray-100">
                                    <Image src={logoPreview} alt="Logo Preview" fill className="object-contain" />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Social Links */}
                    <div className="space-y-4">
                        <h2 className="text-lg font-semibold border-b pb-2">Social Links</h2>

                        <div>
                            <label className="block text-sm font-medium mb-1">Facebook URL</label>
                            <input
                                type="url"
                                name="facebook"
                                value={formData.facebook}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Twitter URL</label>
                            <input
                                type="url"
                                name="twitter"
                                value={formData.twitter}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">LinkedIn URL</label>
                            <input
                                type="url"
                                name="linkedin"
                                value={formData.linkedin}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">YouTube URL</label>
                            <input
                                type="url"
                                name="youtube"
                                value={formData.youtube}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                </div>

                <div className="mt-8 flex justify-end">
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium transition-colors disabled:opacity-50"
                    >
                        {loading ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CompanyProfilePage;
