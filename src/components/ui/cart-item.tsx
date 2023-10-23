import Image from "next/image";
import { CartContext, CartProduct } from "@/providers/cart";
import { formattedPrice } from "@/utils/formattedPrice";
import { Button } from "./button";
import { ArrowLeftIcon, ArrowRightIcon, TrashIcon } from "lucide-react";
import { useContext } from "react";

interface CartItemProps {
  product: CartProduct;
}
const CartItem = ({ product }: CartItemProps) => {
  const { decreaseProductQuantity } = useContext(CartContext);

  const handleDecreaseProductQuantity = () => {
    decreaseProductQuantity(product.id);
  };
  return (
    <div className="flex items-center justify-between ">
      <div className=" flex h-[77px] w-[77px] items-center justify-center rounded-lg bg-accent">
        <Image
          src={product.imageUrls[0]}
          width={0}
          height={0}
          sizes="100vw"
          alt={product.name}
          className="h-auto max-h-[70%] w-auto max-w-[80%]"
        />
      </div>

      <div className="flex flex-col ">
        <h3 className="text-xs font-semibold">{product.name}</h3>
        <div className="flex items-center gap-2">
          <h4 className="text-sm font-bold">
            {formattedPrice(product.totalPrice)}
          </h4>

          {product.discountPercentage > 0 && (
            <span className="text-xs line-through opacity-75">
              {formattedPrice(Number(product.basePrice))}
            </span>
          )}
        </div>
        <div className="mt-2 flex items-center gap-1">
          <Button
            size="icon"
            variant="outline"
            className="h-8 w-8"
            onClick={handleDecreaseProductQuantity}
          >
            <ArrowLeftIcon size={16} />
          </Button>
          <span className="tetx-xs px-2">{product.quantity}</span>
          <Button size="icon" variant="outline" className="h-8 w-8">
            <ArrowRightIcon size={16} />
          </Button>
        </div>
      </div>
      <Button size="icon" variant="outline">
        <TrashIcon size={16} />
      </Button>
    </div>
  );
};

export default CartItem;
