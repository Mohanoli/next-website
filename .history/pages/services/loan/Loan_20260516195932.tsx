"use client";

import { loanProducts } from "./LoanList";
import ProductPage from "@/components/ui/servicecard/ServiceCard";

export default function LoanAccountsPage() {
    return <ProductPage products={loanProducts} 
    title="Loan Products for dhanauri sanakisan" />;
}