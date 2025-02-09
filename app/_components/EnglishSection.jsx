"use client";

import Image from "next/image";
import { memo, useMemo } from "react";
import Noises from "./Noises";
import happy from "../../public/happy.svg";
import voice from "../../public/voice.svg";
import grammer from "../../public/grammer.svg";
import user from "../../public/userr.svg";
import energy2 from "../../public/energy2.svg";
import checkbox from "../../public/checkbox.svg";
import bgAbsolute from "../../public/bgSvgAbsolute.svg";

function EnglishSection() {
  const noisesContainerStyle = useMemo(
    () => ({
      minHeight: "350px",
      overflow: "hidden",
    }),
    []
  );

  return (
    <section className="relative mt-[200px]">
      <div className="flex container text-[17px] mb-6 text-secondary-600 text-center justify-center items-center">
        <div className="hidden md:block w-0 md:w-[200px] lg:w-[300px] h-[1px] bg-secondary-200 transform transition-all duration-300 [mask-image:linear-gradient(to_right,transparent,white_80%,white_20%,transparent)]" />
        <p className="border flex gap-2 items-center border-secondary-200 text-[15px] px-4 py-1 rounded-full">
          <Image className="w-[17px] h-[17px]" src={happy} alt="happy-svg" />
          Fluent &amp; ready
        </p>
        <div className="hidden md:block w-0 md:w-[200px] lg:w-[300px] h-[1px] bg-secondary-200 transform transition-all duration-300 [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]" />
      </div>
      <h3 className="text-center max-sm:max-w-[90%] mx-auto justify-center items-center text-[34px] text-secondary-700 mb-[80px] max-sm:mb-[60px] max-sm:text-[23px]">
        AI Voice Assistant – Speak With <br />
        <span className="text-secondary-900 font-[600]"> Confidence</span>
      </h3>

      <div className="max-w-[1080px] max-lg:max-w-[80%] max-xl:max-w-[80%] items-center relative mx-auto max-xl:container grid grid-cols-1 xl:grid-cols-2">
        <div className="border relative bg-gradient-to-t from-primary-50 to-white max-xl:rounded-tr-3xl max-xl:rounded-br-3xl border-secondary-100 overflow-hidden rounded-tl-3xl rounded-bl-3xl max-xl:pl-9 py-3 pl-12 pt-[90px]">
          <Image
            className="absolute opacity-60 max-sm:right-[-54%] max-sm:top-[-45%] right-[-56%] max-xl:right-[-40%] max-md:right-[-50%] max-lg:right-[-25%] top-[-63%]"
            src={bgAbsolute}
            alt="bg-svg"
          />
          <span className="flex items-center gap-3 border border-secondary-100 border-l-0 box-shadow-black  text-secondary-600 font-[400] text-[15px] absolute left-0 top-[15%] max-sm:text-[14px] max-sm:py-[6px] py-[8px] px-5 rounded-tr-full rounded-br-full">
            <Image
              className="w-[19px] rounded-full h-[19px]"
              src={checkbox}
              alt="checkbox-svg"
            />
            Break Language Barriers
          </span>
          <h3 className="text-[34px] max-sm:text-[24px] max-sm:leading-[35px] text-secondary-700 max-lg:max-w-[75%] max-sm:max-w-[90%] max-w-[70%] font-[400] mt-9 max-sm:mt-5 leading-[45px] relative z-30 my-5 max-sm:my-4 mb-6">
            Improve Your{" "}
            <span className="font-[600] text-primary-500">Speech</span> &
            Expression
          </h3>

          <p className="text-[17px] max-sm:text-[15px] max-w-[80%] max-sm:max-w-[90%] max-xl:max-w-[60%] max-lg:max-w-[80%] text-secondary-500 mb-12 max-sm:leading-6 leading-7">
            Practice real-world scenarios, refine your grammar, and receive
            immediate feedback to improve your fluency and communication.
          </p>
        </div>
        <div>
          <div className="bg-gradient-to-b max-xl:mt-4 relative flex flex-col items-center justify-center gap-9 max-sm:p-12 p-[92px] rounded-3xl from-primary-100 to-primary-300">
            <div className="w-[1px] max-sm:h-[300px] h-[330px] absolute top-0 bg-gradient-to-b from-white/10 to-white/80" />
            <div
              className="absolute rounded-3xl inset-0 z-0 masky-3 max-sm:h-[350px] h-[450px] border-none"
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
            <div className="text-centerrelative hover:rotate-[4deg] cursor-pointer duration-300 transition-all z-10 gap-2 bg-[#b470f0] box-shadow text-white p-[8px] px-4 rounded-full flex items-center">
              <span>
                <Image
                  className="w-[21px] h-[21px] max-sm:w-[17px] max-sm:h-[17px]"
                  src={voice}
                  alt="voice-svg"
                />
              </span>
              <p className="text-[15px] max-sm:text-sm font-[600]">
                Talk Like a Pro
              </p>
            </div>
            <div className="text-center hover:rotate-[-4deg] cursor-pointer duration-300 transition-all relative z-10 gap-3 bg-[#a35ee0] box-shadow text-white p-[8px] px-4 rounded-full flex items-center">
              <span>
                <Image
                  className="w-[19px] h-[19px] max-sm:w-[17px] max-sm:h-[17px]"
                  src={grammer}
                  alt="grammer-svg"
                />
              </span>
              <p className="text-[15px] max-sm:text-sm font-[600]">
                Refine Your Grammar
              </p>
            </div>
            <div className="text-center hover:rotate-[4deg] cursor-pointer duration-300 transition-all relative z-10 gap-3 bg-[#693696] box-shadow text-white p-2 px-4 rounded-full flex items-center">
              <span>
                <Image
                  className="w-[20px] h-[20px] max-sm:w-[18px] max-sm:h-[18px]"
                  src={user}
                  alt="user-svg"
                />
              </span>
              <p className="text-[15px] max-sm:text-sm font-[600]">
                Simulate HR Training
              </p>
            </div>
            <div className="text-center hover:rotate-[-4deg] cursor-pointer duration-300 transition-all relative z-10 gap-2 bg-[#4a2868] box-shadow text-white p-2 px-5 rounded-full flex items-center">
              <span>
                <Image
                  className="w-[18px] h-[18px] max-sm:w-[17px] max-sm:h-[17px]"
                  src={energy2}
                  alt="energy2-svg"
                />
              </span>
              <p className="text-[15px] max-sm:text-sm font-[600]">
                Confidence Boosted
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(EnglishSection);
