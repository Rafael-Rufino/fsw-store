import ProductList from "@/components/ui/product-list";
import { prismaClient } from "@/lib/prisma";
import Categories from "./components/categories";
import PromoBanner from "./components/promo-banner";
import SectionTitle from "./components/section-title";

export default async function Home() {
  const deals = await prismaClient.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
  });

  const keyboards = await prismaClient.product.findMany({
    where: {
      Category: {
        slug: "keyboards",
      },
    },
  });

  const headphones = await prismaClient.product.findMany({
    where: {
      Category: {
        slug: "headphones",
      },
    },
  });
  return (
    <div className="flex flex-col gap-8 ">
      <div>
        <PromoBanner
          src="/banner-home-01.png"
          alt="Até 55% de desconto esse mês!"
        />
      </div>

      <div className="px-5">
        <Categories />
      </div>

      <div>
        <SectionTitle text="Ofertas" />
        <ProductList products={deals} />
      </div>

      <PromoBanner
        src="/banner-mouses.png"
        alt="Até 55% de desconto em mouses!"
      />

      <div>
        <SectionTitle text="Teclados" />
        <ProductList products={keyboards} />
      </div>

      <PromoBanner
        src="/banner-fones.png"
        alt="Até 55% de desconto em headphones!"
      />

      <div>
        <SectionTitle text="Headphones" />
        <ProductList products={headphones} />
      </div>
    </div>
  );
}
