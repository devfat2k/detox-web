import React from "react";
import { Container, Reveal } from "@/components/ui";
import { DRINKS_DATA } from "@/data/drinks";
import {
  HomeWelcomeGreeting,
  HomeHeroSectionV2, // Để dùng lại bản Hero cũ: đổi thành HomeHeroSection
  HomeDetoxJourneySection,
  HomeFaqMythsSection,
  HomeFeaturedDrinksSection,
} from "@/features/home/components";

export default function HomePage() {
  const featuredDrinks = DRINKS_DATA.slice(0, 5);

  return (
    <div className="flex flex-col">
      <div className="pt-6 pb-1 sm:pt-8 sm:pb-2">
        <Container>
          <HomeWelcomeGreeting />
        </Container>
      </div>

      <Reveal delay={100}>
        {/* Để dùng lại bản Hero cũ: đổi HomeHeroSectionV2 thành HomeHeroSection */}
        <HomeHeroSectionV2 />
      </Reveal>

      <Reveal delay={150}>
        <HomeDetoxJourneySection />
      </Reveal>

      <Reveal delay={200}>
        <HomeFaqMythsSection />
      </Reveal>

      <Reveal delay={250}>
        <HomeFeaturedDrinksSection drinks={featuredDrinks} />
      </Reveal>
    </div>
  );
}
