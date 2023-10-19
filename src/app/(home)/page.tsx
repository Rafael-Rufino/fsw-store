"use client";
import Image from "next/image";
import Categories from "./components/categories";

export default function Home() {
  return (
    <div className="flex flex-col gap-8 ">
      <div className="flex p-5">
        <Image
          src="/banner-home-01.png"
          alt="Até 55% de desconto esse mês"
          height={0}
          width={0}
          className="h-auto w-full "
          sizes="100vw"
        />
      </div>

      <div className="px-5">
        <Categories />
      </div>
    </div>
  );
}
