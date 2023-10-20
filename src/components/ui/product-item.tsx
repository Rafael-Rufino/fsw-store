import { ProductWithTotalPrice } from "@/helpers/product";
import { formattedPrice } from "@/utils/formattedPrice";
import { ArrowDownIcon } from "lucide-react";
import Image from "next/image";
import { Badge } from "./badge";

interface ProductItemProps {
  product: ProductWithTotalPrice;
}

const ProductItem = ({ product }: ProductItemProps) => {
  const hasDiscount = product.discountPercentage > 0;
  return (
    <div className="flex max-w-[156px] flex-col gap-4">
      <div className="relative flex h-[170px] w-[156px] items-center justify-center rounded-lg bg-accent">
        <Image
          src={product.imageUrls[0]}
          alt={product.name}
          width={0}
          height={0}
          sizes="100vw"
          className="h-auto max-h-[70%] w-auto max-w-[80%]"
          style={{ objectFit: "contain" }}
        />
        <div className="absolute  left-2 top-2 px-2 py-[0.125rem] ">
          {hasDiscount && (
            <Badge>
              <ArrowDownIcon size={16} />
              {product.discountPercentage}%
            </Badge>
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
  );
};

export default ProductItem;
