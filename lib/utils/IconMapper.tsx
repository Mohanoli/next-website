import * as LucideIcons from "lucide-react";
import * as FaIcons from "react-icons/fa";

export const getIconComponent = (iconName: string | null | undefined): React.ElementType | undefined => {
    if (!iconName) return undefined;

    // Check Lucide Icons first
    const LucideIcon = (LucideIcons as any)[iconName];
    if (LucideIcon) return LucideIcon;

    // Check FontAwesome Icons
    const FaIcon = (FaIcons as any)[iconName];
    if (FaIcon) return FaIcon;

    return undefined; // Not found
};
