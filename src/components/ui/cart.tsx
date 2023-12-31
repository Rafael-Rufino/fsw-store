import computeProductTotalPrice from "@/helpers/product";
import { CartContext } from "@/providers/cart";
import { useContext } from "react";
import CartItem from "./cart-item";

import { createCheckout } from "@/actions/checkout";
import { createOrder } from "@/actions/order";
import { formattedPrice } from "@/utils/formattedPrice";
import { loadStripe } from "@stripe/stripe-js";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { toast } from "react-toastify";
import { Button } from "./button";
import PriceRow from "./priceRow";
import { ScrollArea } from "./scroll-area";

const Cart = () => {
  const { data } = useSession();
  const { products, subtotal, total, totalDiscount } = useContext(CartContext);
  const hasProducts = products.length > 0;

  const handleFinishPurchaseClick = async () => {
    if (!data?.user) {
      return toast.error("Você precisa estar logado para finalizar a compra!");
    }

    try {
      const order = await createOrder(products, (data?.user as any).id);
      const checkout = await createCheckout(products, order.id);

      const stripe = await loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY,
      );

      stripe?.redirectToCheckout({
        sessionId: checkout.id,
      });

      toast.success("Você está quase lá, agora é só efetuar o pagamento!", {
        autoClose: 5000,
      });
    } catch (error) {
      toast.error(
        "Ocorreu um erro ao processar a compra. Tente novamente mais tarde.",
      );
      console.error("Erro ao finalizar a compra:", error);
    }
  };
  return (
    <div className="flex h-full flex-col gap-8  ">
      <div className="flex h-full  max-h-full flex-col gap-5 overflow-hidden">
        <ScrollArea className="h-full ">
          <div className="mt-8 flex h-full flex-col gap-5">
            {hasProducts ? (
              products.map((product) => (
                <CartItem
                  key={product.id}
                  product={computeProductTotalPrice(product as any) as any}
                />
              ))
            ) : (
              <div className="flex flex-col">
                <p className="text-center font-semibold opacity-75">
                  Você não adicionou itens ao carrinho!
                </p>

                <Image
                  src="/empty-cart.svg"
                  alt="Carrinho vazio"
                  width={0}
                  height={0}
                  className="mx-auto mt-8 w-40 lg:w-[300px]"
                  sizes="100vw"
                />
              </div>
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
