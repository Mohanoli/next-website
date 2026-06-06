
import { EMIResult, Schedule } from '@/lib/types/GlobalTypes';


export const formatNPR = (n: number): string =>
  'NPR ' +
  new Intl.NumberFormat('en-NP', {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  }).format(n);


export const formatAmount = (n: number): string =>
  new Intl.NumberFormat('en-NP', {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  }).format(n);

/**
 * Core EMI calculation using the standard amortisation formula:
 *   EMI = P × r × (1 + r)^n / ((1 + r)^n − 1)
 *
 * @param principal  - Loan amount in NPR
 * @param annualRate - Annual interest rate (e.g. 8.5 for 8.5%)
 * @param months     - Loan tenure in months
 * @returns EMIResult with EMI, totals and full month-by-month schedule,
 *          or null if any input is zero / invalid.
 */
export function calcEMI(
  principal: number,
  annualRate: number,
  months: number
): EMIResult | null {
  if (!principal || !annualRate || !months) return null;

  const r   = annualRate / 12 / 100;
  const emi = (principal * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);

  const totalPayment  = emi * months;
  const totalInterest = totalPayment - principal;

  const schedule: Schedule[] = [];
  let balance = principal;

  for (let m = 1; m <= months; m++) {
    const intPart  = balance * r;
    const prinPart = emi - intPart;
    balance        = Math.max(0, balance - prinPart);
    schedule.push({ month: m, principal: prinPart, interest: intPart, balance, emi });
  }

  return { emi, totalPayment, totalInterest, schedule };
}

/**
 * Convert tenure to months, supporting both "months" and "years" modes.
 */
export function toMonths(value: number, type: 'months' | 'years'): number {
  return type === 'years' ? value * 12 : value;
}

/**
 * Build a CSV string from the repayment schedule.
 * Ready to feed directly into a Blob for download.
 */
export function buildScheduleCSV(schedule: Schedule[]): string {
  const header = 'Month,EMI (NPR),Principal (NPR),Interest (NPR),Balance (NPR)\n';
  const rows   = schedule
    .map(r =>
      [
        r.month,
        formatAmount(r.emi),
        formatAmount(r.principal),
        formatAmount(r.interest),
        formatAmount(r.balance),
      ].join(',')
    )
    .join('\n');
  return header + rows;
}

/** Inject a one-shot <style> tag, call window.print(), then clean up. */
export const PRINT_STYLE = `
@media print {
  body * { visibility: hidden !important; }
  #emi-printable, #emi-printable * { visibility: visible !important; }
  #emi-printable { position: fixed; inset: 0; padding: 24px; background: white; }
  .no-print { display: none !important; }
}
`;

export function triggerPrint(): void {
  const style      = document.createElement('style');
  style.innerHTML  = PRINT_STYLE;
  document.head.appendChild(style);
  window.print();
  setTimeout(() => document.head.removeChild(style), 1000);
}

export function triggerCSVDownload(schedule: Schedule[], filename = 'EMI_Repayment_Schedule.csv'): void {
  const csv  = buildScheduleCSV(schedule);
  const blob = new Blob([csv], { type: 'text/csv' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}