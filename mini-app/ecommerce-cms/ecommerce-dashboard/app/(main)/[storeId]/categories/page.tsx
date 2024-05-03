import { format } from "date-fns";
import { redirect } from "next/navigation";

import { auth } from "@clerk/nextjs/server";

import prismaDb from "@/lib/prismadb";

import { CategoryClient } from "./components/categoryClient";
import { CategoryTable } from "./components/columns";

interface Props {
  params: {
    storeId: string;
  };
}

const CategoryPage = async ({ params }: Props) => {
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

  const categories = await prismaDb.category.findMany({
    where: {
      storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      billboard: true,
    },
  });

  const formattedData: CategoryTable[] = categories.map((category) => ({
    name: category.name,
    billboardLabel: category.billboard.label,
    createdAt: format(category.createdAt, "MMMM do, yyyy"),
    id: category.id,
  }));

  return (
    <div className="pt-6 p-8 space-y-4">
      <CategoryClient categories={formattedData} />
    </div>
  );
};

export default CategoryPage;
