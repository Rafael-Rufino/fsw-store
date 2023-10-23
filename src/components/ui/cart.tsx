import computeProductTotalPrice from "@/helpers/product";
import { CartContext } from "@/providers/cart";
import { useContext } from "react";
import CartItem from "./cart-item";

const Cart = () => {
  const { products } = useContext(CartContext);
  return (
    <div className="mt-8 flex flex-col gap-5">
      {products.map((product) => (
        <CartItem
          key={product.id}
          product={computeProductTotalPrice(product as any) as any}
        />
      ))}
    </div>
  );
};

export default Cart;
