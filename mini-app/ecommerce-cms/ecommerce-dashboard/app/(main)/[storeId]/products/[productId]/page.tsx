import prismaDb from "@/lib/prismadb";
import { ProductsForm } from "./components/productsForm";

interface Props {
  params: {
    productId: string;
    storeId: string;
  };
}

const Page = async ({ params }: Props) => {
  const { productId, storeId } = params;

  const product = await prismaDb.product.findUnique({
    where: {
      id: productId,
    },
    include: {
      images: true,
    },
  });

  const sizes = await prismaDb.size.findMany({
    where: {
      storeId,
    },
  });

  const colors = await prismaDb.color.findMany({
    where: {
      storeId,
    },
  });

  const categories = await prismaDb.category.findMany({
    where: {
      storeId,
    },
  });

  return (
    <div className="p-8 pt-6 space-y-4">
      <ProductsForm
        initData={product}
        colors={colors}
        sizes={sizes}
        categories={categories}
      />
    </div>
  );
};

export default Page;
