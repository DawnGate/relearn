import { format } from "date-fns";

import { redirect } from "next/navigation";

import prismaDb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";

import { OrderClient } from "./components/orderClient";

import { OrderTable } from "./components/columns";
import { currencyFormatter } from "@/lib/utils";

interface Props {
  params: {
    storeId: string;
  };
}

const OrderPage = async ({ params }: Props) => {
  const { userId } = auth();

  const { storeId } = params;

  if (!userId) {
    redirect("/");
  }

  const store = await prismaDb.store.findUnique({
    where: {
      id: storeId,
      userId,
    },
  });

  if (!store) {
    redirect("/");
  }

  const orders = await prismaDb.order.findMany({
    where: {
      storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
  });

  const formattedData: OrderTable[] = orders.map((order) => ({
    phone: order.phone,
    address: order.address,
    products: order.orderItems.map((item) => item.product.name).join(", "),
    totalPrice: currencyFormatter.format(
      order.orderItems.reduce(
        (sum, orderItem) => sum + orderItem.product.price,
        0
      )
    ),
    isPaid: order.isPaid ? "true" : "false",
    createdAt: format(order.createdAt, "MMMM do, yyyy"),
    id: order.id,
  }));

  return (
    <div className="pt-6 p-8 space-y-4">
      <OrderClient orders={formattedData} />
    </div>
  );
};

export default OrderPage;
