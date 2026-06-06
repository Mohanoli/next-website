'use client';

import { ProductTable } from '@/components/table/ProductsTable';
import { SavingFormModal } from './SavingFormModal';

export const SavingTable = () => {
    return (
        <ProductTable
            endpoint="/saving-services"
            title="Saving Management"
            description="Manage saving products and their details"
            buttonText="Add New Saving"
            loadingText="Loading savings..."
            emptyText='No savings found. Click "Add New Saving" to create one.'
            minField="minBalance"
            minLabel="Min. Balance"
            modal={(isOpen, onClose, onSuccess, selectedItem) => (
                <SavingFormModal
                    isOpen={isOpen}
                    onClose={onClose}
                    onSuccess={onSuccess}
                    saving={selectedItem}
                />
            )}
        />
    );
};
