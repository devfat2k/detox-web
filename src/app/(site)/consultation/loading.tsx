import React from "react";
import { Container, Section, Card, Skeleton } from "@/components/ui";

export default function ConsultationLoading() {
  return (
    <Section spacing="md">
      <Container className="max-w-2xl">
        <Card className="space-y-6">
          <div className="space-y-3">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-8 w-2/3" />
            <Skeleton className="h-4 w-full" />
          </div>
          <div className="space-y-3 pt-4">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        </Card>
      </Container>
    </Section>
  );
}
