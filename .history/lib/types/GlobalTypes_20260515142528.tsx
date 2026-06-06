// Reusable Input Component
import Image, { StaticImageData } from "next/image";


export interface ITextInputProps {
  name: string;
  type?: string;
  placeholder?: string;
  className?: string;
  control: any;
  errMsg?: string | null;
  icon?: React.ReactNode;

}


// Input types helper
export const InputType = {
  EMAIL: "email",
  TEXT: "text",
  URL: "url",
  NUMBER: "number",
  DATE: "date",
  PASSWORD: "password",
  TEL: "tel",
};

// --- Types ---
export interface NavItem {
  name: string;
  href: string;
  icon: React.ElementType;
  badge?: number;
  children?: Omit<NavItem, 'children'>[];
}


export interface SidebarProps {
  isCollapsed?: boolean;
  onToggle?: () => void;
}


export interface LogoProps {
  showLabel?: boolean;
  textClassName?: string;   // control text color & size
  logoSize?: number;        // control image size
  className?: string;       // wrapper styling
}

export interface MenuItem {
  id: string;
  title: string;
  url?: string;
  icon?: React.ElementType;
  dropdown?: MenuItem[];
}


export interface HeroImage {
  id: number;
  imageUrl: string;
  title: string;
  status: 'active' | 'inactive';
}


export interface RowActionProps {
  editUrl?: string;           // Optional: Use if navigating to a page
  onEdit?: () => void;        // Optional: Use if opening a modal/Popup
  rowId: string;
  deleteAction: (id: string) => void;
}