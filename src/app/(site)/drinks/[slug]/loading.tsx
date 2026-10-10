import React from "react";
import { Container, Section, Card, Skeleton } from "@/components/ui";

export default function DrinkDetailLoading() {
  return (
    <Section spacing="lg">
      <Container className="max-w-3xl space-y-8">
        <div className="space-y-3">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-10 w-2/3" />
          <Skeleton className="h-5 w-full" />
        </div>
        <Card className="space-y-4">
          <Skeleton className="h-6 w-36" />
          <div className="flex gap-2">
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-8 w-20" />
          </div>
        </Card>
      </Container>
    </Section>
  );
}
