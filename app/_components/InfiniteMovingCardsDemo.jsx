"use client";

import React from "react";
import { InfiniteMovingCards } from "./InfinityMovingCards";

export function InfiniteMovingCardsDemo() {
  return (
    <div className="h-[2.7rem] md:h-[4rem] xl:h-[4.6rem] container cursor-pointer  flex flex-col bg-scroller job-type-mask antialiased items-center justify-center relative overflow-hidden">
      <InfiniteMovingCards
        items={testimonials}
        direction="right"
        speed={500}
        gap={6}
      />
    </div>
  );
}

const testimonials = [
  { src: "/sad-1.svg", alt: "Sad face 1" },
  { src: "/sad-4.svg", alt: "Sad face 4" },
  { src: "/sad-3.svg", alt: "Sad face 3" },
  { src: "/sad-2.svg", alt: "Sad face 2" },
  { src: "/sad-5.svg", alt: "Sad face 5" },
];
