import Image from "next/image";
import check2 from "../../public/check-2.svg";
import price from "../../public/price.svg";
import checkPrice from "../../public/check-price.svg";
import cancelPrice from "../../public/cancelPrice.svg";
import arrowRight from "../../public/arrowRight.svg";
import bgAbsolute from "../../public/bgSvgAbsolute.svg";
import Link from "next/link";

export default function Pricing() {
  return (
    <section className="mb-20 mt-16 container flex flex-col justify-center px-4 sm:px-6">
      <div className="flex container text-base mb-6 text-secondary-600 text-center justify-center items-center">
        <div className="hidden md:block w-0 md:w-[200px] lg:w-[300px] h-px bg-secondary-200 transform transition-all duration-300 [mask-image:linear-gradient(to_right,transparent,white_80%,white_20%,transparent)]" />
        <p className="border flex gap-2 items-center border-secondary-200 text-[15px] px-4 py-1 rounded-full">
          <Image className="w-4 h-4" src={price} alt="price-svg" />
          Pricing
        </p>
        <div className="hidden md:block w-0 md:w-[200px] lg:w-[300px] h-px bg-secondary-200 transform transition-all duration-300 [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]" />
      </div>

      <h3 className="text-center mx-auto text-2xl sm:text-[34px] text-secondary-700 mb-12 sm:mb-[80px]">
        Your Success, Your
        <span className="text-secondary-900 font-semibold"> Plan</span>
      </h3>

      <div className="grid gap-6 w-full items-center justify-center grid-cols-1 xl:grid-cols-2">
        {/* Free Plan */}
        <div className="bg-white border border-secondary-100 relative overflow-hidden grid grid-cols-1 sm:grid-cols-2 p-3 rounded-3xl">
          <div className="pl-6 mb-5">
            <h4 className="font-semibold text-secondary-900 text-2xl sm:text-[27px] pt-6">
              Free Plan
            </h4>
            <p className="mt-2.5 max-sm:max-w-[90%] max-xl:max-w-[80%] text-base text-secondary-500 mb-6">
              Get a taste of Jobstell in action — experience our system with a
              free, limited demo.
            </p>
            <div className="flex items-end my-2 pb-8 mb-5 mt-5">
              <p className="text-[34px] font-semibold">0.00$</p>
            </div>

            <div className="sm:absolute bottom-[5%] left-[2%] xl:left-[5%] mt-4 sm:mt-0">
              <Link
                href="/"
                className="flex duration-300 transition-all hover:bg-primary-600 hover:-translate-y-[3px] cursor-pointer bg-primary-400 box-shadow-black py-2.5 px-5 max-sm:py-2 max-sm:text-[15px] rounded-full text-base font-semibold text-white items-center gap-3 w-fit"
              >
                <button className="cursor-pointer">Get Started</button>
                <Image
                  className="w-5 h-5 max-sm:w-4 max-sm:h-4"
                  src={arrowRight}
                  alt="arrowRight"
                />
              </Link>
            </div>
          </div>

          <div className="bg-[#f6f7f9] px-6 py-6 gap-5 flex flex-col justify-center rounded-2xl mt-4 sm:mt-0">
            {/* Feature list items - consistent text size */}
            {[
              { text: "10 interview questions", active: true },
              { text: "feedback on 10 questions", active: true },
              { text: "Study Materials", active: false },
              { text: "Voice Assistant", active: false },
              { text: "Interactive Quiz", active: false },
              { text: "Certificate", active: false },
            ].map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                <Image
                  className="w-[23px] h-[23px]"
                  src={feature.active ? checkPrice : cancelPrice}
                  alt={feature.active ? "checkPrice-svg" : "cancelPrice-svg"}
                />
                <p
                  className={`text-base max-sm:text-[15px] ${
                    feature.active ? "text-[#3b3b3b]" : "text-[#767676]"
                  }`}
                >
                  {feature.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Basic Plan */}
        <div className="bg-white border border-secondary-100 relative overflow-hidden grid grid-cols-1 sm:grid-cols-2 p-3 rounded-3xl">
          <div className="pl-6 mb-5">
            <h4 className="font-semibold text-secondary-900 text-2xl sm:text-[27px] pt-6">
              Basic Plan
            </h4>
            <p className="mt-2.5 max-w-[90%] text-base text-secondary-500 mb-6">
              Unlock additional tools and sessions to boost your confidence.
            </p>
            <div className="flex items-end my-2 pb-8 mb-5 mt-5">
              <p className="text-[34px] font-semibold">5.99$</p>
              <span className="text-secondary-500 font-semibold text-base sm:text-lg">
                / 100 Coins
              </span>
            </div>

            <div className="sm:absolute bottom-[5%] left-[2%] xl:left-[5%] mt-4 sm:mt-0">
              <Link
                href="/"
                className="flex duration-300 transition-all hover:bg-primary-600 hover:-translate-y-[3px] cursor-pointer bg-primary-400 box-shadow-black py-2.5 px-5 max-sm:py-2 max-sm:text-[15px] rounded-full text-base font-semibold text-white items-center gap-3 w-fit"
              >
                <button>Get Started</button>
                <Image
                  className="w-5 h-5 max-sm:w-4 max-sm:h-4"
                  src={arrowRight}
                  alt="arrowRight"
                />
              </Link>
            </div>
          </div>

          <div className="bg-[#f6f7f9] p-6 gap-5 flex flex-col justify-center rounded-2xl mt-4 sm:mt-0">
            {[
              "10 interview questions",
              "feedback on 10 questions",
              "Study Materials",
              "Voice Assistant",
              "Interactive Quiz",
              "Certificate",
            ].map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                <Image
                  className="w-[23px] h-[23px]"
                  src={checkPrice}
                  alt="checkPrice-svg"
                />
                <p className="text-[#3b3b3b] max-sm:text-[15px] text-base">
                  {feature}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Pro Plan */}
        <div className="bg-[#f6f7f9] border border-secondary-100 relative overflow-hidden grid grid-cols-1 sm:grid-cols-2 p-3 rounded-3xl">
          <div className="pl-6 mb-5">
            <h4 className="font-semibold text-primary-500 text-2xl sm:text-[27px] pt-6">
              Pro Plan
            </h4>
            <p className="mt-2.5 text-base text-secondary-500 mb-[22px] max-w-[90%]">
              Step up your practice with expanded access to interviews
              simulations and voice-chat sessions.
            </p>
            <div className="flex items-end my-2 pb-8 mb-5 mt-5">
              <p className="text-[34px] text-primary-500 font-semibold">
                9.99$
              </p>
              <span className="text-secondary-500 font-semibold text-base sm:text-lg">
                / 250 Coins
              </span>
            </div>

            <div className="sm:absolute bottom-[5%] left-[2%] xl:left-[5%] mt-4 sm:mt-0">
              <Link
                href="/"
                className="flex duration-300 transition-all hover:bg-primary-600 hover:-translate-y-[3px] cursor-pointer bg-primary-400 box-shadow-black py-2.5 px-5 max-sm:py-2 max-sm:text-[15px] rounded-full text-base font-semibold text-white items-center gap-3 w-fit"
              >
                <button>Get Started</button>
                <Image
                  className="w-5 h-5 max-sm:w-4 max-sm:h-4"
                  src={arrowRight}
                  alt="arrowRight"
                />
              </Link>
            </div>
          </div>

          <div className="bg-white z-10 relative p-6 gap-5 flex flex-col justify-center rounded-2xl mt-4 sm:mt-0">
            {[
              "10 interview questions",
              "feedback on 10 questions",
              "Study Materials",
              "Voice Assistant",
              "Interactive Quiz",
              "Certificate",
            ].map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                <Image
                  className="w-[23px] h-[23px]"
                  src={check2}
                  alt="check2-svg"
                />
                <p className="text-[#3b3b3b] max-sm:text-[15px] text-base">
                  {feature}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Ultimate Plan */}
        <div className="bg-white border border-secondary-100 relative overflow-hidden grid grid-cols-1 sm:grid-cols-2 p-3 rounded-3xl">
          <div className="pl-6 mb-5">
            <h4 className="font-semibold text-secondary-900 text-2xl sm:text-[27px] pt-6">
              Ultimate Plan
            </h4>
            <p className="mt-2.5 max-w-[90%] text-base text-secondary-500 mb-6">
              Get the most out of JobStell — unlock advanced tools, in-depth
              simulations, and all premium features.
            </p>
            <div className="flex items-end my-2 pb-8 mb-5 mt-5">
              <p className="text-[34px] font-semibold">19.99$</p>
              <span className="text-secondary-500 font-semibold text-base sm:text-lg">
                / 600 Coins
              </span>
            </div>

            <div className="sm:absolute bottom-[5%] left-[2%] xl:left-[5%] mt-4 sm:mt-0">
              <Link
                href="/"
                className="flex duration-300 transition-all hover:bg-primary-600 hover:-translate-y-[3px] cursor-pointer bg-primary-400 box-shadow-black py-2.5 px-5 max-sm:py-2 max-sm:text-[15px] rounded-full text-base font-semibold text-white items-center gap-3 w-fit"
              >
                <button>Get Started</button>
                <Image
                  className="w-5 h-5 max-sm:w-4 max-sm:h-4"
                  src={arrowRight}
                  alt="arrowRight"
                />
              </Link>
            </div>
          </div>

          <div className="bg-[#f6f7f9] p-6 gap-5 flex flex-col justify-center rounded-2xl mt-4 sm:mt-0">
            {[
              "10 interview questions",
              "feedback on 10 questions",
              "Study Materials",
              "Voice Assistant",
              "Interactive Quiz",
              "Certificate",
            ].map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                <Image
                  className="w-[23px] h-[23px]"
                  src={checkPrice}
                  alt="checkPrice-svg"
                />
                <p className="text-[#3b3b3b] max-sm:text-[15px] text-base">
                  {feature}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
