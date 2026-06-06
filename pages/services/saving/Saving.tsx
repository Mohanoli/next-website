"use client";

import { useEffect, useState } from "react";
import ProductPage from "@/components/ui/servicecard/ServiceCard";
import axiosInstance from "@/lib/config/AxiosConfig";
import { transformSavingData } from "@/lib/utils/SavingTransform";
import { SavingProduct } from "@/lib/types/GlobalTypes";
import { savingProducts as defaultSavingProducts } from "@/components/servicelist/SavingList";

export default function SavingAccountsPage() {
    const [savingProducts, setSavingProducts] = useState<SavingProduct[]>(
        defaultSavingProducts
    );
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchSavings = async () => {
            try {
                setLoading(true);
                setError(null);
                const response: any = await axiosInstance.get("/saving-services");

                if (response?.result && Array.isArray(response.result)) {
                    const transformedSavings = transformSavingData(response.result);
                    setSavingProducts(transformedSavings);
                } else {
                    // Fallback to default if API returns unexpected format
                    setSavingProducts(defaultSavingProducts);
                }
            } catch (err) {
                console.error("Failed to fetch savings:", err);
                // Use default products on error
                setSavingProducts(defaultSavingProducts);
                setError("Failed to load saving products. Showing default products.");
            } finally {
                setLoading(false);
            }
        };

        fetchSavings();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
                    <p className="text-slate-600">Loading saving products...</p>
                </div>
            </div>
        );
    }

    return (
        <>
            {error && (
                <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-4 m-4 rounded-lg">
                    {error}
                </div>
            )}
            <ProductPage products={savingProducts} title="Saving Products" />
        </>
    );
}