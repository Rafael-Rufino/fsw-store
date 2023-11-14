import { CartContext, CartProduct } from "@/providers/cart";
import { formattedPrice } from "@/utils/formattedPrice";
import { ArrowLeftIcon, ArrowRightIcon, TrashIcon } from "lucide-react";
import Image from "next/image";
import { useContext } from "react";
import { Button } from "./button";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface CartItemProps {
  product: CartProduct;
}
const CartItem = ({ product }: CartItemProps) => {
  const {
    decreaseProductQuantity,
    increaseProductQuantity,
    removeProductFromCart,
  } = useContext(CartContext);

  const handleDecreaseProductQuantity = () => {
    decreaseProductQuantity(product.id);
  };

  const handleIncreaseProductQuantity = () => {
    increaseProductQuantity(product.id);
  };

  const handleRemoveProductFromCart = () => {
    removeProductFromCart(product.id);
  };
  return (
    <div className="flex justify-between   ">
      <div className="flex items-center gap-5 ">
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
            <Button
              size="icon"
              variant="outline"
              className="h-8 w-8"
              onClick={handleIncreaseProductQuantity}
            >
              <ArrowRightIcon size={16} />
            </Button>
          </div>
        </div>
      </div>
      <AlertDialog>
        <AlertDialogTrigger className="hover:opacity-75">
          <TrashIcon size={20} />
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Tem certeza que deseja remover o esse Item do carrinho?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não poderá ser desfeita!
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleRemoveProductFromCart}>
              Deletar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default CartItem;
