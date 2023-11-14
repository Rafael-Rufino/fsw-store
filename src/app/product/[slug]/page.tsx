import Loading from "@/app/loading";
import { SectionProduct } from "@/components/ui/section-product";
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

  if (!product) return <Loading />;

  return (
    <div className="mb-8 flex flex-col gap-8  ">
      <div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-8  lg:px-[100px] lg:pt-10">
        <ProductImages name={product.name} imageUrls={product.imageUrls} />
        <ProductInfo product={computeProductTotalPrice(product)} />
      </div>

      <div className="lg:px-[80px]">
        <SectionProduct
          title="Produtos Relacionados"
          products={product.Category.Product}
        />
      </div>
    </div>
  );
};

export default ProductDetailsPage;
