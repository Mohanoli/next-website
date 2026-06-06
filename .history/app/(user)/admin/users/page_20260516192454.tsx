"use client";



import { DashboardStats } from "@/pages/cms/dashboard/Dashboard";
// import { UserTable } from "@/pages/cms/user/UserList";

import { Plus, Download, Filter } from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Overview</h1>
          <p className="text-slate-500 mt-1">Welcome back, here's what's happening with your store today.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-all shadow-sm">
            <Download size={18} />
            <span>Export Report</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-teal-600 text-white rounded-xl text-sm font-semibold hover:bg-teal-700 transition-all shadow-md shadow-teal-600/20 active:scale-[0.98]">
            <Plus size={18} />
            <span>Add New User</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <DashboardStats />

      {/* Main Content Area */}
      <div className="grid grid-cols-1 gap-8">
        {/* User Management Table */}
    
      </div>

      {/* Bottom Sections (Optional/Placeholder) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Recent Notifications</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                  <Bell size={20} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">New system update available</p>
                  <p className="text-xs text-slate-500 mt-0.5">System version 2.4.0 is now live with enhanced security features.</p>
                  <p className="text-[10px] text-slate-400 mt-2">2 hours ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-slate-900">Quick Performance</h3>
            <button className="text-xs font-semibold text-teal-600 hover:underline">View details</button>
          </div>
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Storage Usage</span>
                <span className="font-semibold text-slate-900">78%</span>
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-teal-500 rounded-full" style={{ width: '78%' }}></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Active Servers</span>
                <span className="font-semibold text-slate-900">12 / 15</span>
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: '80%' }}></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">API Requests</span>
                <span className="font-semibold text-slate-900">92%</span>
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-purple-500 rounded-full" style={{ width: '92%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Re-importing Bell here as it was missing from the local scope logic if Bell is used in notifications
import { Bell } from "lucide-react";