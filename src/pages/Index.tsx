<div style={{ position: "fixed", bottom: 20, right: 20, zIndex: 9999, background: "red", padding: "10px" }}>
  TEST BOX
</div>

import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/home/HeroSection";
import UseCasesSection from "@/components/home/UseCasesSection";
import CTASection from "@/components/home/CTASection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <UseCasesSection />
      <CTASection />
    </Layout>
  );
};

export default Index;
