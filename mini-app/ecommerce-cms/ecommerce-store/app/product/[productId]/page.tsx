import { getProduct } from "@/actions/get-product";
import { getProducts } from "@/actions/get-products";
import { Container } from "@/components/container";
import { Gallery } from "@/components/gallery";
import { ProductInfo } from "@/components/product-info";
import { ProductList } from "@/components/product-list";

interface Props {
  params: {
    productId: string;
  };
}

const ProductPage = async ({ params }: Props) => {
  const currentProduct = await getProduct(params.productId);

  const relatedProducts = await getProducts({
    categoryId: currentProduct?.category.id,
  });

  return (
    <Container>
      <div className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
          {/* Gallery */}
          <div>
            <Gallery images={currentProduct.images} />
          </div>
          {/* Info */}
          <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
            <ProductInfo product={currentProduct} />
          </div>
        </div>
        <hr className="my-10" />
        <ProductList title="Related Products" items={relatedProducts} />
      </div>
    </Container>
  );
};

export default ProductPage;
