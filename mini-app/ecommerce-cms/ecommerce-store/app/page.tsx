import { getBillboard } from "@/actions/get-billboard";
import { getProducts } from "@/actions/get-products";
import { Billboard } from "@/components/billboard";
import { Container } from "@/components/container";
import { ProductList } from "@/components/product-list";

const HomePage = async () => {
  const featuredProducts = await getProducts({ isFeatured: true });
  const billboard = await getBillboard("98056332-ca10-47d0-aea4-51f7fb2c88cc");

  return (
    <Container>
      <Billboard data={billboard} />
      <div className="px-4 py-10 sm:px-6 lg:px-8">
        <ProductList title="Featured Products" items={featuredProducts} />
      </div>
    </Container>
  );
};

export default HomePage;
