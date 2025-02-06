"use client";

import React, { useEffect, useRef, useState, useCallback, memo } from "react";
import { cn } from "../../utils/cn";

// Memoized individual card component to prevent unnecessary re-renders
const Card = memo(({ item, idx }) => (
  <li
    className="relative rounded-2xl flex-shrink-0 px-[15px] max-md:px-[12px] py-4"
    style={{
      marginRight: "4px",
      willChange: "transform",
      transform: "translateZ(0)",
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
                loading="lazy"
              />
            </span>
          </span>
        </div>
      </div>
    </blockquote>
  </li>
));

Card.displayName = "Card";

const useResizeObserver = (callback) => {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new ResizeObserver((entries) => {
      callback(entries[0].contentRect);
    });

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [callback]);

  return ref;
};

export const InfiniteMovingCards = ({
  items,
  direction = "center",
  pauseOnHover = false,
  className,
}) => {
  const [duplicatedItems, setDuplicatedItems] = useState([]);
  const animationRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);

  // Calculate required duplications based on container width
  const updateDuplications = useCallback(
    (width) => {
      const approxItemWidth = 60;
      const requiredCopies = Math.ceil(width / approxItemWidth) + 3;

      const newDuplicatedItems = Array.from(
        { length: requiredCopies },
        () => items
      ).flat();
      setDuplicatedItems(newDuplicatedItems);
    },
    [items]
  );

  // Use ResizeObserver instead of window resize event
  const containerRef = useResizeObserver((rect) => {
    updateDuplications(rect.width);
  });

  // Performance optimization: Use IntersectionObserver to pause animation when not visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Cleanup animation frame on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  // Apply CSS containment for better performance
  const containerStyle = {
    contain: "content",
    "--animation-duration": "200s",
    "--animation-direction": direction === "center" ? "normal" : "reverse",
  };

  const listStyle = {
    paddingLeft: 0,
    marginLeft: 0,
    willChange: "transform",
    transform: "translate3d(0, 0, 0)",
    backfaceVisibility: "hidden",
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative z-20 w-full overflow-hidden xl:[mask-image:linear-gradient(to_right,transparent_0%,white_10%,white_90%,transparent_100%)]",
        className
      )}
      style={containerStyle}
    >
      <div className="w-full absolute inset-0 pointer-events-none [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]" />
      <ul
        className={cn(
          "flex w-max flex-nowrap",
          isVisible && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
        style={listStyle}
      >
        {duplicatedItems.map((item, idx) => (
          <Card key={`${item.src}-${idx}`} item={item} idx={idx} />
        ))}
      </ul>
    </div>
  );
};

// Add display name for better debugging
InfiniteMovingCards.displayName = "InfiniteMovingCards";
