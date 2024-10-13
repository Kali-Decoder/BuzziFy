import Download from "@/components/landing/sections/Download";
import Faq from "@/components/landing/sections/Faq";
import Features from "@/components/landing/sections/Features";
import Footer from "@/components/landing/sections/Footer";
import Hero from "@/components/landing/sections/Hero";
import Pricing from "@/components/landing/sections/Pricing";
import Testimonials from "@/components/landing/sections/Testimonials";
import React from "react";

const HomePage = () => {
  return (
    <>

        <main className="overflow-hidden">
          <Hero />
          <Features />
          {/* <Pricing /> */}
          <Faq />
          {/* <Testimonials /> */}
          <Download />
          <Footer />
        </main>
    </>
  );
};

export default HomePage;
