import computeProductTotalPrice from "@/helpers/product";
import { CartContext } from "@/providers/cart";
import { useContext } from "react";
import CartItem from "./cart-item";
import { Separator } from "./separator";

import PriceRow from "./priceRow";

const Cart = () => {
  const { products, total, totalDiscount, subtotal } = useContext(CartContext);

  const hasProducts = products.length > 0;
  return (
    <div className="mt-8 flex flex-col gap-5">
      <div className="flex flex-col ">
        {hasProducts ? (
          products.map((product) => (
            <CartItem
              key={product.id}
              product={computeProductTotalPrice(product as any) as any}
            />
          ))
        ) : (
          <div className="text-center font-semibold opacity-75">
            <p>Você ainda não tem nenhum produto no carrinho.</p>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-3">
        <PriceRow label="Subtotal" value={subtotal} />
        <Separator />
        <div className="mt-4 flex items-center justify-between">
          <small>Entrega</small>
          <small className="uppercase">Grátis</small>
        </div>
        <PriceRow label="Total de Desconto" value={totalDiscount} />
        <PriceRow className="text-base font-bold" label="Total" value={total} />
      </div>
    </div>
  );
};

export default Cart;
