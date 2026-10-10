import React from "react";
import type { Drink } from "@/data/drinks";
import { Container, Section, Heading, Card, Notice, LinkButton } from "@/components/ui";
import { FIXED_LABELS } from "@/config/copy";
import { routes } from "@/config/routes";

export interface DrinkListProps {
  drinks: readonly Drink[];
}

export function DrinkList({ drinks }: DrinkListProps) {
  return (
    <Section spacing="lg">
      <Container className="space-y-8">
        <header className="space-y-2">
          <Heading level={1} size="3xl">
            {FIXED_LABELS.PAGE_DRINKS_TITLE}
          </Heading>
          <p className="font-body text-base text-text-muted">
            {FIXED_LABELS.PAGE_DRINKS_DESC}
          </p>
        </header>

        <Notice variant="info">
          {FIXED_LABELS.UNDER_CONSTRUCTION_NOTICE}
        </Notice>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {drinks.map((drink) => (
            <Card key={drink.slug} className="flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <span className="inline-block text-xs font-semibold uppercase tracking-wider text-accent">
                  {drink.categoryName}
                </span>
                <Heading level={2} size="xl">
                  {drink.name}
                </Heading>
                <p className="font-body text-sm text-text-muted">{drink.description}</p>
              </div>

              <div className="pt-2">
                <LinkButton href={routes.drink(drink.slug)} variant="secondary" className="w-full">
                  Xem chi tiết
                </LinkButton>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}
