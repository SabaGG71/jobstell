import { Button } from "@/components/ui/button";
import Image from "next/image";
import energyIcon from "../../public/energy-icon.svg";

export default function Features() {
  return (
    <section className="container mb-[400px] relative mx-auto xl:max-w-[1080px]">
      <div className="flex relative">
        <div>
          <div className="border inline-block items-center border-secondary-200 px-4 py-1 rounded-full">
            <span className="flex text-secondary-700 text-[15px] gap-2 items-center">
              <Image
                className="w-[16px] h-[16px]"
                src={energyIcon}
                alt="energyIcon-svg"
              />
              Features
            </span>
          </div>
          <h3 className="text-[34px] font-[400] mt-5 text-secondary-700 max-w-[90%] leading-[44px]">
            No More Awkward Interviews –{" "}
            <span className="text-primary-500 font-[600]">
              Jobstell Got You!
            </span>
          </h3>
          <p className="max-w-[65%] my-5 mb-16 text-[17px] text-secondary-500">
            Real-time AI-driven Q&A, interactive role-playing, and live
            interview simulations – everything you need to excel in interviews.
          </p>
          <div className="flex gap-2 flex-col">
            <div>
              <p className="flex items-center gap-2 text-secondary-500 text-[14px]">
                <span className="border bg-primary-400 text-white border-primary-400 p-1 px-3 rounded-full">
                  #JobstellPower
                </span>{" "}
                <span className="border border-secondary-100 p-1 px-3 rounded-full">
                  #AceYourInterview
                </span>
                <span className="border border-secondary-100 p-1 px-3 rounded-full">
                  #InterviewConfidence
                </span>
              </p>
            </div>
            <div>
              <p className="flex mt-[3px] items-center gap-2 text-secondary-500 text-[14px]">
                <span className="border border-secondary-100 p-1 px-3 rounded-full">
                  #UnstoppableJobseeker{" "}
                </span>
                <span className="border bg-primary-400 text-white border-primary-400 p-1 px-3 rounded-full">
                  #InterviewLikeAPro
                </span>{" "}
              </p>
            </div>
          </div>
        </div>

        <div className="relative flex flex-col gap-[54px]">
          <div className="line-double absolute w-[2px] h-[100%] bg-[#f6f6f6] z-[-10] left-[-12%]"></div>
          <div className="relative">
            <div className="flex relative items-center gap-4">
              <div className="line-top absolute left-[-12.3%] top-[0%]"></div>
              <div className="line-black absolute left-[-12.35%] top-[122%]"></div>
              <div className="line top-[10%] absolute left-[-12%]"></div>
              <span className="bg-secondary-700 box-shadow-black box-shadow text-white p-1 px-3 rounded-full">
                1
              </span>
              <p className="text-xl font-[400] text-secondary-700">
                Expert Team
              </p>
            </div>
            <p className="text-secondary-500 text-[17px] mt-4">
              An expert team ready to tackle your challenges with innovative
              solutions and proven strategies.
            </p>
          </div>
          <div className="relative">
            <div className="flex items-center gap-4">
              <div className="line-2 absolute left-[-12.3%] top-[0%]"></div>
              <div className="line-2-bottom absolute left-[-12.35%] bottom-[18%]"></div>
              <div className="line top-[10%] absolute left-[-12%]"></div>
              <span className="bg-secondary-700 box-shadow-black box-shadow text-white p-1 px-3 rounded-full">
                2
              </span>
              <p className="text-xl font-[400] text-secondary-700">
                Customizable for You
              </p>
            </div>
            <p className="text-secondary-500 text-[17px] mt-4">
              Customize the platform to perfectly align with your business's
              unique requirements and goals.
            </p>
          </div>
          <div className="relative">
            <div className="flex items-center gap-4">
              <div className="line-top absolute left-[-12.3%] top-[0%]"></div>
              <div className="line-black absolute left-[-12.35%] bottom-[18%]"></div>
              <div className="line top-[10%] absolute left-[-12%]"></div>
              <span className="bg-secondary-700 box-shadow-black text-white p-1 px-3 rounded-full">
                3
              </span>
              <p className="text-xl font-[400] text-secondary-700">
                Maximum Efficiency
              </p>
            </div>
            <p className="text-secondary-500 text-[17px] mt-4">
              Maximize efficiency with integrated solutions that eliminate
              bottlenecks, saving time and costs.
            </p>
          </div>
          <div className="relative">
            <div className="flex items-center gap-4">
              <div className="line-2 absolute left-[-12.3%] top-[0%]"></div>
              <div className="line-2-bottom absolute left-[-12.35%] bottom-[18%]"></div>
              <div className="line top-[10%] absolute left-[-12%]"></div>
              <span className="bg-secondary-700 box-shadow-black box-shadow text-white p-1 px-3 rounded-full">
                4
              </span>
              <p className="text-xl font-[400] text-secondary-700">
                User Friendly
              </p>
            </div>
            <p className="text-secondary-500 text-[17px] mt-4">
              A simple and accessible interface for users of all skill levels,
              making it easy to find what you need.
            </p>
          </div>
          <div className="relative">
            <div className="flex items-center gap-4">
              <div className="line-top absolute left-[-12.3%] top-[0%]"></div>
              <div className="line-black absolute left-[-12.35%] bottom-[18%]"></div>
              <div className="line top-[10%] absolute left-[-12%]"></div>
              <span className="bg-secondary-700 box-shadow-black box-shadow text-white p-1 px-3 rounded-full">
                5
              </span>
              <p className="text-xl font-[400] text-secondary-700">
                Security You Can Trust
              </p>
            </div>
            <p className="text-secondary-500 text-[17px] mt-4">
              Protect sensitive data with industry leading security to prevent
              unauthorized breaches.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
