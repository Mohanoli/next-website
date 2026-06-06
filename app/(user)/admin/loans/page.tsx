'use client';

import { LoanTable } from '@/components/cms/products/loans/LoanTable';

export default function LoansAdminPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold">Loan Management</h1>
                <p className="text-gray-600 mt-2">Create, edit, and manage loan products</p>
            </div>
            <LoanTable />
        </div>
    );
}
