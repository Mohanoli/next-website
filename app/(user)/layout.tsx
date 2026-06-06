"use client";

import { ReactNode, useState, useEffect } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Search, Bell, User, LogOut, Settings, LayoutDashboard, Loader2 } from "lucide-react";
import { useAuth } from "@/context/hooks/useAuth";
import { useRouter } from "next/navigation";

export default function UserLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const { loggedInUser, logout, isLoading } = useAuth();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && (!loggedInUser || !loggedInUser.username)) {
      router.push("/login");
    }
  }, [loggedInUser, isLoading, router]);

  if (isLoading || !loggedInUser || !loggedInUser.username) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="p-4 bg-white rounded-2xl shadow-xl border border-slate-100 flex flex-col items-center gap-4 min-w-75">
            <Loader2 className="w-10 h-10 text-teal-600 animate-spin" />
            <p className="text-slate-500 font-semibold animate-pulse">Authenticating...</p>
          </div>
        </div>
      </div>
    );
  }

  const handleLogout = async () => {
    try {
      logout();
      setShowProfileMenu(false);
      window.location.href = "/login";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />

      <main className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-16.5 bg-[#0a8338] border-b border-slate-200 sticky top-0 z-10 flex items-center justify-between px-8">
          <div className="flex items-center gap-4 flex-1 max-w-2xl">
            <div className="relative w-full">
              <h1 className="text-xl font-bold leading-none text-white">SANA KISHAN DHANAURI</h1>
              <p className="text-xs mt-1 text-white">Shantinagar, 07 Khareni Dang</p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button className="p-2 text-white transition-colors relative">
              <Bell size={22} />
              <span className="absolute top-2 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>

            <div className="h-4 w-px bg-slate-200 mx-2"></div>

            <div className="relative">
              <div
                className="flex items-center gap-3 cursor-pointer group"
                onClick={() => setShowProfileMenu(!showProfileMenu)}
              >
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-semibold text-white group-hover:text-teal-200 transition-colors leading-none">
                    {loggedInUser?.username}
                  </p>
                </div>
                <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-teal-700 shadow-sm border border-teal-200 group-hover:bg-teal-200 transition-colors bg-cover bg-center" style={{ backgroundImage: loggedInUser?.image ? `url(${loggedInUser.image})` : 'none' }}>
                  {!loggedInUser?.image && <User size={20} />}
                </div>
              </div>

              {/* Profile Dropdown */}
              {showProfileMenu && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setShowProfileMenu(false)}
                  ></div>
                  <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-20 animate-in fade-in zoom-in duration-200">
                    <div className="px-4 py-3 border-b border-slate-50 mb-1">
                      <p className="text-sm font-bold text-slate-900 truncate">
                        {loggedInUser?.fullName || loggedInUser?.username}
                      </p>
                      <p className="text-xs text-slate-500 truncate mt-0.5">
                        {loggedInUser?.email}
                      </p>
                    </div>

                    <div className="px-2">
                      <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-teal-600 rounded-xl transition-colors">
                        <User size={18} />
                        <span>My Profile</span>
                      </button>
                      <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-teal-600 rounded-xl transition-colors">
                        <Settings size={18} />
                        <span>Settings</span>
                      </button>
                    </div>

                    <div className="mx-2 my-2 border-t border-slate-50"></div>

                    <div className="px-2">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-xl transition-colors font-medium"
                      >
                        <LogOut size={18} />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        <div className="p-8">{children}</div>

        {/* Footer */}
        <footer className="mt-auto py-6 text-center text-sm text-slate-400 border-t border-slate-200 bg-white/50">
          &copy; {new Date().getFullYear()}{" "}
          <a
            href="https://olimohan.com.np"
            target="_blank"
            rel="noopener noreferrer"
          >
            olimohan.com.np
          </a>
          . All rights reserved.
        </footer>
      </main>
    </div>
  );
}
