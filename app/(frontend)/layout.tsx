import { Footer } from "@/layout/footer/Footer";
import Header from "@/layout/header/Header";
import { ReactNode } from "react";


export default function FrontendLayout({
    children,
}: Readonly<{ children: ReactNode }>) {
    return (
        <div className="flex flex-col min-h-screen">
            <Header/>
                {children}
                <Footer/>
            
           
        </div>
    );
}
