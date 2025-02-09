import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState, useCallback, memo } from "react";
import location from "../../public/location.svg";

const cn = (...classes) => classes.filter(Boolean).join(" ");

const JobCard = memo(({ item }) => {
  // Helper function to validate image source
  const getValidImageSrc = (src) => {
    if (!src || src === "") {
      return "/images/job-type-mask-4.jpg"; // Fixed path to job-type-mask-4
    }
    return src;
  };

  return (
    <li className="w-[300px] sm:w-[350px] md:w-[400px] lg:w-[450px] relative rounded-2xl flex-shrink-0 hover:to-primary-50 cursor-pointer duration-300 hover:translate-y-[-5px] transition-all px-4 sm:px-6 py-4 sm:py-6 bg-gradient-to-t from-white to-secondary-50">
      <blockquote>
        <div className="flex items-center relative justify-between">
          {/* Company logo image with source validation */}
          <Image
            src={item.src}
            className="rounded-full relative z-20 w-[55px] h-[55px] object-cover"
            width={70}
            height={70}
            alt={item.title || "Company logo"}
            priority={true}
          />
          <div className="text-white flex items-center border border-primary-400 bg-primary-400 box-shadow px-2 sm:px-3 relative z-20 p-1 sm:p-2 py-[4px] sm:py-[6px] rounded-full">
            <Link href="/" className="flex gap-2 sm:gap-3 items-center">
              <span className="text-white text-[14px] sm:text-[16px]">
                See Details
              </span>
              {/* Arrow icon with source validation */}
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
            {item.title || "Job Title"}
          </span>
        </div>

        <div className="flex gap-2 mt-3 items-center flex-wrap">
          <p className="text-[13px] flex items-center sm:text-[16px] font-[600] gap-2 text-secondary-800 border-r pr-2 border-secondary-200">
            {/* Location icon with source validation */}
            <Image
              className="w-[19px] h-[19px]"
              src={location}
              width={19}
              height={19}
              alt="location-svg"
            />
            {item.national || "Location"}
          </p>
          <p className="text-[13px] sm:text-[16px] text-secondary-500">
            {item.jobExp || "Experience"}
          </p>
        </div>

        <p className="my-3 sm:my-4 mb-5 sm:mb-7 text-sm sm:text-lg leading-7 text-secondary-600 line-clamp-3">
          {item.text || "Job description"}
        </p>

        <div className="flex mb-6 sm:mb-8 mt-6 sm:mt-9 flex-col gap-2">
          <div className="flex gap-2 sm:gap-3 flex-wrap text-secondary-800 text-[12px] sm:text-[14px]">
            <p className="border border-secondary-200 py-[4px] sm:py-[5px] px-3 sm:px-4 rounded-full">
              ✶ {item.skill1 || "Skill 1"}
            </p>
            <p className="border border-secondary-200 py-[4px] sm:py-[5px] px-3 sm:px-4 rounded-full">
              ✶ {item.skill2 || "Skill 2"}
            </p>
            <p className="border border-secondary-200 py-[4px] sm:py-[5px] px-3 sm:px-4 rounded-full">
              ✶ {item.skill3 || "Skill 3"}
            </p>
          </div>
        </div>
      </blockquote>
    </li>
  );
});

JobCard.displayName = "JobCard";

export const InfiniteMovingHrs = ({
  items,
  direction = "right",
  speed = "slow",
  pauseOnHover = true,
  className,
}) => {
  const containerRef = React.useRef(null);
  const scrollerRef = React.useRef(null);
  const [start, setStart] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const getSpeedValue = () => {
    switch (speed) {
      case "slow":
        return 100; // Adjusted from 200 to 150
      case "medium":
        return 100; // Adjusted from 150 to 100
      case "fast":
        return 100; // Adjusted from 100 to 75
      default:
        return 120; // Adjusted from 180 to 120
    }
  };

  useEffect(() => {
    if (!isClient) return;

    const styleSheet = document.createElement("style");
    const scrollerId = `scroller-${Math.random().toString(36).substr(2, 9)}`;

    if (containerRef.current) {
      containerRef.current.setAttribute("data-scroller-id", scrollerId);
    }

    styleSheet.textContent = `
      @keyframes scroll-${scrollerId} {
        from {
          transform: translateX(-50%);
        }
        to {
          transform: translateX(0);
        }
      }
      
      [data-scroller-id="${scrollerId}"] .animate-scroll {
        animation: scroll-${scrollerId} ${getSpeedValue()}s linear infinite;
        animation-direction: ${direction === "left" ? "reverse" : "forwards"};
      }
      
      [data-scroller-id="${scrollerId}"] .animate-scroll:hover {
        animation-play-state: ${pauseOnHover ? "paused" : "running"};
      }
    `;
    document.head.appendChild(styleSheet);

    return () => {
      document.head.removeChild(styleSheet);
    };
  }, [isClient, direction, speed, pauseOnHover]);

  const addAnimation = useCallback(() => {
    if (!isClient || !scrollerRef.current) return;

    const scrollerContent = Array.from(scrollerRef.current.children);

    const existingClones = scrollerRef.current.querySelectorAll(
      '[data-clone="true"]'
    );
    existingClones.forEach((clone) => clone.remove());

    scrollerContent.forEach((item) => {
      const duplicatedItem = item.cloneNode(true);
      duplicatedItem.setAttribute("data-clone", "true");
      scrollerRef.current.appendChild(duplicatedItem);
    });

    setStart(true);
  }, [isClient]);

  useEffect(() => {
    if (isClient) {
      addAnimation();
    }
  }, [isClient, addAnimation]);

  return (
    <div className="max-w-screen-2xl job-type-mask-4 mx-auto ">
      <div
        ref={containerRef}
        className={cn(
          "scroller relative z-20 max-md:mt-[10px] w-full overflow-hidden",
          className
        )}
      >
        <ul
          ref={scrollerRef}
          className={cn(
            "flex min-w-full shrink-0 gap-3 sm:gap-4 py-4 w-max flex-nowrap",
            start && isClient && "animate-scroll"
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
