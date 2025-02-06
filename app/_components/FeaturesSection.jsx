import Image from "next/image";
import energy from "../../public/energy-icon.svg";
import aiSvg from "../../public/ai-svg.svg";
import logoMock from "../../public/logoWhite.svg";
import voice from "../../public/voice.svg";
import emotional from "../../public/emotional.svg";
import timer from "../../public/timer.svg";
import user from "../../public/userr.svg";
import star from "../../public/star.svg";
import featureBg from "../../public/feature-frame.svg";
import clock from "../../public/clock-feature.svg";
import featureBag from "../../public/feature-bag.svg";
import aiCheck from "../../public/ai-check.svg";

export default function FeaturesSection() {
  return (
    <section className="container mt-[140px]">
      <div>
        <div className="flex text-[17px] mb-6 text-secondary-600 text-center justify-center items-center">
          <div className="hidden md:block w-0 md:w-[200px] lg:w-[300px] h-[1px] bg-secondary-200 transform transition-all duration-300 [mask-image:linear-gradient(to_right,transparent,white_80%,white_20%,transparent)]" />
          <p className="border flex gap-2 items-center border-secondary-200 text-[15px] px-4 py-1 rounded-full">
            <Image
              className="w-[15px] h-[15px]"
              src={energy}
              alt="energy-svg"
            />
            Features
          </p>
          <div className="hidden md:block w-0 md:w-[200px] lg:w-[300px] h-[1px] bg-secondary-200 transform transition-all duration-300 [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]" />
        </div>
        <h3 className="text-center max-md:max-w-[90%] mx-auto justify-center items-center text-[34px] text-secondary-700 mb-[80px] max-md:mb-[60px] max-md:text-[24px]">
          Your AI-Powered Interview{" "}
          <span className="text-secondary-900 font-[600]">Toolkit</span>
        </h3>

        <div className="grid gap-5 max-xl:max-w-[90%] mx-auto grid-cols-1 xl:grid-cols-3">
          <div className="flex flex-col gap-5">
            <div className="bg-[#fbfbfc] border  cursor-pointer hover:bg-secondary-50 hover:-translate-x-[4px]  border-secondary-100 duration-300 rounded-3xl py-4 px-7">
              <div className="flex max-sm:gap-4 my-[12px] items-center gap-3">
                <span className="box-shadow rounded-full">
                  <Image
                    className="bg-primary-400 shadow-box-orange   rounded-full p-[6px] w-[34px] h-auto"
                    src={aiSvg}
                    alt="ai-svg"
                  />
                </span>
                <p className="text-[19px] max-sm:text-[17px] font-[500] text-secondary-800">
                  AI-Powered Interview Simulations
                </p>
              </div>
              <p className="text-secondary-600 max-sm:text-[14px] font-[400]">
                Dedicated professionals with expertise in cutting-edge web
                design + development.
              </p>
            </div>
            <div className="bg-[#fbfbfc] border  cursor-pointer hover:bg-secondary-50 hover:-translate-x-[4px]  border-secondary-100 duration-300 rounded-3xl py-4 px-7">
              <div className="flex max-sm:gap-4 my-[12px] items-center gap-3">
                <span className="box-shadow rounded-full">
                  <Image
                    className="bg-primary-400 shadow-box-orange   rounded-full p-[6px] w-[34px] max-sm:w-[35px] max-sm:h-[35px] max-sm:p-[7px] h-auto"
                    src={voice}
                    alt="voice-svg"
                  />
                </span>
                <p className="text-[19px] max-sm:text-[17px] font-[500] text-secondary-800">
                  Voice Agent Roleplay
                </p>
              </div>
              <p className="text-secondary-600 max-sm:text-[14px] font-[400]">
                Dedicated professionals with expertise in cutting-edge web
                design + development.
              </p>
            </div>
            <div className="bg-[#fbfbfc] border border-secondary-100 cursor-pointer hover:bg-secondary-50 hover:-translate-x-[4px] duration-300 transition-all rounded-3xl py-3 px-7">
              <div className="flex my-4 items-center max-sm:gap-4 gap-3">
                <span className="box-shadow-orange   rounded-full">
                  <Image
                    className="bg-[#fd8341] rounded-full max-sm:p-[6px] p-[7px] max-sm:w-[40px] w-[34px] h-auto"
                    src={user}
                    alt="user-svg"
                  />
                </span>
                <p className="text-[19px] max-sm:text-[17px] font-[500] text-secondary-800">
                  Personalized Interview Questions
                </p>
              </div>
              <p className="text-secondary-600 max-sm:text-[14px] font-[400]">
                Dedicated professionals with expertise in cutting-edge web
                design + development.
              </p>
            </div>
          </div>
          <div className="bg-gradient-to-b duration-300 overflow-hidden scale-110 mx-6 flex flex-col items-center pt-6 max-xl:my-12 shadow-box from-primary-400  to-primary-100 rounded-3xl">
            <div className="absolute top-0 z-[-1]"></div>
            <Image
              className="w-[45px] max-sm:w-[35px] masky-2"
              src={logoMock}
              alt="logoMock-svg"
            />
            <div className="flex gap-4">
              <div className="block w-[100px] md:w-[200px] lg:w-[300px] h-[2px] bg-primary-200 transform transition-all duration-300 max-sm:mt-8 [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)] mt-10" />
              <h3 className="text-[30px] max-sm:text-[24px] font-[600] text-white  mt-4">
                Jobstell
              </h3>

              <div className="block w-[100px] md:w-[200px] lg:w-[300px] h-[2px] bg-primary-200 transform transition-all duration-300 max-sm:mt-8 [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)] mt-10" />
            </div>
            <p className="text-white/90 max-sm:text-sm max-sm:mt-1">
              Your Interview Success Portal!
            </p>

            <div>
              <div className="grid max-xl:pb-8 mt-5 max-xl:grid-cols-4 max-sm:grid-cols-2 max-lg:grid-cols-2 grid-cols-2 gap-4">
                <div className="feature-1 hover:-translate-y-[3px] duration-300 transition-all cursor-pointer relative">
                  <Image
                    className="w-[150px] max-sm:w-[110px] box-shadow-mobile pt-2 box-shadow rounded-3xl  h-auto"
                    src={featureBg}
                    alt="feature-bg-svg"
                  />
                  <div className="flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex-col justify-center text-center items-center">
                    <h4 className="text-secondary-900 max-sm:text-[20px] text-[24px] max-sm:mt-[22px] font-[700] mt-7">
                      20+
                    </h4>
                    <p className="text-secondary-600 sm:w-[150px] mt-[-1px] max-sm:mt-[-4px] text-[15px] max-sm:text-[12px]   max-sm:w-[100px]">
                      questions
                    </p>
                  </div>
                </div>
                <div className="feature-2 hover:-translate-y-[3px] duration-300 transition-all cursor-pointer relative">
                  <Image
                    className="w-[150px] max-sm:w-[110px] box-shadow-mobile pt-2 box-shadow rounded-3xl  h-auto"
                    src={clock}
                    alt="clock-bg-svg"
                  />
                  <div className="flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex-col justify-center text-center items-center">
                    <h4 className="text-secondary-900 max-sm:text-[20px] text-[24px] max-sm:mt-[22px] font-[700] mt-7">
                      10+
                    </h4>
                    <p className="text-secondary-600 sm:w-[150px] mt-[-1px] max-sm:mt-[-4px] text-[15px] max-sm:text-[12px]   max-sm:w-[100px]">
                      minute roleplay
                    </p>
                  </div>
                </div>
                <div className="feature-3 relative hover:-translate-y-[3px] duration-300 transition-all cursor-pointer">
                  <Image
                    className="w-[150px] max-sm:w-[110px] box-shadow-mobile pt-2 box-shadow rounded-3xl  h-auto"
                    src={featureBag}
                    alt="feature-bg-svg"
                  />
                  <div className="flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex-col justify-center text-center items-center">
                    <h4 className="text-secondary-900 max-sm:text-[20px] text-[24px] max-sm:mt-[22px] font-[700] mt-7">
                      50+
                    </h4>
                    <p className="text-secondary-600 sm:w-[150px] mt-[-1px] max-sm:mt-[-4px] text-[15px] max-sm:text-[12px]   max-sm:w-[100px]">
                      professions
                    </p>
                  </div>
                </div>
                <div className="feature-4 hover:-translate-y-[3px] duration-300 transition-all cursor-pointer relative">
                  <Image
                    className="w-[150px] max-sm:w-[110px] box-shadow-mobile pt-2 box-shadow rounded-3xl  h-auto"
                    src={aiCheck}
                    alt="aiCheck-bg-svg"
                  />
                  <div className="flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex-col justify-center text-center items-center">
                    <h4 className="text-secondary-900 max-sm:text-[20px] text-[24px] max-sm:mt-[22px] font-[700] mt-7">
                      5+
                    </h4>
                    <p className="text-secondary-600 sm:w-[150px] mt-[-1px] max-sm:mt-[-4px] text-[15px] max-sm:text-[12px]   max-sm:w-[100px]">
                      AI models
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <div className="bg-[#fbfbfc] border  cursor-pointer hover:bg-secondary-50 hover:-translate-x-[-4px]  border-secondary-100 duration-300 rounded-3xl py-4 px-7">
              <div className="flex max-sm:gap-4 my-[12px] items-center gap-3">
                <span className="box-shadow rounded-full">
                  <Image
                    className="bg-primary-400 box-shadow   rounded-full p-[6px] w-[34px] max-sm:w-[42px] max-sm:h-[33px] max-sm:p-[7px] h-auto"
                    src={emotional}
                    alt="emotional-svg"
                  />
                </span>
                <p className="text-[19px] max-sm:text-[17px] font-[500] text-secondary-800">
                  Emotional and Psychological Prep
                </p>
              </div>
              <p className="text-secondary-600 max-sm:text-[14px] font-[400]">
                Dedicated professionals with expertise in cutting-edge web
                design + development.
              </p>
            </div>
            <div className="bg-[#fbfbfc] border  cursor-pointer hover:bg-secondary-50 hover:-translate-x-[-4px]  border-secondary-100 duration-300 rounded-3xl py-4 px-7">
              <div className="flex max-sm:gap-4 my-[12px] items-center gap-3">
                <span className="box-shadow rounded-full">
                  <Image
                    className="bg-[#fd8341] box-shadow-orange   rounded-full p-[6px] w-[34px] max-sm:w-[42px] max-sm:h-[33px] max-sm:p-[7px] h-auto"
                    src={timer}
                    alt="timer-svg"
                  />
                </span>
                <p className="text-[19px] max-sm:text-[17px] font-[500] text-secondary-800">
                  Real-time feedback & corrections
                </p>
              </div>
              <p className="text-secondary-600 max-sm:text-[14px] font-[400]">
                Dedicated professionals with expertise in cutting-edge web
                design + development.
              </p>
            </div>
            <div className="bg-[#fbfbfc] border  cursor-pointer hover:bg-secondary-50 hover:-translate-x-[-4px]  border-secondary-100 duration-300 rounded-3xl py-4 px-7">
              <div className="flex max-sm:gap-4 my-[12px] items-center gap-3">
                <span className="box-shadow rounded-full">
                  <Image
                    className="bg-primary-400 box-shadow   rounded-full p-[7px] w-[34px] max-sm:w-[33px] max-sm:h-[33px] max-sm:p-[7px] h-auto"
                    src={star}
                    alt="star-svg"
                  />
                </span>
                <p className="text-[19px] max-sm:text-[17px] font-[500] text-secondary-800">
                  Role-playing for confidence
                </p>
              </div>
              <p className="text-secondary-600 max-sm:text-[14px] font-[400]">
                Dedicated professionals with expertise in cutting-edge web
                design + development.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
