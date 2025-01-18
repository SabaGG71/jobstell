"use client";

import { cn } from "../../utils/cn";
import React, { useEffect, useState, useRef } from "react";

export const InfiniteMovingCards = ({
  items,
  direction = "center",
  speed = 100,
  pauseOnHover = false,
  className,
}) => {
  const containerRef = useRef(null);
  const scrollerRef = useRef(null);
  const [start, setStart] = useState(false);
  const animationRef = useRef(null);

  const cleanup = () => {
    if (containerRef.current) {
      containerRef.current.style.removeProperty("--animation-duration");
      containerRef.current.style.removeProperty("--animation-direction");
    }
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  };

  useEffect(() => {
    addAnimation();
    return () => cleanup();
  }, [speed, direction]);

  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      if (scrollerRef.current.children.length > items.length) {
        scrollerRef.current.innerHTML = "";
        items.forEach((item, idx) => {
          const listItem = createListItem(item, idx);
          scrollerRef.current?.appendChild(listItem);
        });
      }

      const scrollerContent = Array.from(scrollerRef.current.children);
      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      animationRef.current = requestAnimationFrame(() => {
        setAnimationProperties();
        setStart(true);
      });
    }
  }

  const setAnimationProperties = () => {
    if (containerRef.current) {
      containerRef.current.style.setProperty(
        "--animation-direction",
        direction === "center" ? "forwards" : "reverse"
      );

      const animationDuration = Math.min(Math.max(5, Math.abs(speed)), 30);
      containerRef.current.style.setProperty(
        "--animation-duration",
        `${animationDuration}s`
      );
    }
  };

  // Update this function to properly handle images
  const createListItem = (item, idx) => {
    const li = document.createElement("li");
    li.className = "relative rounded-2xl flex-shrink-0  px-4 py-2";
    li.innerHTML = `
      <blockquote>
        <div class="flex items-center justify-center">
          <div class="relative z-20 flex justify-center items-center">
            <span class="flex flex-col justify-center">
              <span class="text-[22px] leading-[1.6] text-black whitespace-nowrap font-bold">
                <img src="${item.src}" alt="${item.alt}" class="w-[32px] h-[32px] md:w-[48px] md:h-[48px] xl:w-[55px] xl:h-[55px] hover:scale-105 transition-all duration-300"/>
              </span>
            </span>
          </div>
        </div>
      </blockquote>
    `;
    return li;
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative z-20 w-full overflow-hidden xl:[mask-image:linear-gradient(to_right,transparent_0%,white_10%,white_90%,transparent_100%)]",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex gap-1 w-max flex-nowrap",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {items.map((item, idx) => (
          <li
            className="relative rounded-2xl flex-shrink-0 px-4 py-4"
            key={`${item.src}-${idx}`}
          >
            <blockquote>
              <div className="flex items-center justify-center">
                <div className="relative z-20 flex justify-center items-center">
                  <span className="flex max-md:mt-[-9px] max-lg:mt-[-7px] max-xl:mt-[-7px] mt-[0px] flex-col justify-center">
                    <span className="text-[22px] leading-[1.6] text-black whitespace-nowrap font-bold">
                      <img
                        src={item.src}
                        alt={item.alt}
                        className="w-[32px] h-[32px] md:w-[48px] md:h-[48px] xl:w-[55px] xl:h-[55px] hover:scale-105 transition-all duration-300"
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
