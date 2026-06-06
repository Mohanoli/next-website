'use client';

import { ProductTable } from '@/components/table/ProductsTable';
import { LoanFormModal } from './LoanFormModal';

export const LoanTable = () => {
    return (
        <ProductTable
            endpoint="/loans-services"
            title="Loan Management"
            description="Manage loan products and their details"
            buttonText="Add New Loan"
            loadingText="Loading loans..."
            emptyText='No loans found. Click "Add New Loan" to create one.'
            minField="minBalance"
            minLabel="Min. Balance"
            modal={(isOpen, onClose, onSuccess, selectedItem) => (
                <LoanFormModal
                    isOpen={isOpen}
                    onClose={onClose}
                    onSuccess={onSuccess}
                    loan={selectedItem}
                />
            )}
        />
    );
};
