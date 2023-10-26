import Loading from "@/app/loading";
import ProductItem from "@/components/ui/product-item";
import computeProductTotalPrice from "@/helpers/product";
import { prismaClient } from "@/lib/prisma";

const DealsList = async () => {
  const deals = await prismaClient.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
  });
  if (!deals) return <Loading borderColor="primary" />;
  return (
    <div className="grid grid-cols-2 gap-8  md:grid-cols-3 lg:grid-cols-4">
      {deals.map((product) => {
        return (
          <ProductItem
            key={product.id}
            product={computeProductTotalPrice(product)}
          />
        );
      })}
    </div>
  );
};

export default DealsList;
