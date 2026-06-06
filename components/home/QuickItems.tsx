import {Calculator,Phone,CalendarDays,MessageCircle,FileText,Landmark,} from 'lucide-react';
import { QuickItem } from '@/lib/types/GlobalTypes';

export const QUICK_ITEMS: QuickItem[] = [
  {
    id: 'calculator',
    label: 'Calculator',
    icon: Calculator,
    href: '/calculator',
    color: 'bg-emerald-500',
    textColor: 'text-emerald-400',
    isNew: true,
    
  },
  {
    id: 'contact',
    label: 'loan plan',
    icon: Phone,
    href: '/loan-repayment-plan',
    color: 'bg-blue-500',
    textColor: 'text-blue-400',
    isNew: true,

  },
  {
    id: 'events',
    label: 'Events',
    icon: CalendarDays,
    href: '/events',
    color: 'bg-violet-500',
    textColor: 'text-violet-400',
    isNew: true,

  },
  {
    id: 'loan',
    label: 'Apply Loan',
    icon: Landmark,
    href: '/services/loan',
    color: 'bg-amber-500',
    textColor: 'text-amber-400',
    isNew: true,

  },
  {
    id: 'complaint',
    label: 'Complaint',
    icon: MessageCircle,
    href: '/grievance',
    color: 'bg-rose-500',
    textColor: 'text-rose-400',
    isNew: true,

  },
  {
    id: 'reports',
    label: 'Reports',
    icon: FileText,
    href: '/reports',
    color: 'bg-cyan-500',
    textColor: 'text-cyan-400',
    isNew: true,

  },


];
