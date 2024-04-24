import { auth } from "@clerk/nextjs/server";

import prismaDb from "@/lib/prismadb";
import { redirect } from "next/navigation";

import { FirstLoadModal } from "./components/first-load-modal";

const Page = async () => {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const store = await prismaDb.store.findFirst({
    where: {
      userId,
    },
  });

  if (store) {
    redirect(`/${store.id}`);
  }

  return <FirstLoadModal />;
};

export default Page;
