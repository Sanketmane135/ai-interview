import HeroAndFeatures from "@/components/features";
import Hero from "@/components/hero";
import Navbar from "@/components/navbar";
import HowItWorks from "@/components/working";

export default function Home() {
  return (
    <div className="w-full ">
        <Navbar/>
        <Hero/>
        <HeroAndFeatures/>
        <HowItWorks/>
        
    </div>
  );
}
