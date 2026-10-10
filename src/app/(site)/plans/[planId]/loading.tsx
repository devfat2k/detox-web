import React from "react";
import { Container, Section, Card, Skeleton } from "@/components/ui";

export default function PlanDetailLoading() {
  return (
    <Section spacing="lg">
      <Container className="max-w-3xl space-y-8">
        <div className="space-y-3">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-10 w-3/4" />
          <Skeleton className="h-5 w-full" />
        </div>
        <Card className="space-y-4">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </Card>
      </Container>
    </Section>
  );
}
