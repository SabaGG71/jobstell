import Image from "next/image";
import Noise from "./Noise";
import post from "../../public/post.png";
import { Button } from "@/components/ui/button";
import image from "../../public/recordWhite.svg";
import morestar from "../../public/starmore.svg";

export default function HowItWorks() {
  return (
    <section className="mb-20 relative mt-[-10px] md:mb-[300px]">
      <div className="max-w-[1080px] overflow-hidden max-xl:max-w-[80%] w-full masky-2 mx-auto relative xl:px-6">
        <div
          className="absolute inset-0 z-0 max-sm:h-[350px] h-[450px]"
          style={{
            minHeight: "350px",
            overflow: "hidden",
          }}
        >
          <Noise
            patternSize={500}
            patternScaleX={3}
            patternScaleY={3}
            patternRefreshInterval={2}
            patternAlpha={15}
          />
        </div>

        <div className="relative grid grid-cols-1 xl:grid-cols-2  justify-center  items-center w-full z-10 min-h-[400px] py-10 md:py-16">
          <div className="flex max-xl:flex max-xl:flex-col justify-center w-full items-center">
            <Image
              className="masky-girl max-md:bottom-[-104px] max-sm:bottom-[-72px] relative bottom-[-48px] max-sm:w-[250px] max-sm:h-[250px]  w-[280px] sm:w-[320px] md:w-[350px] h-auto md:h-[350px] object-cover p-3"
              src={post}
              alt="post-image"
              priority
            />
          </div>
          <div className="flex mx-auto flex-col max-xl:text-center max-xl:justify-center max-xl:items-center">
            <h2 className="text-[34px] max-xl:mx-auto max-2xl:pt-6 max-2xl:max-w-[80%] max-md:pt-[80px] max-md:text-[30px] max-md:max-w-[80%] max-sm:pt-[45px] max-sm:text-[24px] max-sm:leading-8 mt-[60px] font-[500] xl:font-[400] leading-[44px] lg:max-w-[90%] text-secondary-700 mb-5">
              Prepare, practice, and{" "}
              <span className="text-secondary-900">
                succeed with AI interviews.
              </span>
            </h2>
            <p className="font-[400] max-sm:text-base text-[17px] lg:max-w-[70%] text-secondary-500 max-md:max-w-[80%] max-sm:max-w-[95%]">
              Practice with AI, get real-time feedback, and ace your next
              interview!
            </p>
            <div className="flex mt-8 items-center gap-2">
              <Button className="max-md:h-[37px] max-md:px-4 max-md:text-sm  bg-primary-500 hover:bg-primary-900 text-white rounded-full font-[400] px-5 h-[40px]">
                <Image
                  className="max-sm:w-[17px] max-md:w-[19px] max-md:h-[19px] max-sm:h-[17px]"
                  src={image}
                  alt="video"
                />
                Watch Video
              </Button>
              <button className="flex max-md:py-[8px] max-md:px-4 items-center gap-[9px] max-md:text-sm py-[8px] bg-secondary-700 box-shadow-black text-white hover:bg-black  transition-all duration-300 hover:translate-y-[-3px]  px-[20px] rounded-full font-[400] text-[16px] max-md:text-[15px]">
                <Image
                  className="max-sm:w-[17px] max-md:w-[19px] max-md:h-[19px] max-sm:h-[17px]"
                  src={morestar}
                  alt="morestar"
                />
                Get Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
