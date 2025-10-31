import CTASection from "../components/sections/CTASection";
import HeroSection from "../components/sections/HeroSection";
import ServicesSection from "../components/sections/ServiceSection";
import WhoWeAre from "../components/sections/WhoWeAre";
import WhyChooseUs from "../components/sections/WhyChooseUs";


export default function LandingPage(){

    return(
        <>
        <HeroSection />
        <WhoWeAre />
        <ServicesSection />
        <WhyChooseUs />
        <CTASection />
        </>
    )
}