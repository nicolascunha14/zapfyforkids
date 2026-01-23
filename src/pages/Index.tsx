import HeroSection from '@/components/HeroSection';
import AboutZapfy from '@/components/AboutZapfy';
import BenefitsForParents from '@/components/BenefitsForParents';
import BenefitsForKids from '@/components/BenefitsForKids';
import DemoSection from '@/components/DemoSection';
import SchoolSection from '@/components/SchoolSection';
import CtaSection from '@/components/CtaSection';
import DownloadGuideSection from '@/components/DownloadGuideSection';
import Footer from '@/components/Footer';
import { Navbar1 } from '@/components/ui/navbar-1';

const Index = () => {
  return (
    <main className="min-h-screen">
      <Navbar1 />
      <section id="hero">
        <HeroSection />
      </section>
      <section id="about">
        <AboutZapfy />
      </section>
      <section id="benefits-parents">
        <BenefitsForParents />
      </section>
      <section id="benefits-kids">
        <BenefitsForKids />
      </section>
      <DemoSection />
      <section id="schools">
        <SchoolSection />
      </section>
      <DownloadGuideSection />
      <CtaSection />
      <Footer />
    </main>
  );
};

export default Index;
