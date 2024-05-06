import { format } from "date-fns";

import { redirect } from "next/navigation";

import prismaDb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";

import { ProductClient } from "./components/productClient";

import { ProductTable } from "./components/columns";
import { currencyFormatter } from "@/lib/utils";

interface Props {
  params: {
    storeId: string;
  };
}

const ProductPage = async ({ params }: Props) => {
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

  const products = await prismaDb.product.findMany({
    where: {
      storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      category: true,
      size: true,
      color: true,
    },
  });

  const formattedData: ProductTable[] = products.map((product) => ({
    name: product.name,
    price: currencyFormatter.format(product.price),
    category: product.category.name,
    size: product.size.name,
    color: product.color.value,
    isArchived: product.isArchived,
    isFeatured: product.isFeatured,
    createdAt: format(product.createdAt, "MMMM do, yyyy"),
    id: product.id,
  }));

  return (
    <div className="pt-6 p-8 space-y-4">
      <ProductClient products={formattedData} />
    </div>
  );
};

export default ProductPage;
