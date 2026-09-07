import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

import Hero from "../../components/sections/Hero";
import Brands from "../../components/sections/Brands";
import Features from "../../components/sections/Features";
import HowItWorks from "../../components/sections/HowItWorks";
import AIDemo from "../../components/sections/AIDemo";
import Testimonials from "../../components/sections/Testimonials";
import FAQ from "../../components/sections/FAQ";

export default function Landing() {
  return (
    <div className="bg-white text-black">
      <Navbar />
      <Hero />
      <Brands />
      <Features />
      <HowItWorks />
      <Testimonials />
      <FAQ />
      <AIDemo />
      <Footer />
    </div>
  );
}