"use client";

import { Button } from "@/components/ui/button";
import DisconuntBadge from "@/components/ui/discountBadge";
import { ProductWithTotalPrice } from "@/helpers/product";
import { CartContext } from "@/providers/cart";
import { formattedPrice } from "@/utils/formattedPrice";
import { ArrowLeftIcon, ArrowRightIcon, TruckIcon } from "lucide-react";
import { useContext, useState } from "react";
import { toast } from "react-toastify";

interface ProductInfoProps {
  product: ProductWithTotalPrice;
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  const [quantity, setQuantity] = useState(1);
  const hasDiscount = product.discountPercentage > 0;
  const { addProductToCart } = useContext(CartContext);

  const handleIncreaseQuantityClick = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecreaseQuantityClick = () => {
    setQuantity((prev) => (prev === 1 ? prev : prev - 1));
  };

  const handleAddToCartProduct = () => {
    try {
      addProductToCart({
        ...product,
        quantity,
      });
      toast.success("Produto adicionado ao carrinho!");
    } catch (error) {
      toast.error("Ocorreu um erro ao adicionar o produto ao carrinho.");
      console.error("Erro ao adicionar produto ao carrinho:", error);
    }
  };
  return (
    <div className="flex flex-col px-5 lg:rounded-[10px] lg:bg-accent  lg:py-10">
      <h2 className="text-lg">{product.name}</h2>

      <div className="flex items-center gap-2">
        <h1 className="text-xl font-bold">
          {formattedPrice(product.totalPrice)}
        </h1>

        {hasDiscount && (
          <DisconuntBadge>{product.discountPercentage}</DisconuntBadge>
        )}
      </div>
      {hasDiscount && (
        <span className="text-sm text-gray-500 line-through opacity-75">
          {formattedPrice(Number(product.basePrice))}
        </span>
      )}

      <div className="mt-5 flex items-center">
        <Button
          size="icon"
          onClick={handleDecreaseQuantityClick}
          variant="outline"
        >
          <ArrowLeftIcon size={16} />
        </Button>
        <span className="px-2">{quantity}</span>
        <Button
          size="icon"
          onClick={handleIncreaseQuantityClick}
          variant="outline"
        >
          <ArrowRightIcon size={16} />
        </Button>
      </div>

      <div className="mt-8 flex flex-col gap-3">
        <h3 className="font-bold">Descrição</h3>
        <p className="tex-sm text-justify opacity-75">{product.description}</p>
      </div>

      <Button
        className="mt-8 font-bold uppercase"
        onClick={handleAddToCartProduct}
      >
        Adicionar ao carrinho
      </Button>

      <div className="mt-4 flex  items-center justify-between  rounded-lg bg-accent px-5 py-2 lg:bg-[#2A2A2A]">
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
          <span className="text-xs font-bold lg:mt-5 ">Frete Grátis</span>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
