import Image from "next/image";
import Link from "next/link";
import { LogoProps } from "../../lib/types/GlobalTypes";



export const Logo = ({
    showLabel = true,
    textClassName = "text-2xl font-bold",
    logoSize = 53,
    className = "",
}: LogoProps) => {
    return (
        // <Link href="/admin" className={`flex items-center gap-3 ${className}`}>
            <div className= {`flex items-center gap-3 ${className}`}>
               {/* Logo Image */}
            <div className="relative shrink-0" style={{ width: logoSize, height: logoSize }}>
                <Image
                    src="/logo.png"
                    alt="Logo"
                    fill
                    sizes="53"
                    className="object-contain"
                    priority/>
            </div>
            {/* Label */}
            {showLabel && (
                <span className={`font-bold whitespace-nowrap ${textClassName}`}>
                    SFACL DHANAURI
                </span>
            )}
            </div>
            
        // </Link>
    );
};