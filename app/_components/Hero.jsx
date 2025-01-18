import play from "../../public/play-btn.svg";
import energy from "../../public/energy.svg";
import Image from "next/image";
import { DotBackgroundDemo } from "./DotBackgroundDemo";
import { InfiniteMovingCardsDemo } from "./InfiniteMovingCardsDemo";
import { InfiniteMovingCardsDemo2 } from "./InfiniteMovingCardsDemo2";
import { Button } from "../../components/ui/button";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative h-[80vh] w-full">
      <DotBackgroundDemo />
      <div className="flex justify-center items-center py-[200px] flex-col z-30 relative">
        <h1 className="text-3xl leading-[30px] md:text-[50px] xl:text-[68px] mb-[22px] md:mb-[45px] xl:mb-[25px] xl:max-w-[70%]  xl:leading-[90px] mx-auto text-center text-secondary-700 font-[600]">
          Your Interview Success
        </h1>
        <div className="flex container mt-[-11px] items-center gap-3">
          <InfiniteMovingCardsDemo />
          <span className="text-3xl leading-[30px] xl:text-[68px] xl:max-w-[50%] md:text-[50px] xl:leading-[90px] text-center font-[600]">
            Portal
          </span>
          <InfiniteMovingCardsDemo2 />
        </div>
        <p className="text-center text-[18px] xl:text-[19px] mt-[40px] xl:mt-[60px] font-[400] max-md:px-4 text-secondary-500">
          Perfect your{" "}
          <span className=" text-primary-600 font-[500]"> skills</span> with
          real-time interview simulations.
        </p>
        <div className="text-center flex flex-col md:flex-row justify-center items-center max-md:mt-[43px] gap-3 mt-7">
          <Link href="/dashboard">
            <button className="flex max-md:py-2 py-3 hover:translate-y-[-2px] duration-300 transition-all items-center gap-2 bg-gradient-to-b from-primary-400 to-primary-500 box-shadow text-white px-[22px] rounded-full font-[400] text-lg xl:ml-2">
              Get Started
              <Image width={22} height={22} src={energy} alt="energy" />
            </button>
          </Link>
          <button className="flex max-md:py-2 max-md:px-4 items-center gap-[9px] py-3 border border-secondary-300  hover:bg-secondary-50  transition-all duration-300 hover:translate-y-[-3px]  px-[22px] rounded-full bg-white text-secondary-900 font-[400] text-lg max-md:text-[17px] max-md:mt-1">
            <Image width={20} height={20} src={play} alt="play-btn" />
            Listen To Screen
          </button>
        </div>
      </div>
    </section>
  );
}
