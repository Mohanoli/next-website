
'use client';

import { useState, useMemo, useRef } from 'react';
import { Calculator, AlertCircle } from 'lucide-react';
import { Schedule } from '@/lib/types/GlobalTypes';
import { FormLabel } from "@/components/form/label";
import { RepaymentSchedule } from '@/pages/quicklinks/emi/Table';
import { DonutChart } from '@/components/home/DonutChart';
import { toast, Toaster } from 'sonner';

const fmt = (n: number) =>
  'NPR ' +
  new Intl.NumberFormat('en-NP', { maximumFractionDigits: 2, minimumFractionDigits: 2 }).format(n);

const fmtShort = (n: number) =>
  new Intl.NumberFormat('en-NP', { maximumFractionDigits: 2, minimumFractionDigits: 2 }).format(n);

// ─── Validation Constants ─────────────────────────────────────────────────────
const VALIDATION_LIMITS = {
  loanAmount: { min: 1000, max: 100000000000000, label: 'NPR 100,000,000,000,000' },
  interestRate: { min: 0.1, max: 100, label: '100%' },
  tenureMonths: { min: 1, max: 360, label: '360 months (30 years)' },
  tenureYears: { min: 1, max: 30, label: '30 years' },
};

// ─── EMI Core calculation ─────────────────────────────────────────────────────
function calcEMI(principal: number, annualRate: number, months: number) {
  if (!principal || !annualRate || !months) return null;
  const r = annualRate / 12 / 100;
  const emi = (principal * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
  const totalPayment = emi * months;
  const totalInterest = totalPayment - principal;

  const schedule: Schedule[] = [];
  let balance = principal;
  for (let m = 1; m <= months; m++) {
    const intPart = balance * r;
    const prinPart = emi - intPart;
    balance = Math.max(0, balance - prinPart);
    schedule.push({ month: m, principal: prinPart, interest: intPart, balance, emi });
  }

  return { emi, totalPayment, totalInterest, schedule };
}

// ─── StatCard ─────────────────────────────────────────────────────────────────
function StatCard({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div
      className={`flex flex-col items-end py-2 ${accent ? 'bg-white' : ''}`}>
      <p className="text-[12px] text-gray-400 font-medium tracking-wide ">{label}</p>
      <p className={`text-3xl font-semi-bold ${accent ? 'text-blue-900' : ''}`}>{value}</p>
    </div>
  );
}

// ─── Print style ──────────────────────────────────────────────────────────────
const PRINT_STYLE = `
@media print {
  body * { visibility: hidden !important; }
  #print-area, #print-area * { visibility: visible !important; }
  #print-area { 
    position: absolute; 
    left: 0; 
    top: 0; 
    width: 100%; 
    padding: 0;
    margin: 0;
  }
  .no-print { display: none !important; }
  table { width: 100% !important; border-collapse: collapse; }
}
  
`;

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function EMICalculator() {
  const [loanAmount, setLoanAmount] = useState('100000');
  const [loanRate, setLoanRate] = useState('8.5');
  const [tenure, setTenure] = useState('12');
  const [tenureType, setTenureType] = useState<'months' | 'years'>('months');

  // Validation errors state
  const [errors, setErrors] = useState<Record<string, string>>({});

  const printRef = useRef<HTMLDivElement>(null);

  const months = tenureType === 'years' ? Number(tenure) * 12 : Number(tenure);

  // ─── Validation Functions ───────────────────────────────────────────────────
  const validateLoanAmount = (value: string): boolean => {
    const num = Number(value);
    if (isNaN(num) || num < VALIDATION_LIMITS.loanAmount.min) {
      toast.error(`Loan amount must be at least NPR ${VALIDATION_LIMITS.loanAmount.min.toLocaleString()}`, {
        icon: <AlertCircle className="w-5 h-5 text-red-500" />,
      });
      setErrors(prev => ({ ...prev, loanAmount: `Minimum NPR ${VALIDATION_LIMITS.loanAmount.min.toLocaleString()}` }));
      return false;
    }
    if (num > VALIDATION_LIMITS.loanAmount.max) {
      toast.error(`Loan amount exceeds maximum limit of ${VALIDATION_LIMITS.loanAmount.label}`, {
        icon: <AlertCircle className="w-5 h-5 text-red-500" />,
        duration: 5000,
      });
      setErrors(prev => ({ ...prev, loanAmount: `Maximum ${VALIDATION_LIMITS.loanAmount.label}` }));
      return false;
    }
    setErrors(prev => ({ ...prev, loanAmount: '' }));
    return true;
  };

  const validateInterestRate = (value: string): boolean => {
    const num = Number(value);
    if (isNaN(num) || num <= 0) {
      toast.error('Interest rate must be greater than 0', {
        icon: <AlertCircle className="w-5 h-5 text-red-500" />,
      });
      setErrors(prev => ({ ...prev, loanRate: 'Must be greater than 0' }));
      return false;
    }
    if (num > VALIDATION_LIMITS.interestRate.max) {
      toast.error(`Interest rate cannot exceed ${VALIDATION_LIMITS.interestRate.label}`, {
        icon: <AlertCircle className="w-5 h-5 text-red-500" />,
      });
      setErrors(prev => ({ ...prev, loanRate: `Maximum ${VALIDATION_LIMITS.interestRate.label}` }));
      return false;
    }
    setErrors(prev => ({ ...prev, loanRate: '' }));
    return true;
  };

  const validateTenure = (value: string, type: 'months' | 'years'): boolean => {
    const num = Number(value);
    const limits = type === 'years' ? VALIDATION_LIMITS.tenureYears : VALIDATION_LIMITS.tenureMonths;

    if (isNaN(num) || num < limits.min) {
      toast.error(`${type === 'years' ? 'Years' : 'Months'} must be at least ${limits.min}`, {
        icon: <AlertCircle className="w-5 h-5 text-red-500" />,
      });
      setErrors(prev => ({ ...prev, tenure: `Minimum ${limits.min} ${type}` }));
      return false;
    }
    if (num > limits.max) {
      toast.error(`${type === 'years' ? 'Years' : 'Months'} cannot exceed ${limits.label}`, {
        icon: <AlertCircle className="w-5 h-5 text-red-500" />,
      });
      setErrors(prev => ({ ...prev, tenure: `Maximum ${limits.label}` }));
      return false;
    }
    setErrors(prev => ({ ...prev, tenure: '' }));
    return true;
  };

  // ─── Handlers with Validation ───────────────────────────────────────────────
  const handleLoanAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLoanAmount(value);
    if (value) validateLoanAmount(value);
  };

  const handleLoanAmountBlur = () => {
    validateLoanAmount(loanAmount);
  };

  const handleLoanRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLoanRate(value);
    if (value) validateInterestRate(value);
  };

  const handleLoanRateBlur = () => {
    validateInterestRate(loanRate);
  };

  const handleTenureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTenure(value);
    if (value) validateTenure(value, tenureType);
  };

  const handleTenureBlur = () => {
    validateTenure(tenure, tenureType);
  };

  const handleTenureTypeChange = (type: 'months' | 'years') => {
    setTenureType(type);
    if (tenure) {
      setTimeout(() => validateTenure(tenure, type), 0);
    }
  };

  const result = useMemo(
    () => {
      const isValid =
        Number(loanAmount) >= VALIDATION_LIMITS.loanAmount.min &&
        Number(loanAmount) <= VALIDATION_LIMITS.loanAmount.max &&
        Number(loanRate) > 0 &&
        Number(loanRate) <= VALIDATION_LIMITS.interestRate.max &&
        Number(tenure) >= 1 &&
        Number(tenure) <= (tenureType === 'years' ? VALIDATION_LIMITS.tenureYears.max : VALIDATION_LIMITS.tenureMonths.max);

      return isValid ? calcEMI(Number(loanAmount), Number(loanRate), months) : null;
    },
    [loanAmount, loanRate, months, tenureType]
  );
  // ── Print handler ──────────────────────────────────────────────────────────
  const handlePrint = () => {
    const style = document.createElement('style');
    style.innerHTML = PRINT_STYLE;
    document.head.appendChild(style);
    window.print();
    document.head.removeChild(style);
  };

  const handleDownload = () => {
    if (!result) return;
    const header = 'Month,EMI (NPR),Principal (NPR),Interest (NPR),Balance (NPR)\n';
    const rows = result.schedule
      .map(r => `${r.month},${r.emi.toFixed(2)},${r.principal.toFixed(2)},${r.interest.toFixed(2)},${r.balance.toFixed(2)}`)
      .join('\n');
    const blob = new Blob([header + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Loan_Schedule_${loanAmount}.csv`;
    a.click();
  };

  return (
    <div className="min-h-screen bg-white">

      {/* UI Header - Hidden on Print */}
      <div className="no-print bg-white px-6 lg:px-12 py-3 ">
        <div className="max-w-6xl mx-auto flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-900 flex items-center justify-center shadow">
            <Calculator size={20} className="text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-blue-900 leading-tight">EMI Calculator</h1>
            <p className="text-gray-400 text-xs">Equated Monthly Installment — SFACL Dhanauri</p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-3 lg:px-12 py-2">
        {/* Input Section - Hidden on Print */}
        <div className="no-print grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12 items-start">
          <div className="space-y-5">
            {/* Loan Amount */}
            <div>
              <FormLabel labelText="Loan Amount" htmlFor="loanAmount" />
              <div className={`flex rounded-lg border overflow-hidden ${errors.loanAmount ? 'border-red-500 ring-1 ring-red-200' : 'border-gray-200 focus-within:border-blue-400'}`}>
                <span className="px-3 bg-gray-300 flex items-center text-sm font-semibold">NPR</span>
                <input
                  id="loanAmount"
                  type="number"
                  min={VALIDATION_LIMITS.loanAmount.min}
                  max={VALIDATION_LIMITS.loanAmount.max}
                  value={loanAmount}
                  onChange={handleLoanAmountChange}
                  onBlur={handleLoanAmountBlur}
                  className="flex-1 px-3 py-1.5 outline-none" />
              </div>
              {errors.loanAmount && (
                <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.loanAmount}
                </p>
              )}
              <p className="mt-1 text-xs text-gray-400">Max: {VALIDATION_LIMITS.loanAmount.label}</p>
            </div>

            {/* Interest Rate */}
            <div>
              <FormLabel labelText="Interest Rate (%)" htmlFor="loanRate" />
              <div className={`flex rounded-lg border overflow-hidden ${errors.loanRate ? 'border-red-500 ring-1 ring-red-200' : 'border-gray-200 focus-within:border-blue-400'}`}>
                <span className="px-3 bg-gray-300 flex items-center text-sm font-semibold">%</span>
                <input
                  id="loanRate"
                  type="number"
                  step="0.1"
                  min={VALIDATION_LIMITS.interestRate.min}
                  max={VALIDATION_LIMITS.interestRate.max}
                  value={loanRate}
                  onChange={handleLoanRateChange}
                  onBlur={handleLoanRateBlur}
                  className="flex-1 px-3 py-1.5 outline-none" />
              </div>
              {errors.loanRate && (
                <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.loanRate}
                </p>
              )}
            </div>

            {/* Loan Tenure */}
            <div>
              <FormLabel labelText="Loan Tenure" htmlFor="tenure" />
              <div className={`flex rounded-lg border overflow-hidden ${errors.tenure ? 'border-red-500 ring-1 ring-red-200' : 'border-gray-200 focus-within:border-blue-400'}`}>
                <input
                  id="tenure"
                  type="number"
                  min={1}
                  max={tenureType === 'years' ? VALIDATION_LIMITS.tenureYears.max : VALIDATION_LIMITS.tenureMonths.max}
                  value={tenure}
                  onChange={handleTenureChange}
                  onBlur={handleTenureBlur}
                  className="flex-1 px-3 py-1.5 outline-none"
                  placeholder="e.g. 12" />
              </div>
              {errors.tenure && (
                <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.tenure}
                </p>
              )}

              {/* Radio buttons */}
              <div className="flex items-center gap-4 mt-3 text-sm text-gray-600">
                {(['months', 'years'] as const).map(t => (
                  <label key={t} className="flex items-center gap-1.5 cursor-pointer select-none">
                    <input
                      type="radio"
                      name="tenureType"
                      value={t}
                      checked={tenureType === t}
                      onChange={() => handleTenureTypeChange(t)}
                      className="accent-blue-900" />
                    <span className="capitalize">
                      {t.charAt(0).toUpperCase() + t.slice(1)}
                    </span>
                  </label>
                ))}
              </div>
              <p className="mt-1 text-xs text-gray-400">
                Max: {tenureType === 'years' ? VALIDATION_LIMITS.tenureYears.label : VALIDATION_LIMITS.tenureMonths.label}
              </p>
            </div>
          </div>

          {/* Result Section of EMI summary */}
          <div className="flex flex-col justify-center items-center gap-3">
            {result && (
              <>
                <StatCard label="Monthly EMI" value={fmt(result.emi)} accent />
                <StatCard label="Total Interest" value={fmt(result.totalInterest)} />
                <StatCard label="Total Amount" value={fmt(result.totalPayment)} />
              </>
            )}
          </div>
          <div className="flex flex-col">
            {result && (
              <DonutChart
                primary={{ value: Number(loanAmount), color: '#1e3a8a', label: 'Principal' }}
                secondary={{ value: result.totalInterest, color: '#dc2626', label: 'Interest' }} />
            )}
          </div>
        </div>

        {/* --- PRINTABLE AREA START --- */}
        <div id="print-area" className="space-y-6">
          {/* Custom Print Header (Only visible in Print) */}
          {result && (
            <div className="hidden print:flex flex-row justify-between items-center border-b-2 border-blue-900 pb-4 mb-6">
              <div className="text-left">
                <p className="text-[10px] uppercase text-gray-500 font-bold">Loan Amount</p>
                <p className="text-blue-900 font-bold text-lg">{fmt(Number(loanAmount))}</p>
              </div>
              <div className="text-left border-l pl-6">
                <p className="text-[10px] uppercase text-gray-500 font-bold">Monthly EMI</p>
                <p className="text-green-600 font-bold text-lg">{fmt(result.emi)}</p>
              </div>
              <div className="text-left border-l pl-6">
                <p className="text-[10px] uppercase text-gray-500 font-bold">Total Period</p>
                <p className="text-orange-600 font-bold text-lg">{months} Months</p>
              </div>
              <div className="text-left border-l pl-6">
                <p className="text-[10px] uppercase text-gray-500 font-bold">Total Interest</p>
                <p className="text-red-600 font-bold text-lg">{fmt(result.totalInterest)}</p>
              </div>
            </div>
          )}

          {/* Scrollable wrapper for the schedule (only on screen) */}
          <div className="schedule-scroll-wrapper">
            {result && (
              <RepaymentSchedule
                result={result}
                loanAmount={Number(loanAmount)}
                onPrint={handlePrint}
                onDownload={handleDownload} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}