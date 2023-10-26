import { ProductWithTotalPrice } from "@/helpers/product";
import { formattedPrice } from "@/utils/formattedPrice";
import Image from "next/image";
import Link from "next/link";
import DisconuntBadge from "./discountBadge";

interface ProductItemProps {
  product: ProductWithTotalPrice;
}

const ProductItem = ({ product }: ProductItemProps) => {
  const hasDiscount = product.discountPercentage > 0;
  return (
    <Link href={`/product/${product.slug}`}>
      <div className="flex  flex-col gap-4 ">
        <div className="relative flex h-[170px] w-full items-center justify-center rounded-lg bg-accent">
          <Image
            src={product.imageUrls[0]}
            alt={product.name}
            width={0}
            height={0}
            sizes="100vw"
            className="h-auto max-h-[70%] w-auto max-w-[80%] object-contain"
            style={{ objectFit: "contain" }}
          />
          <div className="absolute  left-2 top-2 px-2 py-[0.125rem] ">
            {hasDiscount && (
              <DisconuntBadge>{product.discountPercentage}</DisconuntBadge>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <p className=" overflow-hidden text-ellipsis whitespace-nowrap text-sm">
            {product.name}
          </p>

          <div className="flex items-center justify-between gap-2">
            {hasDiscount && (
              <>
                <span className="text-base font-semibold">
                  {formattedPrice(product.totalPrice)}
                </span>
                <span className="text-xs line-through opacity-75">
                  {formattedPrice(Number(product.basePrice))}
                </span>
              </>
            )}

            {!hasDiscount && (
              <span className="text-sm font-semibold">
                {formattedPrice(Number(product.basePrice))}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductItem;
