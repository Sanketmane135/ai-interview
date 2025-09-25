import HeroAndFeatures from "@/components/features";
import Hero from "@/components/hero";
import HowItWorks from "@/components/working";

export default function Home() {
  return (
    <div className="w-full ">
        <Hero/>
        <HeroAndFeatures/>
        <HowItWorks/>
        
    </div>
  );
}
