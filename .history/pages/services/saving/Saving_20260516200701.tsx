"use client";

import { savingProducts } from "@/components/servicelist/SavingList";
import ProductPage from "@/components/ui/servicecard/ServiceCard";

export default function SavingAccountsPage() {
    return <ProductPage products={savingProducts} title="Saving Products" />;
}