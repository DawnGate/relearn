import { format } from "date-fns";

import { redirect } from "next/navigation";

import prismaDb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";

import { ColorClient } from "./components/colorClient";

import { ColorTable } from "./components/columns";

interface Props {
  params: {
    storeId: string;
  };
}

const ColorPage = async ({ params }: Props) => {
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

  const colors = await prismaDb.color.findMany({
    where: {
      storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedData: ColorTable[] = colors.map((color) => ({
    name: color.name,
    value: color.value,
    createdAt: format(color.createdAt, "MMMM do, yyyy"),
    id: color.id,
  }));

  return (
    <div className="pt-6 p-8 space-y-4">
      <ColorClient colors={formattedData} />
    </div>
  );
};

export default ColorPage;
