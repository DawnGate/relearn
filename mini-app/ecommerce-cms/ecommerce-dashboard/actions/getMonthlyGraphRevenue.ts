import prismaDb from "@/lib/prismadb";

interface GraphData {
  name: string;
  total: number;
}

export const getMonthlyGraphRevenue = async (storeId: string) => {
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

  const monthlyRevenue: { [key: string]: number } = {};

  for (const order of paidOrders) {
    const month = order.createdAt.getMonth();
    const orderRevenue = order.orderItems.reduce(
      (sum, item) => item.product.price,
      0
    );

    if (monthlyRevenue[month]) {
      monthlyRevenue[month] += orderRevenue;
    } else {
      monthlyRevenue[month] = orderRevenue;
    }
  }

  const graphData: GraphData[] = [
    { name: "Jan", total: 0 },
    { name: "Feb", total: 0 },
    { name: "Mar", total: 0 },
    { name: "Apr", total: 0 },
    { name: "May", total: 0 },
    { name: "Jun", total: 0 },
    { name: "Jul", total: 0 },
    { name: "Aug", total: 0 },
    { name: "Sep", total: 0 },
    { name: "Oct", total: 0 },
    { name: "Nov", total: 0 },
    { name: "Dec", total: 0 },
  ];

  for (const month in monthlyRevenue) {
    graphData[parseInt(month)].total = monthlyRevenue[month];
  }

  return graphData;
};
