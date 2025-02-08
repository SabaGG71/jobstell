import { HoverBorderGradientDemo } from "../_components/HoverBorderGradientDemo";
import React from "react";
import { InfiniteMovingHr } from "./InfiniteMovingHr";

const HrSection = () => {
  return (
    <>
      <section className="container max-md:max-w-[90%] mt-[100px] sm:mt-[160px] md:mt-[220px] mb-[20px] sm:mb-[30px] px-4 sm:px-6">
        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-8 lg:gap-4">
          {/* Left Content */}
          <div>
            <h3 className="max-sm:max-w-[90%] items-center text-[34px] text-secondary-700 mb-[20px] max-sm:text-[24px]">
              Meet the <span className="font-[600]">HR Leaders</span> Who{" "}
              <br className="hidden sm:block" />
              Support Us
            </h3>
            <p className="text-[17px] max-sm:text-[15px] max-sm:max-w-[90%]  text-secondary-500 max-md:mb-6 mb-12 max-sm:leading-6 leading-7">
              Dedicated HR professionals who help us grow and succeed.
            </p>
          </div>

          {/* Right Content */}
          <div className="flex flex-col items-start lg:items-end">
            <div className="mb-6 w-full lg:w-auto">
              <HoverBorderGradientDemo />
            </div>

            {/* Hashtags */}
            <div className="flex flex-wrap gap-3 sm:gap-6 w-full lg:w-auto justify-start lg:justify-end">
              <span className="text-secondary-600 text-[13px] sm:text-[14px] md:text-[15px]">
                #OurHRPartners
              </span>
              <span className="text-primary-600 text-[13px] sm:text-[14px] md:text-[15px] border-l border-r border-secondary-100 px-3 sm:px-4 md:px-5">
                #HRGameChangers
              </span>
              <span className="text-secondary-600 text-[13px] sm:text-[14px] md:text-[15px]">
                #TrustedInterviewPrep
              </span>
            </div>
          </div>
        </div>
      </section>

      <div className="w-full">
        <InfiniteMovingHr />
      </div>
    </>
  );
};

export default HrSection;
