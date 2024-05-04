import prismaDb from "@/lib/prismadb";
import { SizesForm } from "./components/sizesForm";

interface Props {
  params: {
    sizeId: string;
  };
}

const Page = async ({ params }: Props) => {
  const { sizeId } = params;

  const size = await prismaDb.size.findUnique({
    where: {
      id: sizeId,
    },
  });

  return (
    <div className="p-8 pt-6 space-y-4">
      <SizesForm initData={size} />
    </div>
  );
};

export default Page;
