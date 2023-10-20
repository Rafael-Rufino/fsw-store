"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProductWithTotalPrice } from "@/helpers/product";
import { formattedPrice } from "@/utils/formattedPrice";
import {
  ArrowDownIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  TruckIcon,
} from "lucide-react";
import { useState } from "react";

interface ProductInfoProps {
  product: Pick<
    ProductWithTotalPrice,
    "basePrice" | "description" | "discountPercentage" | "totalPrice" | "name"
  >;
}

const ProductInfo = ({
  product: { basePrice, description, name, discountPercentage, totalPrice },
}: ProductInfoProps) => {
  const [quantity, setQuantity] = useState(1);
  const hasDiscount = discountPercentage > 0;

  const handleIncreaseQuantityClick = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecreaseQuantityClick = () => {
    setQuantity((prev) => (prev === 1 ? prev : prev - 1));
  };
  return (
    <div className="flex flex-col px-5">
      <h2 className="text-lg">{name}</h2>

      <div className="flex items-center gap-2">
        <h1 className="text-xl font-bold">{formattedPrice(totalPrice)}</h1>

        {hasDiscount && (
          <Badge className="px-2 py-[2px]">
            <ArrowDownIcon size={14} />
            {discountPercentage}%
          </Badge>
        )}
      </div>
      {hasDiscount && (
        <span className="text-sm text-gray-500 line-through opacity-75">
          {formattedPrice(Number(basePrice))}
        </span>
      )}

      <div className="mt-5 flex items-center">
        <Button
          size="icon"
          onClick={handleDecreaseQuantityClick}
          variant="outline"
        >
          <ArrowLeftIcon />
        </Button>
        <span className="px-2">{quantity}</span>
        <Button
          size="icon"
          onClick={handleIncreaseQuantityClick}
          variant="outline"
        >
          <ArrowRightIcon />
        </Button>
      </div>

      <div className="mt-8 flex flex-col gap-3">
        <h3 className="font-bold">Descrição</h3>
        <p className="tex-sm text-justify opacity-75">{description}</p>
      </div>

      <Button className="mt-8 font-bold uppercase">
        Adicionar ao carrinho
      </Button>

      <div className="mt-8 flex  items-center justify-between  rounded-lg bg-accent px-5 py-2">
        <div className="flex items-center gap-2">
          <TruckIcon size={24} />

          <div className="flex flex-col">
            <p className="text-xs">
              Entrega via <span className="font-bold"> FSPacket®</span>
            </p>
            <p className="text-xs text-[#8162FF]">
              Envio para <span className="font-bold"> todo Brasil</span>
            </p>
          </div>
        </div>
        <div>
          <span className="text-xs font-bold ">Frete Grátis</span>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
