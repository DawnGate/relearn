import { Heading } from "@/components/heading";
import prismaDb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";

import { redirect } from "next/navigation";

const StorePage = async ({
  params,
}: {
  params: {
    storeId: string;
  };
}) => {
  const { userId } = auth();
  const { storeId } = params;

  if (!userId) {
    redirect("/sign-in");
  }

  const store = await prismaDb.store.findFirst({
    where: {
      id: storeId,
      userId,
    },
  });

  if (!store) {
    redirect("/");
  }

  return (
    <div className="space-y-4 p-8 pt-6">
      <Heading title="Dashboard" description="Overview of your store" />
      <div>Store page: {store.name}</div>
    </div>
  );
};

export default StorePage;
