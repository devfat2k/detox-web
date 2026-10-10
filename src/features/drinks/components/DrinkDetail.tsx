import React from "react";
import type { Drink } from "@/data/drinks";
import { Container, Section, Heading, Card, Notice, LinkButton, Chip } from "@/components/ui";
import { FIXED_LABELS } from "@/config/copy";
import { routes } from "@/config/routes";

export interface DrinkDetailProps {
  drink: Drink;
}

export function DrinkDetail({ drink }: DrinkDetailProps) {
  return (
    <Section spacing="lg">
      <Container className="max-w-3xl space-y-8">
        <header className="space-y-3">
          <span className="inline-block text-xs font-semibold uppercase tracking-wider text-accent">
            {drink.categoryName}
          </span>
          <Heading level={1} size="3xl">
            {drink.name}
          </Heading>
          <p className="font-body text-base text-text-muted">{drink.description}</p>
        </header>

        <Notice variant="info">
          {FIXED_LABELS.UNDER_CONSTRUCTION_NOTICE}
        </Notice>

        <Card className="space-y-4">
          <Heading level={2} size="xl">
            Thành phần nguyên liệu
          </Heading>
          <div className="flex flex-wrap gap-2">
            {drink.ingredients.map((item) => (
              <Chip key={item} label={item} />
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-border">
            <LinkButton href={routes.drinks()} variant="ghost">
              Quay lại danh sách thức uống
            </LinkButton>
            <LinkButton href={routes.consultation()} variant="primary">
              {FIXED_LABELS.CTA_CONSULTATION}
            </LinkButton>
          </div>
        </Card>
      </Container>
    </Section>
  );
}
