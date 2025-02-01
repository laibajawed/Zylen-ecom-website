import Container from "@/components/Container";
import HomeBanner from "@/components/HomeBanner";
import {ProductsGrid} from "@/components/ProductsGrid";


export default function Home() {
  return (
<div>
  <Container className="py-10">
    <HomeBanner/>
    <ProductsGrid />

  </Container>
</div>
  );
}
