import { auth } from "@clerk/nextjs/server";
import { SettingsForm } from "./components/settingsForm";
import { redirect } from "next/navigation";
import prismaDb from "@/lib/prismadb";

interface Props {
  params: {
    storeId: string;
  };
}

const SettingsPage = async ({ params }: Props) => {
  const { storeId } = params;

  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const store = await prismaDb.store.findFirst({
    where: {
      userId,
      id: storeId,
    },
  });

  if (!store) {
    redirect("/");
  }

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SettingsForm initData={store} />
      </div>
    </div>
  );
};

export default SettingsPage;
