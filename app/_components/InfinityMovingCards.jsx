"use client";

import { cn } from "../../utils/cn";
import React, { useEffect, useState, useRef } from "react";

export const InfiniteMovingCards = ({
  items,
  direction = "center",
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
  }, []);

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

      // Calculate required copies based on container width and add extra copies for seamless loop
      const containerWidth = containerRef.current.offsetWidth;
      const itemWidth = scrollerContent[0]?.offsetWidth || 100;
      const requiredCopies = Math.ceil(containerWidth / itemWidth) + 3;

      for (let i = 0; i < requiredCopies; i++) {
        scrollerContent.forEach((item) => {
          const duplicatedItem = item.cloneNode(true);
          if (scrollerRef.current) {
            scrollerRef.current.appendChild(duplicatedItem);
          }
        });
      }

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
      containerRef.current.style.setProperty("--animation-duration", "200s");
    }
  };

  const createListItem = (item, idx) => {
    const li = document.createElement("li");
    li.className = "relative rounded-2xl flex-shrink-0 px-5 py-2";
    li.innerHTML = `
      <blockquote>
        <div class="flex items-center justify-center">
          <div class="relative z-20 flex justify-center items-center">
            <span class="flex flex-col justify-center">
              <span class="text-[22px] leading-[1.6] text-black whitespace-nowrap font-bold">
                <img src="${item.src}" alt="${item.alt}" class="w-[30px] mt-[-1px] h-[30px] md:w-[46px] max-md:mt-[-9px] max-xl:mt-[-6px] md:h-[46px] xl:w-[53px] xl:h-[53px] hover:scale-105 transition-all duration-300"/>
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
      <div className="w-full  absolute inset-0 pointer-events-none [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]" />
      <ul
        ref={scrollerRef}
        className={cn(
          "flex w-max flex-nowrap", // Removed gap-1 and pr-4
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
        style={{
          paddingLeft: "0px", // Ensure no padding on left
          marginLeft: "0px", // Ensure no margin on left
        }}
      >
        {items.map((item, idx) => (
          <li
            className="relative  rounded-2xl flex-shrink-0 px-[15px] max-md:px-[12px] py-4"
            key={`${item.src}-${idx}`}
            style={{
              marginRight: "4px", // Consistent spacing between items
            }}
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
