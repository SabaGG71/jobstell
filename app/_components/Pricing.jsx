import Image from "next/image";
import checkbox from "../../public/checkbox.svg";
import { Button } from "../../components/ui/button";
import coin from "../../public/coin.svg";
import happy from "../../public/happy.svg";

export default function Pricing() {
  return (
    <section className="mb-[100px] mt-[60px] bg-gradient-to-b from-white to-primary-100 container rounded-[60px] flex flex-col justify-center">
      <div className="flex container  text-[17px] mb-6 text-secondary-600 text-center justify-center items-center">
        <div className="hidden md:block w-0 md:w-[200px] lg:w-[300px] h-[1px] bg-secondary-200 transform transition-all duration-300 [mask-image:linear-gradient(to_right,transparent,white_80%,white_20%,transparent)]" />
        <p className="border flex gap-2 items-center border-secondary-200 text-[15px] px-4 py-1 rounded-full">
          <Image className="w-[17px] h-[17px]" src={happy} alt="happy-svg" />
          Pricing
        </p>
        <div className="hidden md:block w-0 md:w-[200px] lg:w-[300px] h-[1px] bg-secondary-200 transform transition-all duration-300 [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]" />
      </div>
      <h3 className="text-center max-sm:max-w-[90%] mx-auto justify-center items-center text-[34px] text-secondary-700  max-sm:mb-[60px] max-sm:text-[24px]">
        Your Success, Your
        <span className="text-secondary-900 font-[600]"> Plan</span>
      </h3>
      <div className="max-w-[1250px] mx-auto grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 py-12 rounded-[40px] items-center">
        <div className="flex flex-col lg:w-[300px] xl:w-[350px] p-6 bg-white rounded-2xl h-full">
          <div className="flex flex-col flex-grow ">
            <h4 className="text-2xl mb-[10px] text-secondary-700 font-[600]">
              Basic Plan
            </h4>
            <div className="flex mb-6 items-baseline gap-1">
              <h4 className="text-3xl text-secondary-700 font-bold">5.99$</h4>
              <span className="text-xl text-secondary-500">/</span>
              <span className="text-[#fa7125] font-[600] gap-2 flex items-center">
                <Image className="w-[15px] h-auto" src={coin} alt="coin-svg" />{" "}
                100 Coins
              </span>
            </div>
            <div className="flex flex-col gap-2 mb-6">
              <div className="flex items-center gap-2">
                <Image
                  className="w-[20px] h-auto"
                  src={checkbox}
                  alt="check-svg"
                />
                <p className="text-secondary-600">
                  Task creation and management
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Image
                  className="w-[20px] h-auto"
                  src={checkbox}
                  alt="check-svg"
                />
                <p className="text-secondary-600">
                  Basic team collaboration tools
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Image
                  className="w-[20px] h-auto"
                  src={checkbox}
                  alt="check-svg"
                />
                <p className="text-secondary-600">Up to 5 projects</p>
              </div>
            </div>
          </div>
          <div className=" w-full">
            <Button className="w-full">Get Started Now</Button>
          </div>
        </div>

        <div className="flex flex-col p-6 bg-white rounded-2xl  h-full">
          <div className="flex flex-col flex-grow">
            <h4 className="text-2xl mb-[10px] text-primary-500 font-[600]">
              Pro
            </h4>
            <div className="flex mb-6 items-baseline gap-1">
              <h4 className="text-3xl text-secondary-700 font-bold">9.99$</h4>
              <span className="text-xl text-secondary-500">/</span>
              <span className="text-[#fa7125] font-[600] gap-2 flex items-center">
                <Image className="w-[15px] h-auto" src={coin} alt="coin-svg" />{" "}
                250 Coins
              </span>
            </div>
            <div className="flex flex-col gap-2 mb-9">
              <div className="flex items-center gap-2">
                <Image
                  className="w-[20px] h-auto"
                  src={checkbox}
                  alt="check-svg"
                />
                <p className="text-secondary-600">Unlimited projects</p>
              </div>
              <div className="flex items-center gap-2">
                <Image
                  className="w-[20px] h-auto"
                  src={checkbox}
                  alt="check-svg"
                />
                <p className="text-secondary-600">Advanced task automation</p>
              </div>
              <div className="flex items-center gap-2">
                <Image
                  className="w-[20px] h-auto"
                  src={checkbox}
                  alt="check-svg"
                />
                <p className="text-secondary-600">Team chat and file sharing</p>
              </div>
            </div>
          </div>
          <div className="w-full">
            <Button className="w-full">Get Started Now</Button>
          </div>
        </div>

        <div className="flex flex-col p-6 bg-white rounded-2xl h-full">
          <div className="flex flex-col flex-grow">
            <h4 className="text-2xl mb-[10px] text-secondary-700 font-[600]">
              Ultimate
            </h4>
            <div className="flex mb-6 items-baseline gap-1">
              <h4 className="text-3xl text-secondary-700 font-bold">19.99$</h4>
              <span className="text-xl text-secondary-500">/</span>
              <span className="text-[#fa7125] font-[600] gap-2 flex items-center">
                <Image className="w-[15px] h-auto" src={coin} alt="coin-svg" />{" "}
                600 Coins
              </span>
            </div>
            <div className="flex flex-col gap-2 mb-6">
              <div className="flex items-center gap-2">
                <Image
                  className="w-[20px] h-auto"
                  src={checkbox}
                  alt="check-svg"
                />
                <p className="text-secondary-600">Customizable workflows</p>
              </div>
              <div className="flex items-center gap-2">
                <Image
                  className="w-[20px] h-auto"
                  src={checkbox}
                  alt="check-svg"
                />
                <p className="text-secondary-600">Priority customer support</p>
              </div>
              <div className="flex items-center gap-2">
                <Image
                  className="w-[20px] h-auto"
                  src={checkbox}
                  alt="check-svg"
                />
                <p className="text-secondary-600">Comprehensive analytics</p>
              </div>
            </div>
          </div>
          <div className="w-full">
            <Button className="w-full h-[45px]">Get Started Now</Button>
          </div>
        </div>
      </div>
      <div className="w-full max-w-[1120px] xl:mt-[-20px] mb-16 mx-auto ">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 bg-white rounded-3xl  p-8">
          {/* Pricing Tier Section */}
          <div className="flex flex-col items-start">
            <h4 className="text-2xl font-bold text-gray-900">Free</h4>
            <p className="text-gray-600">
              Tailored solutions for large organizations with specific needs.
            </p>
          </div>

          {/* Features Section */}
          <div className="flex flex-col justify-center">
            <div className="flex items-center xl:ml-12  justify-start gap-3">
              <Image
                src="/checkbox.svg"
                alt="check-svg"
                width={20}
                height={20}
              />
              <p className="text-gray-700">Unlimited projects</p>
            </div>
            <div className="flex items-center xl:ml-12  justify-start gap-3">
              <Image
                src="/checkbox.svg"
                alt="check-svg"
                width={20}
                height={20}
              />
              <p className="text-gray-700">Advanced task automation</p>
            </div>
            <div className="flex items-center xl:ml-12 justify-start gap-3">
              <Image
                src="/checkbox.svg"
                alt="check-svg"
                width={20}
                height={20}
              />
              <p className="text-gray-700">Team chat and file sharing</p>
            </div>
          </div>

          {/* CTA Button Section */}
          <div className="flex flex-col items-center justify-center">
            <button className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200">
              Try It For Free
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
