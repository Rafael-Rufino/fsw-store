import { Badge } from "@/components/ui/badge";
import { authOptions } from "@/lib/auth";
import { prismaClient } from "@/lib/prisma";
import { PackageSearch } from "lucide-react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import OrderItem from "./components/order-item";

const OrdersPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/");
  }

  const orders = await prismaClient.order.findMany({
    where: {
      userId: (session.user as any).id,
    },
    include: {
      orderproducts: {
        include: {
          product: true,
        },
      },
    },
  });

  return (
    <div className="mx-auto flex max-w-[1400px] flex-col gap-5 px-5 lg:px-20">
      <Badge variant="heading" className="mt-8">
        <PackageSearch /> Meus pedidos
      </Badge>

      <div className="flex flex-col gap-5">
        {orders.map((order) => (
          <OrderItem key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
};

export default OrdersPage;
