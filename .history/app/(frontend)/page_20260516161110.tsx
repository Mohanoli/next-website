import Hero from "@/pages/home/hero/Hero";
import Notice from "@/pages/home/noticebar/Notice";
import ProductHighlight from "@/pages/home/products/ProductHighlight";
import ProductService from "@/pages/home/products/ProductService";
import QuickMenu from "@/pages/home/quickmenu/QuickMenu";

export default function HomePage() {
    return(
        <div>
            <Notice/>
            <Hero/>
            <ProductHighlight/>
            <ProductService/>
            <QuickMenu/>
            
        </div>
    )
}