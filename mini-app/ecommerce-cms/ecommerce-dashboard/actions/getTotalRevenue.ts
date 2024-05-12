import prismaDb from "@/lib/prismadb";

export const getTotalRevenue = async (storeId: string) => {
  const paidOrders = await prismaDb.order.findMany({
    where: {
      storeId,
      isPaid: true,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
  });

  const totalRevenue = paidOrders.reduce((total, order) => {
    return (
      total +
      order.orderItems.reduce((sum, item) => sum + item.product.price, 0)
    );
  }, 0);

  return totalRevenue;
};
