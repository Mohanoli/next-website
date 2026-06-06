"use client";

export default function Loading() {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient from-slate-50 to-slate-200">

            <div className="flex flex-col items-center gap-4">

                {/* Spinner */}
                <div className="h-12 w-12 rounded-full border-4 border-slate-300 border-t-green-700 animate-spin"></div>

                {/* Text */}
                <p className="text-sm font-medium text-slate-600 tracking-wide">
                    Loading, please wait...
                </p>

            </div>

        </div>
    );
}