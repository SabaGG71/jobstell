"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { cn } from "../../utils/cn";

export const InfiniteMovingCards = ({
  items,
  direction = "center",
  pauseOnHover = false,
  className,
}) => {
  const containerRef = useRef(null);
  // State for the duplicated items
  const [duplicatedItems, setDuplicatedItems] = useState([]);

  // Calculate and update the duplicated items based on container width.
  const updateDuplications = useCallback(() => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      // Assume an approximate item width.
      // You could improve this by measuring one rendered item if needed.
      const approxItemWidth = 60;
      const requiredCopies = Math.ceil(containerWidth / approxItemWidth) + 3;

      // Create an array that duplicates the items as many times as needed.
      const newDuplicatedItems = [];
      for (let i = 0; i < requiredCopies; i++) {
        items.forEach((item) => {
          newDuplicatedItems.push(item);
        });
      }
      setDuplicatedItems(newDuplicatedItems);
    }
  }, [items]);

  useEffect(() => {
    updateDuplications();
    window.addEventListener("resize", updateDuplications);
    return () => window.removeEventListener("resize", updateDuplications);
  }, [updateDuplications]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative z-20 w-full overflow-hidden xl:[mask-image:linear-gradient(to_right,transparent_0%,white_10%,white_90%,transparent_100%)]",
        className
      )}
      // Set CSS variables for animation properties.
      style={{
        "--animation-duration": "200s",
        "--animation-direction": direction === "center" ? "normal" : "reverse",
      }}
    >
      <div className="w-full absolute inset-0 pointer-events-none [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]" />
      <ul
        className={cn(
          "flex w-max flex-nowrap animate-scroll", // the CSS animation is handled via keyframes
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
        style={{
          paddingLeft: 0,
          marginLeft: 0,
          // Force GPU acceleration by indicating that transform will change and using translateZ(0)
          willChange: "transform",
          transform: "translateZ(0)",
        }}
      >
        {duplicatedItems.map((item, idx) => (
          <li
            key={`${item.src}-${idx}`}
            className="relative rounded-2xl flex-shrink-0 px-[15px] max-md:px-[12px] py-4"
            style={{ marginRight: "4px" }}
          >
            <blockquote>
              <div className="flex items-center justify-center">
                <div className="relative z-20 flex justify-center items-center">
                  <span className="flex flex-col justify-center">
                    <span className="text-[22px] leading-[1.4] text-black whitespace-nowrap font-bold">
                      <img
                        src={item.src}
                        alt={item.alt}
                        className="w-[34px] mt-[-4px] h-[34px] md:w-[46px] max-md:mt-[-11px] max-xl:mt-[-6px] md:h-[46px] xl:w-[52px] xl:h-[52px] hover:scale-105 transition-all duration-300"
                      />
                    </span>
                  </span>
                </div>
              </div>
            </blockquote>
          </li>
        ))}
      </ul>
    </div>
  );
};
