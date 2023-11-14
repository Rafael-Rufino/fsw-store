import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import computeProductTotalPrice from "@/helpers/product";
import { formattedPrice } from "@/utils/formattedPrice";
import { Prisma } from "@prisma/client";
import { format as formattedDate } from "date-fns";
import { useMemo } from "react";
import { getOrderStatus } from "../helpers/status";
import OrderProductItem from "./order-product-item";

interface OrderItemProps {
  order: Prisma.OrderGetPayload<{
    include: {
      orderproducts: {
        include: { product: true };
      };
    };
  }>;
}

const OrderItem = ({ order }: OrderItemProps) => {
  const subtotal = useMemo(() => {
    return order.orderproducts.reduce((acc, orderProduct) => {
      return (
        acc + Number(orderProduct.product.basePrice) * orderProduct.quantity
      );
    }, 0);
  }, [order.orderproducts]);

  const total = useMemo(() => {
    return order.orderproducts.reduce((acc, product) => {
      const productWithTotalPrice = computeProductTotalPrice(product.product);

      return acc + productWithTotalPrice.totalPrice * product.quantity;
    }, 0);
  }, [order.orderproducts]);

  const totalDiscounts = subtotal - total;
  return (
    <Card className="px-5 last-of-type:mb-8">
      <Accordion type="single" className="w-full" collapsible>
        <AccordionItem value={order.id} className="pt-4">
          <AccordionTrigger>
            <div className="flex w-full text-left">
              <div className="flex flex-1 flex-col gap-1 text-left">
                <p className="text-sm font-bold uppercase lg:text-base">
                  Pedido com {order.orderproducts.length} produto(s)
                </p>
                <span className="text-xs opacity-60">
                  Feito em {formattedDate(order.createdAt, "dd/MM/yyyy")}
                </span>
              </div>

              <div className="hidden flex-1 font-bold lg:block">
                <p className="text-xs lg:text-sm">Status</p>
                <p className="text-xs text-[#8162FF] lg:text-sm">
                  {getOrderStatus(order.status)}
                </p>
              </div>

              <div className="hidden flex-1 lg:block">
                <p className="text-xs font-bold lg:text-sm ">Data</p>
                <p className="text-xs opacity-60 lg:text-sm">
                  Feito em {formattedDate(order.createdAt, "d/MM/y 'às' HH:mm")}
                </p>
              </div>

              <div className="hidden flex-1 lg:block">
                <p className="text-xs font-bold lg:text-sm">Pagamento</p>
                <p className="text-xs opacity-60 lg:text-sm">Cartão</p>
              </div>
            </div>
          </AccordionTrigger>

          <AccordionContent>
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between lg:hidden">
                <div className="font-bold">
                  <p className="text-xs lg:text-sm">Status</p>
                  <p className="text-xs text-[#8162FF] lg:text-sm">
                    {getOrderStatus(order.status)}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-bold lg:text-sm">Data</p>
                  <p className="text-xs opacity-60 lg:text-sm">
                    {formattedDate(order.createdAt, "d/MM/y")}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-bold lg:text-sm">Pagamento</p>
                  <p className="text-xs opacity-60 lg:text-sm">Cartão</p>
                </div>
              </div>

              {order.orderproducts.map((orderProduct) => (
                <OrderProductItem
                  key={orderProduct.id}
                  orderProduct={orderProduct}
                />
              ))}

              <div className="flex w-full flex-col gap-1 text-xs">
                <Separator />

                <div className="flex w-full justify-between py-3 lg:text-sm">
                  <p>Subtotal</p>
                  <p>{formattedPrice(subtotal)}</p>
                </div>

                <Separator />

                <div className="flex w-full justify-between py-3 lg:text-sm">
                  <p>Entrega</p>
                  <p>GRÁTIS</p>
                </div>

                <Separator />

                <div className="flex w-full justify-between py-3 lg:text-sm">
                  <p>Descontos</p>
                  <p>-{formattedPrice(totalDiscounts)}</p>
                </div>

                <Separator />

                <div className="flex w-full justify-between py-3 text-sm font-bold lg:text-base">
                  <p>Total</p>
                  <p>{formattedPrice(total)}</p>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
};

export default OrderItem;
