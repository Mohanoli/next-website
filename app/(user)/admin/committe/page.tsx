"use client";

import { CommitteTable } from "@/components/cms/committe/CommitteTable";
import { Users } from "lucide-react";

export default function CommittePage() {
    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
                        <Users className="text-teal-600" size={32} />
                        <span>Committe Members</span>
                    </h1>
                    <p className="text-slate-500 mt-1">Manage the cooperative's committe members and their profiles.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-8">
                <CommitteTable />
            </div>
        </div>
    );
}
