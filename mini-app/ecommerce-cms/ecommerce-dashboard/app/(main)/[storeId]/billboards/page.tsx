import { auth } from "@clerk/nextjs/server";
import { BillboardClient } from "./components/billboardClient";

import prismaDb from "@/lib/prismadb";
import { redirect } from "next/navigation";

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

  return (
    <div className="pt-6 p-8 space-y-4">
      <BillboardClient billboards={billboards} />
    </div>
  );
};

export default BillboardPage;
