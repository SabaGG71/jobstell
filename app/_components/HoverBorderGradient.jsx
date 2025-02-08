"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "../../utils/cn";

export function HoverBorderGradient({
  children,
  containerClassName,
  className,
  as: Tag = "button",
  duration = 1,
  clockwise = true,
  ...props
}) {
  const [hovered, setHovered] = useState(false);
  const [direction, setDirection] = useState("TOP");

  const rotateDirection = (currentDirection) => {
    const directions = ["TOP", "LEFT", "BOTTOM", "RIGHT"];
    const currentIndex = directions.indexOf(currentDirection);
    const nextIndex = clockwise
      ? (currentIndex - 1 + directions.length) % directions.length
      : (currentIndex + 1) % directions.length;
    return directions[nextIndex];
  };

  const movingMap = {
    TOP: "radial-gradient(10.7% 50% at 50% 0%, #A354FF   20%, rgba(255, 255, 255, 0) 100%)",
    LEFT: "radial-gradient(26.6% 43.1% at 0% 50%, #A354FF   20%, rgba(255, 255, 255, 0) 100%)",
    BOTTOM:
      "radial-gradient(10.7% 50% at 50% 100%, #A354FF   20%, rgba(255, 255, 255, 0) 100%)",
    RIGHT:
      "radial-gradient(26.2% 41.199999999999996% at 100% 50%, #A354FF   0%, rgba(255, 255, 255, 0) 100%)",
  };

  useEffect(() => {
    let interval;
    if (!hovered) {
      interval = setInterval(() => {
        setDirection((prevState) => rotateDirection(prevState));
      }, duration * 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [hovered, duration]);

  return (
    <Tag
      onMouseEnter={() => {
        setHovered(true);
      }}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        "relative flex rounded-full transition duration-500 gap-10 justify-center overflow-visible decoration-clone",
        containerClassName
      )}
      {...props}
    >
      <div
        className={cn(
          "w-auto duration-300 transition-all hover:scale-[0.97] hover:bg-primary-100 hover:text-secondary-900 z-10 px-4 py-2 rounded-[inherit]",
          className
        )}
      >
        {children}
      </div>
      <motion.div
        className={cn(
          "flex-none inset-0 overflow-hidden absolute z-0 rounded-[inherit]"
        )}
        style={{
          filter: "blur(2px)",
          position: "absolute",
          width: "100%",
          height: "100%",
        }}
        initial={{ background: movingMap[direction] }}
        animate={{
          background: hovered
            ? "radial-gradient(20.7% 50% at 50% 0%, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0) 100%)"
            : movingMap[direction],
        }}
        transition={{ ease: "linear", duration: duration }}
      />
      <div className="absolute z-1 flex-none inset-[2px] rounded-full" />
    </Tag>
  );
}
