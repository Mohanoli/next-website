import Carousel from "@/components/ui/carousel/Carousel";
import { products } from "./ProductList";

export default function ProductHighlight() {
  return (
    <Carousel data={products}
      title="SFACL Highlights"
      cardClass="bg-gray-200"
      imageHeight="h-64"
    />
  )
}