import Image from "next/image";
import registration from "../../public/registration.svg";
import work from "../../public/work.svg";
import rocket from "../../public/racket.svg";

export default function Steps() {
  return (
    <section className="container max-w-[80%] lg:max-w-[1080px] relative z-10 mt-[70px] mx-auto">
      <div className="grid containermx-auto grid-cols-1 items-center justify-center sm:grid-cols-1 max-xl:max-w-[80%] max-lg:max-w-full mx-auto md:grid-cols-2 lg:grid-cols-2 relative gap-6 xl:grid-cols-3">
        <div className="relative p-4 py-6 max-lg:border border-secondary-50 box-shadow-card-3 rounded-3xl">
          <div className="flex gap-4  items-center">
            <span className="border-4 border-primary-100 rounded-full">
              <Image
                className="max-sm:w-[30px] max-sm:h-[30px] w-[36px] h-[36px]"
                src={registration}
                alt="registration-svg"
              />
            </span>
            <p className="font-[400] max-sm:font-[600] text-[17px] lg:text-[19px] max-md:text-base text-secondary-700">
              Quick Registration
            </p>
          </div>
          <p className="text-secondary-500 max-w-[80%] max-lg:text-[15px] max-lg:mt-4 mt-3">
            Work together seamlessly, no matter where your team is located
          </p>
        </div>
        <div className="p-4 py-6 max-lg:border border-secondary-50 box-shadow-card-3 rounded-3xl">
          <div className="flex gap-4  items-center">
            <span className="border-4 border-primary-100 rounded-full">
              <Image
                className="max-sm:w-[30px] max-sm:h-[30px] w-[36px] h-[36px]"
                src={work}
                alt="work-svg"
              />
            </span>
            <p className="font-[400] max-sm:font-[600]  text-[17px] lg:text-[19px] text-secondary-700">
              Practice with AI Interviewer{" "}
            </p>
          </div>
          <p className="text-secondary-500 max-w-[80%] max-sm:text-[15px] max-md:text-base max-lg:mt-4 mt-3">
            Work together seamlessly, no matter where your team is located
          </p>
        </div>
        <div className="p-6   group cursor-pointer hover:translate-y-[-4px] duration-300 transition-all border border-secondary-50 box-shadow-card-2 rounded-3xl">
          <div className="flex gap-4 items-center">
            <span className="border-4 border-[#b7400048] rounded-full">
              <Image
                className="max-sm:w-[30px] max-sm:h-[30px] w-[36px] h-[36px]"
                src={rocket}
                alt="rocket-svg"
              />
            </span>
            <p className="font-[400] max-sm:font-[600] text-[17px] lg:text-[19px] text-secondary-700">
              Gain Real Confidence
            </p>
          </div>
          <p className="text-secondary-500 max-w-[90%] max-sm:text-[15px] max-md:text-base max-lg:mt-4 mt-3">
            dynamic platform grows with your business where your team
          </p>
        </div>
      </div>
    </section>
  );
}
