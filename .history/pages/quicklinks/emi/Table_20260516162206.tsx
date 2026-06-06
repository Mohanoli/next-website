'use client';

import { Printer, FileSpreadsheet, IndianRupee, TrendingDown, Calendar } from 'lucide-react';
import { formatNPR, formatAmount } from './EmiUtils';
import { SummaryTileProps, RepaymentScheduleProps } from '@/lib/types/GlobalTypes';

function SummaryTile({ Icon, label, value, color }: SummaryTileProps) {
  return (
    <div className="bg-white px-4 py-3 flex items-start gap-3">
      <Icon size={16} className={`${color} mt-0.5 flex`} aria-hidden="true" />
      <div className="min-w-0">
        <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider truncate">{label}</p>
        <p className={`text-sm font-bold ${color} truncate`}>{value}</p>
      </div>
    </div>
  );
}

export function RepaymentSchedule({
  result,
  loanAmount,
  onPrint,
  onDownload,
}: RepaymentScheduleProps) {
  const summaryTiles: SummaryTileProps[] = [
    { Icon: IndianRupee, label: 'Loan Amount', value: formatNPR(loanAmount), color: 'text-blue-900' },
    { Icon: TrendingDown, label: 'Monthly EMI', value: formatNPR(result.emi), color: 'text-emerald-700' },
    { Icon: Calendar, label: 'Total Months', value: `${result.schedule.length} months`, color: 'text-amber-700' },
    { Icon: IndianRupee, label: 'Total Interest', value: formatNPR(result.totalInterest), color: 'text-red-600' },
  ];

  return (
    <div className="bg-white overflow-hidden">

      {/* Header */}
      <div className="px-6 lg:px-8 py-5 border-b border-gray-100 flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-base font-bold text-gray-800">
            Monthly breakdown of EMI in{' '}
            <span className="text-blue-900 font-extrabold">Principal</span>{' '}
            and{' '}
            <span className="text-blue-900 font-extrabold">Interest</span>{' '}
            components
          </h2>
          <p className="text-xs text-gray-400 mt-0.5">
            {result.schedule.length} monthly installments
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex gap-2 no-print">
          <button
            type="button"
            onClick={onPrint}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 text-gray-600 text-xs font-medium transition-all shadow-sm"
          >
            <Printer size={13} aria-hidden="true" /> Print
          </button>

          <button
            type="button"
            onClick={onDownload}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-700 hover:bg-green-600 text-white text-xs font-semibold transition-all shadow-sm"
          >
            <FileSpreadsheet size={13} aria-hidden="true" /> Excel
          </button>
        </div>
      </div>

      {/* Summary tiles */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-gray-100">
        {summaryTiles.map(tile => (
          <SummaryTile key={tile.label} {...tile} />
        ))}
      </div>

      {/* 
         TABLE WRAPPER - CRITICAL FIX:
         Added 'print:max-h-none print:overflow-visible'
         This forces the container to expand to full height during printing.
      */}
      <div
        className={`overflow-x-auto ${result.schedule.length > 12
          ? 'max-h-120 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400 print:max-h-none print:overflow-visible'
          : ''
          }`}
      >
        <table className="w-full text-sm border-collapse">

          {/* Table Header - Added 'print:static' to avoid sticky issues */}
          <thead className="sticky top-0 z-10 print:static">
            <tr className="bg-blue-900 text-white">
              {['Month', 'Principal', 'Interest', 'EMI', 'Balance'].map(col => (
                <th
                  key={col}
                  className="px-6 py-3 text-center font-semibold text-xs uppercase tracking-wider"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {result.schedule.map((row, i) => (
              <tr
                key={row.month}
                className={[
                  'border-b border-gray-50 transition-colors hover:bg-blue-50/40',
                  i % 2 === 0 ? 'bg-white' : 'bg-gray-50/60',
                ].join(' ')}
              >
                <td className="px-6 py-3 text-center text-gray-500 font-medium text-xs">
                  {row.month}
                </td>

                <td className="px-6 py-3 text-center text-gray-700 font-medium">
                  NPR {formatAmount(row.principal)}
                </td>

                <td className="px-6 py-3 text-center text-blue-900 font-semibold">
                  NPR {formatAmount(row.interest)}
                </td>

                <td className="px-6 py-3 text-center text-red-600 font-medium">
                  NPR {formatAmount(row.emi)}
                </td>

                <td className="px-6 py-3 text-center">
                  <span
                    className={`font-semibold ${row.balance < 1 ? 'text-emerald-600' : 'text-gray-700'
                      }`}
                  >
                    {row.balance < 1
                      ? 'NPR 0.00'
                      : `NPR ${formatAmount(row.balance)}`}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>

          {/* Footer - Added 'print:static' */}
          <tfoot className="sticky bottom-0 print:static">
            <tr className="bg-gray-100 border-t-2 border-gray-200 font-bold text-gray-800">
              <td className="px-6 py-3 text-center text-xs uppercase text-gray-500">
                Total
              </td>

              <td className="px-6 py-3 text-center">
                {formatNPR(loanAmount)}
              </td>

              <td className="px-6 py-3 text-center text-blue-900">
                {formatNPR(result.totalInterest)}
              </td>

              <td className="px-6 py-3 text-center text-red-600">
                {formatNPR(result.totalPayment)}
              </td>

              <td className="px-6 py-3 text-center text-emerald-600 text-sm">
                —
              </td>
            </tr>
          </tfoot>

        </table>
      </div>
    </div>
  );
}