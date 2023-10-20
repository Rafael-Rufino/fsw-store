import Heading from "@/components/ui/Heading";
import ProductList from "@/components/ui/product-list";
import { prismaClient } from "@/lib/prisma";
import Image from "next/image";
import Categories from "./components/categories";

export default async function Home() {
  const deals = await prismaClient.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
  });
  return (
    <div className="flex flex-col gap-8 ">
      <div>
        <Image
          src="/banner-home-01.png"
          alt="Até 55% de desconto esse mês!"
          height={0}
          width={0}
          className="h-auto w-full px-5"
          sizes="100vw"
        />
      </div>

      <div className="px-5">
        <Categories />
      </div>

      <div className="mt-8 ">
        <Heading text="Ofertas" />
        <ProductList products={deals} />
      </div>

      <Image
        src="/banner-mouses.png"
        alt="Até 55% de desconto em mouses!"
        height={0}
        width={0}
        className="h-auto w-full px-5"
        sizes="100vw"
      />
    </div>
  );
}
