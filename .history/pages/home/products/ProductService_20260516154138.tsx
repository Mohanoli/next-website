import Carousel from "@/components/ui/carousel/Carousel"
import { services } from "./ProductList";

export default function ProductService() {
    return (
        <Carousel data={services}
            title="Products Highlights"
            cardClass="bg-white shadow-md border border-gray-100"
            imageHeight="h-74"
        />
    )
}