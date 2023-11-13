import { SectionProduct } from "@/components/ui/section-product";
import { prismaClient } from "@/lib/prisma";

import Link from "next/link";

import Categories from "./components/categories";
import PromoBanner from "./components/promo-banner";
import SearchProducts from "./components/search-products";

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
    <div className="flex flex-col gap-8 pb-8 ">
      <div className="px-5 pt-6 lg:hidden">
        <SearchProducts />
      </div>
      <Link href="/deals" className="hidden lg:block">
        <PromoBanner
          src="/desktop-banner.png"
          alt="Até 55% de desconto esse mês!"
          className="w-full"
        />
      </Link>
      <div className="flex flex-col gap-8 lg:mx-auto  lg:max-w-screen-xl 2xl:max-w-screen-2xl">
        <Link href="/deals" className="lg:hidden">
          <PromoBanner
            src="/mobile-banner.png"
            alt="Até 55% de desconto esse mês!"
            className="px-5 pb-8"
          />
        </Link>

        <div className="px-5">
          <Categories />
        </div>

        <SectionProduct title="Ofertas" products={deals} />

        <div className="flex flex-col gap-8 px-5 lg:flex-row">
          <Link href="/category/mouses" className="lg:w-1/2">
            <PromoBanner
              src="/banner-mouses.png"
              alt="Até 55% de desconto em mouses!"
            />
          </Link>
          <Link href="/category/headphones" className="hidden w-1/2 lg:block">
            <PromoBanner
              src="/banner-fones.png"
              alt="Até 55% de desconto em headphones!"
              className="hidden w-1/2 lg:block"
            />
          </Link>
        </div>

        <SectionProduct title="Teclados" products={keyboards} />

        <Link href="/category/headphones" className="lg:hidden">
          <PromoBanner
            src="/banner-fones.png"
            alt="Até 55% de desconto em headphones!"
            className="px-5"
          />
        </Link>

        <PromoBanner
          src="/banner-free-shipping.png"
          alt="Frete grátis para todo brasil!"
          className="hidden px-5 lg:block"
        />

        <SectionProduct title="Fones" products={headphones} />
      </div>
    </div>
  );
}
