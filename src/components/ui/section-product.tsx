import { Product } from "@prisma/client";
import ProductList from "./product-list";
import SectionTitle from "./section-title";

interface SectionProductProps {
  title: string;
  products: Product[];
}

export const SectionProduct = ({ products, title }: SectionProductProps) => {
  return (
    <div>
      <SectionTitle text={title} />
      <ProductList products={products} />
    </div>
  );
};
