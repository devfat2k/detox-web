import React from "react";
import { Container, Section, Heading } from "@/components/ui";
import { HONEST_STATS } from "../constants/stats";

export function HomeStatsSection() {
  return (
    <Section spacing="md" className="border-b border-border bg-surface/30">
      <Container className="space-y-8">
        <div className="space-y-2 max-w-xl">
          <Heading
            level={2}
            size="2xl"
            className="font-semibold text-xl sm:text-2xl text-text tracking-tight"
          >
            Thực tế và nguyên bản
          </Heading>
          <p className="text-sm sm:text-base text-text-muted font-body leading-relaxed">
            Không lời hứa thần kỳ hay cam kết giảm cân phi khoa học.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {HONEST_STATS.map((stat) => (
            <div
              key={stat.value}
              className="space-y-2 rounded-2xl border border-border bg-surface p-5 sm:p-6 shadow-2xs"
            >
              <span className="font-heading font-semibold text-3xl sm:text-4xl text-primary tracking-tight block">
                {stat.value}
              </span>
              <span className="text-sm font-semibold text-text block font-heading">
                {stat.label}
              </span>
              <p className="text-xs sm:text-sm text-text-muted font-body leading-relaxed">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
