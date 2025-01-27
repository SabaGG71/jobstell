import Image from "next/image";
import React from "react";
import check from "../../public/check.svg";
import blackcheck from "../../public/blackCheck.svg";

export default function HeroCheck() {
  return (
    <div>
      <div className="max-w-[60%] mt-[110px] justify-center items-center text-center mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
        <div className="flex py-4  items-center flex-col gap-4">
          <Image className="w-[50px] h-[50px]" src={check} alt="check-svg" />
          <p className="text-secondary-500 text-xl font-[400]">
            Simulate Real <br></br> Interviews
          </p>
        </div>
        <div className="flex items-center border-r border-l border-secondary-100 flex-col gap-4">
          <Image
            className="w-[35px] opacity-80 h-[35px]"
            src={blackcheck}
            alt="check-svg"
          />
          <p className="text-secondary-500 text-lg font-[400]">
            Build Confidence for <br></br> Interviews
          </p>
        </div>
        <div className="flex items-center border-secondary-100 border-r  flex-col gap-4">
          <Image
            className="w-[35px] opacity-80 h-[35px]"
            src={blackcheck}
            alt="check-svg"
          />
          <p className="text-secondary-500 text-lg font-[400]">
            Get Personalized <br></br> Feedback
          </p>
        </div>
        <div className="flex items-center flex-col gap-4">
          <Image
            className="w-[35px] opacity-80 h-[35px]"
            src={blackcheck}
            alt="check-svg"
          />
          <p className="text-secondary-500 text-lg font-[400]">
            Practice with <br></br> AI Voice
          </p>
        </div>
      </div>
    </div>
  );
}
