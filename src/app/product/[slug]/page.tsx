import ProductList from "@/components/ui/product-list";
import SectionTitle from "@/components/ui/section-title";
import computeProductTotalPrice from "@/helpers/product";
import { prismaClient } from "@/lib/prisma";
import ProductImages from "../components/product-images";
import ProductInfo from "../components/product-info";
interface ProductDetailsPageProps {
  params: {
    slug: string;
  };
}

const ProductDetailsPage = async ({
  params: { slug },
}: ProductDetailsPageProps) => {
  const product = await prismaClient.product.findFirst({
    where: {
      slug: slug,
    },
    include: {
      Category: {
        include: {
          Product: {
            where: {
              slug: {
                not: slug,
              },
            },
          },
        },
      },
    },
  });

  if (!product) return null;

  return (
    <div className="mb-8 flex flex-col gap-8">
      <ProductImages name={product.name} imageUrls={product.imageUrls} />
      <ProductInfo product={computeProductTotalPrice(product)} />
      <div>
        <SectionTitle text="Produtos Recomendados" />
        <ProductList products={product.Category.Product} />
      </div>
    </div>
  );
};

export default ProductDetailsPage;
