import { LoanProduct } from "@/lib/types/GlobalTypes";
import { getIconComponent } from "@/lib/utils/IconMapper";
import { Percent, Wallet, Clock } from "lucide-react";

export interface BackendLoanService {
    id: number;
    title: string;
    subtitle: string;
    description: string;
    icon: string | null;
    accentColor: string;
    interestRate: string;
    minBalance: string;
    tenure: string;
    facilities: string[];
    status: string;
    createdAt?: string;
    updatedAt?: string;
}

export const transformLoanData = (
    backendLoans: BackendLoanService[]
): LoanProduct[] => {
    return backendLoans
        .filter((loan) => loan.status === "active")
        .map((loan) => ({
            id: loan.id.toString(),
            title: loan.title,
            subtitle: loan.subtitle,
            description: loan.description,
            icon: getIconComponent(loan.icon),
            accentColor: loan.accentColor || "#14b8a6",
            features: [
                {
                    icon: Percent,
                    label: "Interest Rate",
                    value: loan.interestRate,
                },
                {
                    icon: Wallet,
                    label: "Min. Balance",
                    value: loan.minBalance,
                },
                {
                    icon: Clock,
                    label: "Tenure",
                    value: loan.tenure,
                },
            ],
            facilities: Array.isArray(loan.facilities) ? loan.facilities : [],
        }));
};
