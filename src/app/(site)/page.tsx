import React from "react";
import { Container, Reveal } from "@/components/ui";
import { DRINKS_DATA } from "@/data/drinks";
import { ARTICLES_DATA } from "@/data/articles";
import {
  HomeWelcomeGreeting,
  HomeHeroSection,
  HomeDetoxJourneySection,
  HomeFaqMythsSection,
  HomeFeaturedDrinksSection,
  HomeFeaturedArticleSection,
} from "@/features/home/components";

export default function HomePage() {
  const featuredDrinks = DRINKS_DATA.slice(0, 3);
  const featuredArticle = ARTICLES_DATA[0];

  return (
    <div className="flex flex-col">
      <div className="pt-6 pb-1 sm:pt-8 sm:pb-2">
        <Container>
          <HomeWelcomeGreeting />
        </Container>
      </div>

      <Reveal delay={100}>
        <HomeHeroSection />
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

      <Reveal delay={300}>
        <HomeFeaturedArticleSection article={featuredArticle} />
      </Reveal>
    </div>
  );
}
