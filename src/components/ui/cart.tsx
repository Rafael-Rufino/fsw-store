import computeProductTotalPrice from "@/helpers/product";
import { CartContext } from "@/providers/cart";
import { useContext } from "react";
import CartItem from "./cart-item";

import PriceRow from "./priceRow";
import { formattedPrice } from "@/utils/formattedPrice";
import { ScrollArea } from "./scroll-area";
import { Button } from "./button";
import { createCheckout } from "@/actions/checkout";
import { loadStripe } from "@stripe/stripe-js";

const Cart = () => {
  const { products, subtotal, total, totalDiscount } = useContext(CartContext);
  const hasProducts = products.length > 0;

  const handleFinishPurchaseClick = async () => {
    const checkout = await createCheckout(products);
    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

    stripe?.redirectToCheckout({
      sessionId: checkout.id,
    });
  };
  return (
    <div className="flex h-full flex-col gap-8">
      <div className="flex h-full max-h-full flex-col gap-5 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="mt-8 flex h-full flex-col gap-5">
            {hasProducts ? (
              products.map((product) => (
                <CartItem
                  key={product.id}
                  product={computeProductTotalPrice(product as any) as any}
                />
              ))
            ) : (
              <p className="text-center font-semibold opacity-75">
                Você ainda não tem nenhum produto no carrinho.
              </p>
            )}
          </div>
        </ScrollArea>
      </div>

      {hasProducts && (
        <div className="flex flex-col gap-3">
          <PriceRow label="Subtotal" value={formattedPrice(subtotal)} />
          <PriceRow label="Entrega" className="uppercase" value="Grátis" />
          <PriceRow label="Desconto" value={formattedPrice(totalDiscount)} />
          <PriceRow
            className="text-base font-bold"
            label="Total"
            value={formattedPrice(total)}
          />

          <Button
            onClick={handleFinishPurchaseClick}
            className="my-7 font-bold uppercase"
          >
            Finalizar compra
          </Button>
        </div>
      )}
    </div>
  );
};

export default Cart;
