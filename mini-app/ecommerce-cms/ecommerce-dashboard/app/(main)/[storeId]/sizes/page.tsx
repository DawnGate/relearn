import { format } from "date-fns";

import { redirect } from "next/navigation";

import prismaDb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";

import { SizeClient } from "./components/sizeClient";

import { SizeTable } from "./components/columns";

interface Props {
  params: {
    storeId: string;
  };
}

const SizePage = async ({ params }: Props) => {
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

  const sizes = await prismaDb.size.findMany({
    where: {
      storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedData: SizeTable[] = sizes.map((size) => ({
    name: size.name,
    value: size.value,
    createdAt: format(size.createdAt, "MMMM do, yyyy"),
    id: size.id,
  }));

  return (
    <div className="pt-6 p-8 space-y-4">
      <SizeClient sizes={formattedData} />
    </div>
  );
};

export default SizePage;
