import { SavingProduct } from "@/lib/types/GlobalTypes";
import { getIconComponent } from "@/lib/utils/IconMapper";
import { Percent, Wallet, Clock } from "lucide-react";

export interface BackendSavingService {
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

export const transformSavingData = (
    backendSavings: BackendSavingService[]
): SavingProduct[] => {
    return backendSavings
        .filter((saving) => saving.status === "active")
        .map((saving) => ({
            id: saving.id.toString(),
            title: saving.title,
            subtitle: saving.subtitle,
            description: saving.description,
            icon: getIconComponent(saving.icon),
            accentColor: saving.accentColor || "#14b8a6",
            features: [
                {
                    icon: Percent,
                    label: "Interest Rate",
                    value: saving.interestRate,
                },
                {
                    icon: Wallet,
                    label: "Min. Balance",
                    value: saving.minBalance,
                },
                {
                    icon: Clock,
                    label: "Tenure",
                    value: saving.tenure,
                },
            ],
            facilities: Array.isArray(saving.facilities) ? saving.facilities : [],
        }));
};
