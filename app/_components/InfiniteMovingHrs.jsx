"use client";

import Image from "next/image";
import { cn } from "../../utils/cn";
import React, { useEffect, useState, useCallback, memo } from "react";
import Link from "next/link";
import location from "../../public/location.svg";

const JobCard = memo(({ item }) => (
  <li className="w-[300px] sm:w-[350px] md:w-[400px] lg:w-[450px] relative rounded-2xl flex-shrink-0 hover:to-primary-50 cursor-pointer duration-300 hover:translate-y-[-5px] transition-all px-4 sm:px-6 py-4 sm:py-6 bg-gradient-to-t from-white to-secondary-50">
    <blockquote>
      <div
        aria-hidden="true"
        className="user-select-none -z-1 pointer-events-none absolute -left-0.5 -top-0.5"
      ></div>
      <div className="flex items-center relative justify-between">
        <Image
          className="rounded-full relative z-20 w-[55px] h-[55px] object-cover"
          width={70}
          height={70}
          src={item.src}
          alt={item.title}
          priority={true}
        />
        <div className="text-white flex items-center border border-primary-400 bg-primary-400 box-shadow px-2 sm:px-3 relative z-20 p-1 sm:p-2 py-[4px] sm:py-[6px] rounded-full">
          <Link href="/" className="flex gap-2 sm:gap-3 items-center">
            <span className="text-white text-[14px] sm:text-[16px]">
              See Details
            </span>
            <Image
              src={item.icon}
              width={16}
              height={16}
              alt="right-arrow"
              className="w-[16px] sm:w-[18px] h-[16px] sm:h-[18px]"
            />
          </Link>
        </div>
      </div>

      <div className="relative z-20">
        <span className="block text-[20px] sm:text-[24px] mb-1 font-[400] mt-4 sm:mt-7 leading-[1.6] text-secondary-700">
          {item.title}
        </span>
      </div>

      <div className="flex gap-2 mt-3 items-center flex-wrap">
        <p className="text-[13px] flex items-center sm:text-[16px] font-[600] gap-2 text-secondary-800 border-r pr-2 border-secondary-200">
          <Image
            className="w-[19px] h-[19px]"
            src={location}
            alt="location-svg"
          />
          {item.national}
        </p>
        <p className="text-[13px] sm:text-[16px] text-secondary-500">
          {item.jobExp}
        </p>
      </div>

      <p className="my-3 sm:my-4 mb-5 sm:mb-7 text-sm sm:text-lg text-secondary-600 line-clamp-3">
        {item.text}
      </p>

      <div className="flex mb-6 sm:mb-8 mt-6 sm:mt-9 flex-col gap-2">
        <div className="flex gap-2 sm:gap-3 flex-wrap text-secondary-800 text-[12px] sm:text-[14px]">
          <p className="border border-secondary-200 py-[4px] sm:py-[5px] px-3 sm:px-4 rounded-full">
            ✶ {item.skill1}
          </p>
          <p className="border border-secondary-200 py-[4px] sm:py-[5px] px-3 sm:px-4 rounded-full">
            ✶ {item.skill2}
          </p>
          <p className="border border-secondary-200 py-[4px] sm:py-[5px] px-3 sm:px-4 rounded-full">
            ✶ {item.skill3}
          </p>
        </div>
      </div>
    </blockquote>
  </li>
));

JobCard.displayName = "JobCard";

export const InfiniteMovingHrs = ({
  items,
  direction = "right",
  pauseOnHover = true,
  className,
}) => {
  const containerRef = React.useRef(null);
  const scrollerRef = React.useRef(null);
  const [start, setStart] = useState(false);

  const getDirection = useCallback(() => {
    if (containerRef.current) {
      containerRef.current.style.setProperty(
        "--animation-direction",
        direction === "left" ? "reverse" : "forwards"
      );
    }
  }, [direction]);

  const addAnimation = useCallback(() => {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      // Clear existing clones
      const existingClones = scrollerRef.current.querySelectorAll(
        '[data-clone="true"]'
      );
      existingClones.forEach((clone) => clone.remove());

      // Add clones
      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        duplicatedItem.setAttribute("data-clone", "true");
        scrollerRef.current?.appendChild(duplicatedItem);
      });

      getDirection();
      setStart(true);
    }
  }, [getDirection]);

  useEffect(() => {
    addAnimation();
  }, [addAnimation]);

  return (
    <div className="max-w-screen-2xl mx-auto lg:px-8">
      <style jsx global>{`
        @keyframes scroll {
          from {
            transform: translateX(-50%);
          }
          to {
            transform: translateX(0);
          }
        }

        .animate-scroll {
          animation: scroll 80s linear infinite;
        }
 
        }
      `}</style>
      <div
        ref={containerRef}
        className={cn(
          "scroller relative z-20 max-md:mt-[15px] w-full overflow-hidden job-type-mask-4",
          className
        )}
      >
        <ul
          ref={scrollerRef}
          className={cn(
            "flex min-w-full shrink-0 gap-3 sm:gap-4 py-4 w-max flex-nowrap",
            start && "animate-scroll",
            pauseOnHover && "hover:[animation-play-state:paused]"
          )}
        >
          {items.map((item, idx) => (
            <JobCard key={`${item.title}-${idx}`} item={item} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default InfiniteMovingHrs;
