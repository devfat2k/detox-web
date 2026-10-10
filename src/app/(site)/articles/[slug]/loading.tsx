import React from "react";
import { Container, Section, Card, Skeleton } from "@/components/ui";

export default function ArticleDetailLoading() {
  return (
    <Section spacing="lg">
      <Container className="max-w-3xl space-y-8">
        <div className="space-y-3">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-10 w-4/5" />
          <Skeleton className="h-5 w-full" />
        </div>
        <Card className="space-y-4">
          <Skeleton className="h-6 w-36" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </Card>
      </Container>
    </Section>
  );
}
