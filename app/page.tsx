import { SneakerHero } from "@/components/homepage/sneaker-hero";
import { FeaturesSection } from "@/components/features/features-section";

export default function Home() {
  return (
    <div className="absolute inset-0 overflow-y-auto">
      <section className="h-screen w-full" id="home">
        <SneakerHero />
      </section>

      <section className="min-h-screen w-full" id="about">
        <FeaturesSection />
      </section>
    </div>
  );
}
