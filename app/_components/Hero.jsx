"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import play from "../../public/play-btn.svg";
import energy from "../../public/energy.svg";

// Dynamically import components without disabling SSR so they render immediately
const DotBackgroundDemo = dynamic(
  () => import("./DotBackgroundDemo").then((mod) => mod.DotBackgroundDemo),
  { ssr: true }
);

const InfiniteMovingCardsDemo = dynamic(
  () =>
    import("./InfiniteMovingCardsDemo").then(
      (mod) => mod.InfiniteMovingCardsDemo
    ),
  { ssr: true }
);

const InfiniteMovingCardsDemo2 = dynamic(
  () =>
    import("./InfiniteMovingCardsDemo2").then(
      (mod) => mod.InfiniteMovingCardsDemo2
    ),
  { ssr: true }
);

const InfiniteMovingCardsDemo3 = dynamic(
  () =>
    import("./InfiniteMovingCardsDemo3").then(
      (mod) => mod.InfiniteMovingCardsDemo3
    ),
  { ssr: true }
);

// HowItWorks is imported as a default export.
const HowItWorks = dynamic(() => import("./HowItWorks"), { ssr: true });

export default function Hero() {
  return (
    <section className="relative w-full">
      <DotBackgroundDemo />
      <div className="flex justify-center items-center pt-[180px] flex-col z-30 relative">
        <h1 className="max-sm:text-3xl max-sm:mb-3 max-md:text-[40px] leading-[30px] md:text-[53px] xl:text-[60px] mb-[22px] md:mb-[45px] xl:mb-[19px] xl:max-w-[60%] xl:leading-[90px] mx-auto text-center text-secondary-700 font-[600]">
          Your Interview Success
        </h1>
        <div className="flex max-md:mt-0 mx-auto container mt-[-11px] items-center gap-3">
          <InfiniteMovingCardsDemo />
          <span className="max-sm:text-3xl max-md:text-[40px] text-3xl mx-5 md:text-[53px] max-md:mx-3 xl:text-[60px] text-center font-[600]">
            Portal
          </span>
          <InfiniteMovingCardsDemo2 />
        </div>
        <p className="text-center text-[17px] xl:text-[18px] mt-[30px] xl:mt-[50px] font-[400] max-md:px-4 text-secondary-500">
          Perfect your{" "}
          <span className="text-primary-600 font-[500]"> skills</span> with
          real-time interview simulations.
        </p>
        <div className="text-center flex max-lg:flex-row justify-center items-center max-md:mt-[43px] gap-3 mt-7">
          <Link href="/dashboard">
            <button className="flex max-sm:px-3 max-md:flex-row max-md:py-[8px] py-[11px] max-md:text-sm hover:translate-y-[-2px] duration-300 transition-all items-center gap-2 bg-gradient-to-b from-primary-400 to-primary-500 hover:bg-primary-600 box-shadow text-white px-[20px] rounded-full font-[400] text-[17px] xl:ml-2">
              Get Started
              <Image
                width={22}
                height={22}
                className="max-md:w-[19px] max-md:h-[19px]"
                src={energy}
                alt="energy"
              />
            </button>
          </Link>
          <button className="flex max-sm:px-3 max-md:py-[8px] max-md:px-2 items-center gap-[9px] max-md:text-sm py-[11px] border border-secondary-300 hover:bg-secondary-50 transition-all duration-300 hover:translate-y-[-3px] px-[20px] rounded-full bg-white text-secondary-900 font-[400] text-[17px] max-md:text-[15px]">
            <Image
              width={19}
              height={19}
              className="max-md:w-[17px] max-md:h-[17px]"
              src={play}
              alt="play-btn"
            />
            Listen To Screen
          </button>
        </div>
        <div className="max-w-[95%] overflow-hidden">
          <InfiniteMovingCardsDemo3 />
        </div>
      </div>
      <HowItWorks />
    </section>
  );
}
