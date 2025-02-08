"use client";
import React, { useState, useEffect } from "react";
import { HoverBorderGradient } from "../_components/HoverBorderGradient";
import paused from "../../public/paused.svg";
import play from "../../public/play-btn-click.svg";
import Image from "next/image";

export function HoverBorderGradientDemo() {
  const [isPaused, setIsPaused] = useState(true);
  const [audio, setAudio] = useState(null);

  useEffect(() => {
    // Initialize audio in useEffect to avoid SSR issues
    setAudio(new Audio("/clickMouse.wav"));
  }, []);

  const handleClick = () => {
    if (audio) {
      audio.currentTime = 0; // Reset audio to start
      audio.play();
    }
    setIsPaused(!isPaused);
  };

  return (
    <div className="">
      <HoverBorderGradient
        containerClassName="rounded-full"
        as="button"
        className="bg-primary-100 box-shadow-dark py-2 text-secondary-900 font-[600] flex gap-2 text-[15px] items-center"
        onClick={handleClick}
      >
        {isPaused ? (
          <Image
            className="w-[25px] h-[25px] max-md:w-[22px] max-md:h-[22px]"
            src={paused}
            alt="paused-svg"
          />
        ) : (
          <Image
            className="w-[25px] h-[25px] max-md:w-[22px] max-md:h-[22px]"
            src={play}
            alt="play-svg"
          />
        )}
        <span className="max-md:text-[14px]">
          {isPaused ? "Pause Animation" : "Play Animation"}
        </span>
      </HoverBorderGradient>
    </div>
  );
}
