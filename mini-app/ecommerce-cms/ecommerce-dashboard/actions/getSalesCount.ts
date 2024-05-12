import prismaDb from "@/lib/prismadb";

export const getSalesCount = async (storeId: string) => {
  const countOrders = await prismaDb.order.count({
    where: {
      storeId,
      isPaid: true,
    },
  });

  return countOrders;
};
