import prismaDb from "@/lib/prismadb";
import { BillboardsForm } from "./components/billboardsForm";

interface Props {
  params: {
    billboardId: string;
  };
}

const Page = async ({ params }: Props) => {
  const { billboardId } = params;

  const billboard = await prismaDb.billboard.findUnique({
    where: {
      id: billboardId,
    },
  });

  return (
    <div className="p-8 pt-6 space-y-4">
      <BillboardsForm initData={billboard} />
    </div>
  );
};

export default Page;
