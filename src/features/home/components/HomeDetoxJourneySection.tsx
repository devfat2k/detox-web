"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Container, Section, Heading, LinkButton } from "@/components/ui";
import { ROUTES } from "@/config/routes";
import { FIXED_LABELS } from "@/config/copy";
import { THREE_DAY_FLOW } from "../constants/simulation";
import { PLAN_STAGES } from "../constants/stages";

export function HomeDetoxJourneySection() {
  const [activeDay, setActiveDay] = useState<number>(1);
  const currentStep = THREE_DAY_FLOW.find((d) => d.day === activeDay) || THREE_DAY_FLOW[0];
  const matchedPlan = PLAN_STAGES[activeDay - 1] || PLAN_STAGES[0];

  return (
    <Section id="detox-journey" spacing="lg" className="border-b border-border bg-surface/30">
      <Container className="space-y-8 sm:space-y-12">
        <div className="space-y-3 max-w-2xl">
          <span className="text-xs font-medium text-primary">
            Quá trình chuyển hóa
          </span>
          <Heading
            level={2}
            size="2xl"
            className="font-heading font-semibold text-2xl sm:text-3xl text-text tracking-tight"
          >
            Các giai đoạn khi cơ thể bạn detox
          </Heading>
          <p className="font-body text-sm sm:text-base text-text-muted leading-relaxed">
            Mỗi ngày detox là một bước chuyển biến rõ rệt của hệ tiêu hóa và năng lượng.
            Dạ dày được nghỉ ngơi, nước thừa ứ đọng được xả êm ái và cơ thể nhẹ bẫng tự nhiên.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 select-none">
          {THREE_DAY_FLOW.map((item) => (
            <button
              key={item.day}
              type="button"
              onClick={() => setActiveDay(item.day)}
              className={`p-4 rounded-2xl text-left transition-all border ${
                activeDay === item.day
                  ? "bg-surface border-primary shadow-2xs"
                  : "bg-surface/50 border-border/80 hover:border-border text-text-muted hover:text-text"
              }`}
            >
              <div className="flex items-center justify-between pb-2">
                <span className={`text-xs font-medium ${activeDay === item.day ? "text-primary" : "text-text-muted"}`}>
                  Giai đoạn {item.day}
                </span>
                {activeDay === item.day ? (
                  <span className="h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
                ) : null}
              </div>
              <p className="font-heading font-semibold text-sm sm:text-base text-text">
                {item.title.split(": ")[1]}
              </p>
              <p className="font-body text-xs text-text-muted pt-1 line-clamp-1">
                {item.focus}
              </p>
            </button>
          ))}
        </div>

        <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8 shadow-2xs space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            <div className="lg:col-span-7 space-y-4">
              <div className="space-y-1">
                <span className="text-xs font-medium text-primary">
                  Cảm nhận & Cơ chế ngày {currentStep.day}
                </span>
                <h3 className="font-heading font-semibold text-xl sm:text-2xl text-text">
                  {currentStep.title}
                </h3>
              </div>

              <div className="space-y-3 font-body text-sm text-text-muted leading-relaxed">
                <p>
                  <b className="font-semibold text-text">Cơ thể cảm nhận: </b>
                  {currentStep.bodyFeeling}
                </p>
                <p>
                  <b className="font-semibold text-text">Cơ chế tự nhiên: </b>
                  {currentStep.mechanism}
                </p>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  href={ROUTES.PLAN_DETAIL(matchedPlan.id)}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline transition-colors"
                >
                  <span>Xem {matchedPlan.title}</span>
                  <ArrowRight size={15} strokeWidth={1.75} aria-hidden="true" />
                </Link>
                <span className="text-xs text-text-muted font-body">
                  ({matchedPlan.phaseName})
                </span>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-2.5">
              <p className="text-xs font-medium text-text font-heading">
                Thực đơn 5 cữ tươi trong ngày {currentStep.day}:
              </p>
              <div className="space-y-2 font-body text-xs">
                {currentStep.dailyBottles.map((bottle) => (
                  <div
                    key={bottle.time}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-bg/50 border border-border/70"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono text-primary font-medium w-11 shrink-0">
                        {bottle.time}
                      </span>
                      <span className="text-text font-medium">{bottle.name}</span>
                    </div>
                    <span className="text-text-muted text-[11px] truncate max-w-[130px] sm:max-w-[180px]">
                      {bottle.benefit}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-border/80 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs sm:text-sm text-text-muted font-body">
              Chưa rõ giai đoạn nào vừa vặn với thể trạng hiện tại của bạn?
            </p>
            <LinkButton
              href={ROUTES.CONSULTATION}
              variant="primary"
              className="w-full sm:w-auto min-h-10 px-6 text-xs sm:text-sm font-medium justify-center"
            >
              <span>{FIXED_LABELS.CTA_CONSULTATION}</span>
              <ArrowRight size={15} strokeWidth={1.75} aria-hidden="true" />
            </LinkButton>
          </div>
        </div>
      </Container>
    </Section>
  );
}
