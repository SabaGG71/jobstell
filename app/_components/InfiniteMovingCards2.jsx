import Image from "next/image";
import { cn } from "../../utils/cn";
import React, { useEffect, useState } from "react";

export const InfiniteMovingCards2 = ({
  items,
  direction = "right",
  speed = "fast",
  pauseOnHover = true,
  className,
}) => {
  const containerRef = React.useRef(null);
  const scrollerRef = React.useRef(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    addAnimation();

    // Handle resize events for responsiveness
    const handleResize = () => {
      if (scrollerRef.current) {
        addAnimation();
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      // Clear existing duplicated items
      const originalItems = Array.from(scrollerRef.current.children).slice(
        0,
        items.length
      );
      scrollerRef.current.innerHTML = "";
      originalItems.forEach((item) => scrollerRef.current.appendChild(item));

      // Add duplicates for smooth infinite scroll
      const scrollerContent = Array.from(scrollerRef.current.children);
      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }

  const getDirection = () => {
    if (containerRef.current) {
      containerRef.current.style.setProperty(
        "--animation-direction",
        direction === "right" ? "forwards" : "reverse"
      );
    }
  };

  const getSpeed = () => {
    if (containerRef.current) {
      const speedMap = {
        fast: "20s",
        normal: "40s",
        slow: "80s",
      };
      containerRef.current.style.setProperty(
        "--animation-duration",
        speedMap[speed] || "40s"
      );
    }
  };

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
        ref={scrollerRef}
        className={cn(
          "flex min-w-full outline-none shrink-0 gap-10 py-4 w-max flex-nowrap",
          "transition-transform duration-500 ease-in-out",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {items.map((item, idx) => (
          <li
            key={idx}
            className="flex-shrink-0 outline-none w-auto transform transition-all duration-300 cursor-pointer "
          >
            <div className="relative outline-none z-20 flex items-center group">
              <span className="flex outline-none items-center gap-2 py-2 rounded-full backdrop-blur-sm transition-all duration-300">
                <Image
                  className="w-4 h-4 outline-none md:w-5 md:h-5   transition-opacity  duration-300"
                  width={20}
                  height={20}
                  src={item.src}
                  alt={item.alt}
                />
                <span className="text-sm outline-none md:text-[15px] text-secondary-500 group-hover:text-secondary-900 transition-colors duration-300">
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
