import { prismaClient } from "@/lib/prisma";
import CatelogItem from "./catalog-item";
import Loading from "@/app/loading";

const CatalogList = async () => {
  const categories = await prismaClient.category.findMany({});
  if (!categories) return <Loading />;
  return (
    <div className="mt-8 grid grid-cols-2  gap-8 md:grid-cols-3 lg:md:grid-cols-4">
      {categories.map((category) => (
        <CatelogItem key={category.id} category={category} />
      ))}
    </div>
  );
};

export default CatalogList;
