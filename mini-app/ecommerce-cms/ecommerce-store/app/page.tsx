import { getBillboard } from "@/actions/get-billboard";
import { Billboard } from "@/components/billboard";
import { Container } from "@/components/container";

const HomePage = async () => {
  const billboard = await getBillboard("98056332-ca10-47d0-aea4-51f7fb2c88cc");
  return (
    <Container>
      <Billboard data={billboard} />
    </Container>
  );
};

export default HomePage;
