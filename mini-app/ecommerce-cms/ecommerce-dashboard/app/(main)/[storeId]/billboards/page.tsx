import { format } from "date-fns";

import { redirect } from "next/navigation";

import prismaDb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";

import { BillboardClient } from "./components/billboardClient";

import { BillboardTable } from "./components/columns";

interface Props {
  params: {
    storeId: string;
  };
}

const BillboardPage = async ({ params }: Props) => {
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

  const billboards = await prismaDb.billboard.findMany({
    where: {
      storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedData: BillboardTable[] = billboards.map((billboard) => ({
    label: billboard.label,
    createdAt: format(billboard.createdAt, "MMMM do, yyyy"),
    id: billboard.id,
  }));

  return (
    <div className="pt-6 p-8 space-y-4">
      <BillboardClient billboards={formattedData} />
    </div>
  );
};

export default BillboardPage;
