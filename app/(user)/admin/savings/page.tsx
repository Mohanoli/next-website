import { SavingTable } from '@/components/cms/products/savings/SavingTable';

export default function SavingAdminPage() {
    return (
        <div className="min-h-screen bg-slate-50 p-6">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold">Saving Management</h1>
                    <p className="text-gray-600 mt-2">Create, edit, and manage saving products</p>
                </div>
                <SavingTable />
            </div>
        </div>
    );
}
