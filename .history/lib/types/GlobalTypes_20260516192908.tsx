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

export interface Banner {
  id: number;
  title: string;
  imageUrl: string;
  status: 'active' | 'inactive';
}



export interface BannerFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    banner?: Banner;
}



export interface MemberFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  member?: any;
  // Props to make it reusable
  apiEndpoint: string; // e.g., 'team' or 'bod'
  entityName: string;  // e.g., 'Team Member' or 'Board Member'
}


export interface Director {
  id: number;
  name: string;
  role: string;
  image: string | StaticImageData;
  tenure: string;
  expertise: string[];
  //bio: string;
  social?: {
    linkedin?: string;
    email?: string;
    phone?: string;
    facebook?: string;
  };
}


export interface BodFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  member?: any;
}

// Define the shape of the Member object
export interface Member {
  id: number;
  name: string;
  role: string;
  imageUrl: string;
  status: 'active' | 'inactive';
  tenure: string;
}

// Define the props the Modal must accept
export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  member?: Member;
}

// Define the props for the Table Component
export interface MemberTableProps {
  title: string;                // e.g., "Board of Directors"
  description: string;          // e.g., "Manage board members..."
  apiEndpoint: string;          // e.g., "bod" or "team"
  deleteEndpoint: string;       // e.g., "bod" or "teams" (if different from apiEndpoint)
  ModalComponent: React.FC<ModalProps>; // The specific modal to render
}


export interface TeamFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  member?: any;
}


export interface INavMenu {
    id: number;
    title: string;
    url: string | null;
    icon: string | null;
    parent_id: number | null;
    order: number;
    isActive: boolean;
    parent?: { id: number; title: string; };
}


export interface HighlightCarouselProps {
    data: any[];
    title: string;

    // style customization
    cardClass?: string;
    imageHeight?: string;
}


export type ProductType = "saving" | "loan";

export type Product = {
  title: string;
  url: string;
  image: string | StaticImageData; // allow imported images
  type: string;
};

export type ServiceType = "saving" | "loan" | "share" | "insurance";

export interface Service {
  title: string;
  url: string;
  image: string | StaticImageData;
  type: string;
};


export interface QuickItem {
  isNew: boolean;
  id: string;
  label: string;
  icon: React.ElementType;
  href?: string;
  action?: 'calculator' | 'contact';
  color: string;      // icon bg accent
  textColor: string;  // label text color on hover strip
}

export interface Schedule {
  month: number;
  principal: number;
  interest: number;
  balance: number;
  emi: number;
}

export interface EMIResult {
  emi: number;
  totalPayment: number;
  totalInterest: number;
  schedule: Schedule[];
}

export interface SummaryTileProps {
  Icon: React.ElementType;
  label: string;
  value: string;
  color: string;
}




export interface RepaymentScheduleProps {
  result: EMIResult;
  /** Raw principal amount in NPR — shown in the summary bar */
  loanAmount: number;
  onPrint: () => void;
  onDownload: () => void;
}

export interface Segment {
  value: number;
  color: string;
  label: string;
}


export interface DonutChartProps {
  primary: Segment;
  secondary: Segment;
  gap?: number;
  outerRadius?: number;
  innerRadius?: number;
  size?: number;
}


export interface UserEditProps {
  userId: string;
}

export interface IUser {
    createdAt: string;
    email: string;
    gender: string;
    image: string;
    username: string;
    role: string;
    status: string;
    updatedAt: string;
    id: string | number;
}
