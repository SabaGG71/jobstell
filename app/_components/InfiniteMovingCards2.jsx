"use client";

import Image from "next/image";
import { cn } from "../../utils/cn";
import React, { useEffect, useRef, useState, useCallback } from "react";

export const InfiniteMovingCards2 = ({
  items,
  direction = "right",
  speed = "slow", // Default remains "slow"
  pauseOnHover = true,
  className,
}) => {
  const containerRef = useRef(null);
  const [duplicatedItems, setDuplicatedItems] = useState([]);
  const [start, setStart] = useState(false);

  // Calculate how many copies of the items are needed for a seamless scroll.
  const updateDuplications = useCallback(() => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      // Use an approximate width for each item (adjust this value to your design)
      const approxItemWidth = 120;
      const requiredCopies = Math.ceil(containerWidth / approxItemWidth) + 2;
      const newDupItems = [];
      for (let i = 0; i < requiredCopies; i++) {
        items.forEach((item) => newDupItems.push(item));
      }
      setDuplicatedItems(newDupItems);
      // Trigger the animation after the items have been updated.
      setStart(true);
    }
  }, [items]);

  // Set CSS animation properties on the container
  const updateAnimationProperties = useCallback(() => {
    if (containerRef.current) {
      const speedMap = {
        fast: "20s",
        normal: "40s",
        slow: "220s", // Increased duration for a slower scroll effect
      };
      containerRef.current.style.setProperty(
        "--animation-duration",
        speedMap[speed] || "220s"
      );
      containerRef.current.style.setProperty(
        "--animation-direction",
        direction === "right" ? "normal" : "reverse"
      );
    }
  }, [direction, speed]);

  useEffect(() => {
    updateAnimationProperties();
    updateDuplications();
    const handleResize = () => {
      updateDuplications();
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [updateAnimationProperties, updateDuplications]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 w-full max-w-3xl mx-auto overflow-hidden",
        "[mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        "transition-all duration-500 ease-in-out",
        className
      )}
    >
      <div className="flex flex-col max-md:mt-[80px] mt-12 md:flex-row justify-center items-center gap-2">
        <div className="hidden md:block w-0 md:w-[200px] lg:w-[300px] h-[1px] bg-secondary-100 transform transition-all duration-300" />
        <p className="text-center mx-1 text-secondary-500 text-sm md:text-[15px] font-[400]">
          What We Offer
        </p>
        <div className="hidden md:block w-0 md:w-[200px] lg:w-[300px] h-[1px] bg-secondary-100 transform transition-all duration-300" />
      </div>

      <ul
        className={cn(
          "flex min-w-full outline-none shrink-0 gap-10 py-4 w-max flex-nowrap",
          "transition-transform duration-500 ease-in-out",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
        style={{
          // Force hardware acceleration
          willChange: "transform",
          transform: "translateZ(0)",
        }}
      >
        {duplicatedItems.map((item, idx) => (
          <li
            key={idx}
            className="flex-shrink-0 outline-none w-auto transform transition-all duration-300 cursor-pointer"
          >
            <div className="relative outline-none z-20 flex items-center group">
              <span className="flex items-center gap-2 py-2 rounded-full backdrop-blur-sm transition-all duration-300">
                <Image
                  className="w-4 h-4 md:w-5 md:h-5 transition-opacity duration-300"
                  width={20}
                  height={20}
                  src={item.src}
                  alt={item.alt}
                />
                <span className="text-sm md:text-[15px] text-secondary-500 group-hover:text-secondary-900 transition-colors duration-300">
                  {item.title}
                </span>
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
