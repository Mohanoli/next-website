'use client';
import { ReactNode } from "react";

export const LoginLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <section className="w-full min-h-screen bg-gray-100 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-md relative z-10">
        {children}
      </div>
    </section>
  );
}
