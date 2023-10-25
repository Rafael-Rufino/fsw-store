import computeProductTotalPrice from "@/helpers/product";
import { CartContext } from "@/providers/cart";
import { useContext } from "react";
import CartItem from "./cart-item";
import { Separator } from "./separator";

import PriceRow from "./priceRow";
import { formattedPrice } from "@/utils/formattedPrice";

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
        </div>
      )}
    </div>
  );
};

export default Cart;
