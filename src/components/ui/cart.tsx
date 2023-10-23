import { CartContext } from "@/providers/cart";
import { useContext } from "react";

const Cart = () => {
  const { products } = useContext(CartContext);
  return (
    <div className="mt-8 pl-5">
      {products.map((product) => (
        <div key={product.id}>
          <span className="font-medium">{product.name} </span>
        </div>
      ))}
    </div>
  );
};

export default Cart;
