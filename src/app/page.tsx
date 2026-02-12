import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import VideoSection from "@/components/landing/VideoSection";
import Services from "@/components/landing/Services";
import MidBanner from "@/components/landing/MidBanner";
import PartnerSection from "@/components/landing/PartnerSection";
import Testimonials from "@/components/landing/Testimonials";
import ContactSection from "@/components/landing/ContactSection";
import HomeFinalCTA from "@/components/landing/HomeFinalCTA";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 overflow-x-hidden relative selection:bg-brand-600 selection:text-white">
      {/* Global Animated Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-brand-100/40 rounded-full blur-[120px] mix-blend-multiply animate-blob" />
        <div className="absolute top-[20%] right-[-10%] w-[50%] h-[50%] bg-brand-200/40 rounded-full blur-[120px] mix-blend-multiply animate-blob animation-delay-2000" />
        <div className="absolute bottom-[-10%] left-[20%] w-[50%] h-[50%] bg-brand-300/40 rounded-full blur-[120px] mix-blend-multiply animate-blob animation-delay-4000" />
      </div>

      <div className="relative z-10">
        <Navbar />
        <Hero />
        <VideoSection />
        <Services />
        <MidBanner />
        <PartnerSection />
        <Testimonials />
        <ContactSection />
        <HomeFinalCTA />
        <Footer />
      </div>
    </main>
  );
}
