import prismaDb from "@/lib/prismadb";

export const getStockCount = async (storeId: string) => {
  const countProducts = await prismaDb.product.count({
    where: {
      storeId,
      isArchived: false,
    },
  });

  return countProducts;
};
