"use client";

import React from "react";
import { InfiniteMovingCards2 } from "./InfiniteMovingCards2";

export function InfiniteMovingCardsDemo3() {
  return (
    <div className="h-[9rem] flex flex-col antialiased  items-center justify-center relative overflow-hidden">
      <InfiniteMovingCards2
        items={testimonials}
        direction="right"
        speed="slow"
      />
    </div>
  );
}

const testimonials = [
  {
    title: "Simulate Real Interviews",
    src: "/record.svg",
    alt: "record-svg",
  },
  {
    title: "Build Confidence for Interviews",
    src: "/grow.svg",
    alt: "grow-svg",
  },
  {
    title: "Get Personalized Feedback",
    src: "/checkIcon.svg",
    alt: "checkIcon-svg",
  },
  {
    title: "Practice with AI Voice",
    src: "/mic.svg",
    alt: "Microphone-svg",
  },
];
