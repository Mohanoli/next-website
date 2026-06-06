"use client";

import { useEffect, useState } from "react";
import ProductPage from "@/components/ui/servicecard/ServiceCard";
import axiosInstance from "@/lib/config/AxiosConfig";
import { transformLoanData } from "@/lib/utils/LoanTransform";
import { LoanProduct } from "@/lib/types/GlobalTypes";
import { loanProducts as defaultLoanProducts } from "@/components/servicelist/LoanList";

export default function LoanAccountsPage() {
    const [loanProducts, setLoanProducts] = useState<LoanProduct[]>(
        defaultLoanProducts
    );
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchLoans = async () => {
            try {
                setLoading(true);
                setError(null);
                const response: any = await axiosInstance.get("/loans-services");

                if (response?.result && Array.isArray(response.result)) {
                    const transformedLoans = transformLoanData(response.result);
                    setLoanProducts(transformedLoans);
                } else {
                    // Fallback to default if API returns unexpected format
                    setLoanProducts(defaultLoanProducts);
                }
            } catch (err) {
                console.error("Failed to fetch loans:", err);
                // Use default products on error
                setLoanProducts(defaultLoanProducts);
                setError("Failed to load loan products. Showing default products.");
            } finally {
                setLoading(false);
            }
        };

        fetchLoans();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
                    <p className="text-slate-600">Loading loan products...</p>
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
            <ProductPage products={loanProducts} title="Loan Scheme List" />
        </>
    );
}