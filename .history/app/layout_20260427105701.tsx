import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/provider/AuthProvider";
import { Toaster } from "sonner";

const poppins = Poppins({
    variable: "--font-poppins",
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
    title: "corporate.coop.np",
    description: "corporate.coop.np",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
       <html lang="en" className="scroll-smooth" data-scroll-behavior="smooth">
            <body className={`${poppins.variable} font-sans antialiased text-slate-900 bg-white`}>
                <AuthProvider>
                    <Toaster richColors position="bottom-right" />
                    {children}
                </AuthProvider>
            </body>
        </html>
    );
}
