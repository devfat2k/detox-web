"use client";

import React, { useState } from "react";
import { DetoxBottle } from "@/components/ui";
import { THREE_DAY_FLOW } from "../constants/simulation";

export function DetoxSimulationCard() {
  const [activeDay, setActiveDay] = useState<number>(1);
  const currentDay = THREE_DAY_FLOW.find((d) => d.day === activeDay) || THREE_DAY_FLOW[0];

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="space-y-0.5">
          <span className="text-xs font-medium text-primary">
            Mô phỏng thực tế
          </span>
          <h3 className="font-heading font-semibold text-xl text-text">
            Cơ thể phản hồi thế nào sau 72 giờ?
          </h3>
        </div>

        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-bg border border-border self-start sm:self-auto select-none">
          {THREE_DAY_FLOW.map((item) => (
            <button
              key={item.day}
              type="button"
              onClick={() => setActiveDay(item.day)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                activeDay === item.day
                  ? "bg-surface text-primary font-semibold shadow-2xs border border-border"
                  : "text-text-muted hover:text-text"
              }`}
            >
              Ngày {item.day}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-surface p-5 sm:p-7 shadow-2xs space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-7 space-y-3">
            <div className="space-y-1">
              <span className="text-xs font-medium text-primary">
                {currentDay.focus}
              </span>
              <h4 className="font-heading font-semibold text-lg sm:text-xl text-text">
                {currentDay.title}
              </h4>
            </div>

            <div className="space-y-2 pt-1 font-body text-xs sm:text-sm leading-relaxed text-text-muted">
              <p>
                <b className="font-semibold text-text">Cảm nhận: </b>
                {currentDay.bodyFeeling}
              </p>
              <p>
                <b className="font-semibold text-text">Cơ chế: </b>
                {currentDay.mechanism}
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-2">
            <p className="text-xs font-medium text-text">
              Khẩu phần 5 chai trong ngày:
            </p>
            <div className="space-y-1.5 font-body text-xs">
              {currentDay.dailyBottles.map((bottle) => (
                <div
                  key={bottle.time}
                  className="flex items-center justify-between p-2 rounded-xl bg-bg/50 border border-border/70"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono text-primary font-medium w-10">
                      {bottle.time}
                    </span>
                    <span className="text-text font-medium">{bottle.name}</span>
                  </div>
                  <span className="text-text-muted text-[11px]">
                    {bottle.benefit}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
