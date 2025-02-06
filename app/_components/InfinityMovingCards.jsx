"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { cn } from "../../utils/cn";

// A simple debounce helper to limit function calls on resize.
function debounce(func, wait) {
  let timeout;
  return function debounced(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func(...args);
    }, wait);
  };
}

export const InfiniteMovingCards = ({
  items,
  direction = "center",
  pauseOnHover = false,
  className,
}) => {
  const containerRef = useRef(null);
  const [duplicatedItems, setDuplicatedItems] = useState([]);
  const lastFrameTimestampRef = useRef(null);
  const frameTimesRef = useRef([]);

  // Calculate and update the duplicated items.
  const updateDuplications = useCallback(() => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      // Using an approximate item width; adjust if needed.
      const approxItemWidth = 60;
      const requiredCopies = Math.ceil(containerWidth / approxItemWidth) + 3;

      // Build a new array duplicating the items.
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
    // Call update once when the component mounts.
    updateDuplications();

    // Debounce the update on window resize.
    const debouncedUpdate = debounce(updateDuplications, 100);
    window.addEventListener("resize", debouncedUpdate);
    return () => {
      window.removeEventListener("resize", debouncedUpdate);
    };
  }, [updateDuplications]);

  // Monitor the frame rate and refresh the component if lag is detected.
  useEffect(() => {
    let rafId;
    const monitorFrameRate = (timestamp) => {
      if (lastFrameTimestampRef.current !== null) {
        const delta = timestamp - lastFrameTimestampRef.current;
        frameTimesRef.current.push(delta);

        // When we have collected 30 frames, compute the average frame time.
        if (frameTimesRef.current.length >= 30) {
          const avgFrameTime =
            frameTimesRef.current.reduce((a, b) => a + b, 0) /
            frameTimesRef.current.length;
          // If average frame time is greater than 60ms (~16.7 fps), refresh duplications.
          if (avgFrameTime > 60) {
            updateDuplications();
            // Reset the frame time collection.
            frameTimesRef.current = [];
          }
        }
      }
      lastFrameTimestampRef.current = timestamp;
      rafId = requestAnimationFrame(monitorFrameRate);
    };

    rafId = requestAnimationFrame(monitorFrameRate);
    return () => cancelAnimationFrame(rafId);
  }, [updateDuplications]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative z-20 w-full overflow-hidden xl:[mask-image:linear-gradient(to_right,transparent_0%,white_10%,white_90%,transparent_100%)]",
        className
      )}
      style={{
        "--animation-duration": "200s",
        "--animation-direction": direction === "center" ? "normal" : "reverse",
      }}
    >
      {/* Optional decorative overlay */}
      <div className="w-full absolute inset-0 pointer-events-none [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]" />
      <ul
        className={cn(
          "flex w-max flex-nowrap animate-scroll", // the scrolling animation is defined via CSS keyframes
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
        style={{
          paddingLeft: 0,
          marginLeft: 0,
          willChange: "transform",
          transform: "translate3d(0, 0, 0)",
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
