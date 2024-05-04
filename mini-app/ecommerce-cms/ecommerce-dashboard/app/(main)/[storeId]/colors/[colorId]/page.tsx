import prismaDb from "@/lib/prismadb";
import { ColorsForm } from "./components/colorsForm";

interface Props {
  params: {
    colorId: string;
  };
}

const Page = async ({ params }: Props) => {
  const { colorId } = params;

  const color = await prismaDb.color.findUnique({
    where: {
      id: colorId,
    },
  });

  return (
    <div className="p-8 pt-6 space-y-4">
      <ColorsForm initData={color} />
    </div>
  );
};

export default Page;
