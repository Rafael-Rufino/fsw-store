import Loading from "@/app/loading";
import { Badge } from "@/components/ui/badge";
import ProductItem from "@/components/ui/product-item";
import { CATEGORY_ICON } from "@/constants/category-icon";
import computeProductTotalPrice from "@/helpers/product";
import { prismaClient } from "@/lib/prisma";

interface CategoryProductsProps {
  params: {
    slug: string;
  };
}

const CategoryProducts = async ({
  params: { slug },
}: CategoryProductsProps) => {
  const category = await prismaClient.category.findFirst({
    where: {
      slug,
    },
    include: {
      Product: true,
    },
  });

  if (!category) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col gap-8 p-5 lg:mx-auto  lg:max-w-screen-xl 2xl:max-w-screen-2xl">
      <Badge
        variant="outline"
        className=" w-fit gap-1 border-2 border-primary px-3 py-2 text-base uppercase"
      >
        {CATEGORY_ICON[slug as keyof typeof CATEGORY_ICON]}
        {category?.name}
      </Badge>

      <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-4">
        {category.Product.map((product) => (
          <ProductItem
            key={product.id}
            product={computeProductTotalPrice(product)}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryProducts;
