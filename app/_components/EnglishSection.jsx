"use client";

import Image from "next/image";
import { memo, useMemo } from "react";
import Noises from "./Noises";
import happy from "../../public/happy.svg";
import voice from "../../public/voice.svg";
import grammer from "../../public/grammer.svg";
import user from "../../public/userr.svg";
import energy2 from "../../public/energy2.svg";
import { AccordionIcons } from "./AccardionIcons";

function EnglishSection() {
  // Memoize the inline style so that it isn't re-created on every render.
  const noisesContainerStyle = useMemo(
    () => ({
      minHeight: "350px",
      overflow: "hidden",
    }),
    []
  );

  return (
    <section className="relative mt-[200px] mb-[300px]">
      <div className="flex container text-[17px] mb-6 text-secondary-600 text-center justify-center items-center">
        <div className="hidden md:block w-0 md:w-[200px] lg:w-[300px] h-[1px] bg-secondary-200 transform transition-all duration-300 [mask-image:linear-gradient(to_right,transparent,white_80%,white_20%,transparent)]" />
        <p className="border flex gap-2 items-center border-secondary-200 text-[15px] px-4 py-1 rounded-full">
          <Image className="w-[17px] h-[17px]" src={happy} alt="happy-svg" />
          Fluent &amp; ready
        </p>
        <div className="hidden md:block w-0 md:w-[200px] lg:w-[300px] h-[1px] bg-secondary-200 transform transition-all duration-300 [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]" />
      </div>
      <h3 className="text-center max-md:max-w-[90%] mx-auto justify-center items-center text-[34px] text-secondary-700 mb-[80px] max-md:mb-[60px] max-md:text-[24px]">
        AI Voice Assistant – Speak With <br />
        <span className="text-secondary-900 font-[600]"> Confidence</span>
      </h3>

      <div className="max-w-[1080px] relative mx-auto max-xl:container grid grid-cols-1 lg:grid-cols-2">
        <div>
          <h3 className="text-[34px] max-w-[80%] font-[400] my-4 mb-6">
            Advance Your Communication{" "}
            <span className="font-[600] text-primary-500">Skills</span>
          </h3>
          <p className="text-[17px] max-w-[85%] text-secondary-500 mb-5 leading-7">
            Practice real-world scenarios,{" "}
            <span className="font-[600] text-secondary-900 relative">
              refine your grammar{" "}
            </span>
            , and receive immediate feedback to improve your fluency and
            communication.
          </p>
          <div>
            <AccordionIcons />
          </div>
        </div>
        <div>
          <div className="bg-gradient-to-b relative flex flex-col items-center justify-center gap-9 p-24 rounded-3xl from-primary-100 to-primary-300">
            <div className="w-[1px] h-[330px] absolute top-0 bg-gradient-to-b from-white/10 to-white/80" />
            <div
              className="absolute w-full rounded-3xl inset-0 z-0 masky-3 max-sm:h-[350px] h-[450px] border-none"
              style={noisesContainerStyle}
            >
              <Noises
                patternSize={220}
                patternScaleX={1.2}
                patternScaleY={1.2}
                patternRefreshInterval={2}
                patternAlpha={15}
              />
            </div>
            <div className="text-center relative hover:rotate-[4deg] cursor-pointer duration-300 transition-all z-10 gap-2 bg-[#b470f0] box-shadow text-white p-[8px] px-4 rounded-full flex items-center">
              <span>
                <Image
                  className="w-[21px] h-[21px]"
                  src={voice}
                  alt="voice-svg"
                />
              </span>
              <p className="text-[15px] font-[600]">Talk Like a Pro</p>
            </div>
            <div className="text-center hover:rotate-[-4deg] cursor-pointer duration-300 transition-all relative z-10 gap-3 bg-[#a35ee0] box-shadow text-white p-[8px] px-4 rounded-full flex items-center">
              <span>
                <Image
                  className="w-[19px] h-[19px]"
                  src={grammer}
                  alt="grammer-svg"
                />
              </span>
              <p className="text-[15px] font-[600]">Refine Your Grammar</p>
            </div>
            <div className="text-center hover:rotate-[4deg] cursor-pointer duration-300 transition-all relative z-10 gap-3 bg-[#693696] box-shadow text-white p-2 px-4 rounded-full flex items-center">
              <span>
                <Image
                  className="w-[20px] h-[20px]"
                  src={user}
                  alt="user-svg"
                />
              </span>
              <p className="text-[15px] font-[600]">Simulate HR Training</p>
            </div>
            <div className="text-center hover:rotate-[-4deg] cursor-pointer duration-300 transition-all relative z-10 gap-2 bg-[#3c2153] box-shadow text-white p-2 px-5 rounded-full flex items-center">
              <span>
                <Image
                  className="w-[18px] h-[18px]"
                  src={energy2}
                  alt="energy2-svg"
                />
              </span>
              <p className="text-[15px] font-[600]">Confidence Boosted</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(EnglishSection);
