import {
    PiggyBank,
    Calendar,
    Landmark,
    Briefcase,
    Shield,
    Percent,
    Clock,
    Wallet,
    Lock,
    Zap,
    Home,
    TrendingUp,
    Heart,
    DollarSign,
    CheckCircle,
} from "lucide-react";

interface IconMap {
    [key: string]: any;
}

export const iconMap: IconMap = {
    PiggyBank,
    Calendar,
    Landmark,
    Briefcase,
    Shield,
    Percent,
    Clock,
    Wallet,
    Lock,
    Zap,
    Home,
    TrendingUp,
    Heart,
    DollarSign,
    CheckCircle,
};

export const getIconComponent = (iconName: string | null | undefined): any => {
    if (!iconName) return PiggyBank;
    const icon = iconMap[iconName];
    return icon || PiggyBank; // Fallback to PiggyBank if icon not found
};
