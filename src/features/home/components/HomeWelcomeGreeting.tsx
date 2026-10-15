"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { WELCOME_GREETING_CONFIG, getTimeGreeting } from "../constants/welcome";

export function HomeWelcomeGreeting() {
  const {
    brandName,
    locationNotice,
    baseMessage,
    textStartDelayMs,
    charTypingMs,
    skipHint,
  } = WELCOME_GREETING_CONFIG;

  const [isLogoVisible, setIsLogoVisible] = useState(false);
  const [greetingLead, setGreetingLead] = useState("");
  const [charCount, setCharCount] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleSkip = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setGreetingLead(getTimeGreeting());
    setCharCount(baseMessage.length);
    setIsLogoVisible(true);
    setIsDone(true);
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    const currentGreeting = getTimeGreeting();

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      const immediateTimer = setTimeout(() => {
        setIsLogoVisible(true);
        setGreetingLead(currentGreeting);
        setCharCount(baseMessage.length);
        setIsDone(true);
      }, 0);
      return () => clearTimeout(immediateTimer);
    }

    const logoTimer = setTimeout(() => {
      setIsLogoVisible(true);
      setGreetingLead(currentGreeting);
    }, 100);

    let currentLength = 0;
    const tick = () => {
      currentLength += 1;
      setCharCount(currentLength);

      if (currentLength < baseMessage.length) {
        timerRef.current = setTimeout(tick, charTypingMs);
      } else {
        setIsDone(true);
        timerRef.current = null;
      }
    };

    const textTimer = setTimeout(() => {
      timerRef.current = setTimeout(tick, charTypingMs);
    }, textStartDelayMs);

    return () => {
      clearTimeout(logoTimer);
      clearTimeout(textTimer);
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [baseMessage, textStartDelayMs, charTypingMs]);

  const displayedText = baseMessage.slice(0, charCount);

  return (
    <section
      aria-label="Lời giới thiệu quán"
      onClick={!isDone ? handleSkip : undefined}
      className={`relative w-full max-w-4xl select-none transition-opacity ${
        !isDone ? "cursor-pointer" : ""
      }`}
      title={!isDone ? skipHint : undefined}
    >
      <div className="flex items-start gap-4 sm:gap-5">
        <div className="flex-1 min-w-0 space-y-1 pt-0.5">
          <div
            className={`space-y-1 transition-opacity duration-500 ease-[cubic-bezier(0.22,0.61,0.36,1)] ${
              isLogoVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            <h2 className="font-heading font-semibold text-xl sm:text-2xl text-text leading-tight">
              {brandName}
            </h2>

            <p className="font-heading font-medium text-sm sm:text-base text-primary leading-snug">
              {locationNotice}
            </p>

            {greetingLead ? (
              <p className="italic font-heading text-base sm:text-lg text-text/80 pt-1">
                {greetingLead}
              </p>
            ) : null}
          </div>

          <p className="font-body font-light text-sm sm:text-base text-text/90 leading-relaxed max-w-3xl">
            {displayedText}
            {!isDone ? (
              <span
                className="inline-block w-1.5 h-4 bg-primary/70 ml-1 rounded-2xs align-middle animate-pulse"
                aria-hidden="true"
              />
            ) : null}
          </p>
        </div>
      </div>
    </section>
  );
}
