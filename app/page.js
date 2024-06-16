import App from "@/components/layout/App";
import Wrapper from "@/components/layout/Wrapper";
import SectionHero from "@/components/SectionHero";
import Content from "@/components/Content";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <App>
      <Wrapper>
        <SectionHero />
        <Content />
        <Footer />
      </Wrapper>
    </App>
  );
}
