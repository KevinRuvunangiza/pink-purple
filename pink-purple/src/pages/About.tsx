import { LazyMotion, domAnimation, m } from "framer-motion"; // Fixed import
import Footer from "../components/Footer";
import HeroSection from "../components/sections/HeroSection";
import ServicesSection from "../components/sections/ServiceSection";
import WhoWeAre from "../components/sections/WhoWeAre";
import WhyChooseUs from "../components/sections/WhyChooseUs";

const fadeInUpVariants = {
  hidden: { 
    opacity: 0, 
    y: 40 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

export default function About() {
  return (
    <LazyMotion features={domAnimation} strict>
      <m.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUpVariants}
      >
        <HeroSection />
      </m.div>

      <m.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUpVariants}
      >
        <WhoWeAre />
      </m.div>

      <m.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUpVariants}
      >
        <ServicesSection />
      </m.div>

      <m.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUpVariants}
      >
        <WhyChooseUs />
      </m.div>

      <Footer />
    </LazyMotion>
  );
}