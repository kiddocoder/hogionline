import Navbar from "@/components/layouts/Navbar";
import HeroSection from "@/components/layouts/HeroSection";
import DomainPricing from "@/components/layouts/DomainPricing";
import HostingPlans from "@/components/layouts/HostingPlans";
import AboutSection from "@/components/layouts/AboutSection";
import Footer from "@/components/layouts/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <DomainPricing />
        <HostingPlans />
        <AboutSection />
      </main>
      <Footer />
    </div>
  );
};