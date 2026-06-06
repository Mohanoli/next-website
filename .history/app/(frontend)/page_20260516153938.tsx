import Hero from "@/pages/home/hero/Hero";
import Notice from "@/pages/home/noticebar/Notice";
import ProductHighlight from "@/pages/home/products/ProductHighlight";

export default function HomePage() {
    return(
        <div>
            <Notice/>
            <Hero/>
            <ProductHighlight/>
            
        </div>
    )
}