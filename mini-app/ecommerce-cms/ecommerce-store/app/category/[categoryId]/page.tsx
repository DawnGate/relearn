import { getCategory } from "@/actions/get-category";
import { getColors } from "@/actions/get-colors";
import { getProducts } from "@/actions/get-products";
import { getSizes } from "@/actions/get-sizes";
import { Billboard } from "@/components/billboard";
import { Container } from "@/components/container";
import { Filter } from "./components/filter";
import { NoResult } from "@/components/no-result";
import { ProductItem } from "@/components/product-item";
import { MobileFilters } from "./components/mobile-filter";

interface Props {
  params: {
    categoryId: string;
  };
  searchParams: {
    colorId: string;
    sizeId: string;
  };
}

const CategoryPage = async ({ params, searchParams }: Props) => {
  const category = await getCategory(params.categoryId);
  const colors = await getColors();
  const sizes = await getSizes();

  const products = await getProducts({
    categoryId: params.categoryId,
    colorId: searchParams.colorId,
    sizeId: searchParams.sizeId,
  });

  return (
    <Container>
      <Billboard data={category.billboard} />
      <div className="px-4 py-10 sm:px-6 lg:px-8 pb-24">
        <div className="lg:grid lg:grid-cols-5 lg:gap-x-8">
          {/* Mobile Filter */}
          <div className="block lg:hidden">
            <MobileFilters colors={colors} sizes={sizes} />
          </div>

          {/* Desktop Filter */}
          <div className="hidden lg:block">
            <Filter data={sizes} name="Sizes" valueKey="sizeId" />
            <Filter data={colors} name="Colors" valueKey="colorId" />
          </div>
          <div className="mt-6 lg:col-span-4 lg:mt-0">
            {products.length === 0 && <NoResult />}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {products.map((item) => (
                <ProductItem key={item.id} item={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default CategoryPage;
