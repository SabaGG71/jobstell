"use client";

import React from "react";
import { InfiniteMovingCards } from "./InfinityMovingCards";

export function InfiniteMovingCardsDemo2() {
  return (
    <div className="h-[2.7rem] md:h-[4rem] xl:h-[4.6rem] container cursor-pointer  flex flex-col bg-scroller-2 job-type-mask-2 antialiased items-center justify-center relative overflow-hidden">
      <InfiniteMovingCards
        items={testimonials}
        direction="left"
        speed={500}
        gap={6}
      />
    </div>
  );
}

const testimonials = [
  { src: "/happy-1.svg", alt: "happy face 1" },
  { src: "/happy-4.svg", alt: "happy face 4" },
  { src: "/happy-3.svg", alt: "happy face 3" },
  { src: "/happy-2.svg", alt: "happy face 2" },
  { src: "/happy-5.svg", alt: "happy face 5" },
];
