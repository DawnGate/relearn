import prismaDb from "@/lib/prismadb";
import { CategoryForm } from "./components/categoryForm";

interface Props {
  params: {
    categoryId: string;
    storeId: string;
  };
}

const Page = async ({ params }: Props) => {
  const { categoryId, storeId } = params;

  const category = await prismaDb.category.findUnique({
    where: {
      id: categoryId,
    },
  });

  const billboards = await prismaDb.billboard.findMany({
    where: {
      storeId,
    },
  });

  return (
    <div className="p-8 pt-6 space-y-4">
      <CategoryForm initData={category} billboards={billboards} />
    </div>
  );
};

export default Page;
