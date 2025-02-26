import PricingDashboard from "../../_components/PricingDashboard";
import { PricingTable } from "../_components/pricing-table";
import girlWithCoins from "../../../public/girlwithCoins.png";
import arrowRight from "../../../public/arrowRight.svg";
import coin from "../../../public/coinOrange.svg";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return (
    <section className="mb-16 sm:mb-20 md:mb-24 lg:mb-32 xl:mb-40 w-full lg:w-[calc(100%-320px)] lg:ml-auto flex flex-col justify-center items-center">
      {/* Hero section with gradient background */}
      <div className="w-full relative overflow-hidden bg-gradient-to-b from-white to-primary-50">
        <div className="container mx-auto px-4 relative w-full">
          <div className="flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto">
            {/* Text content section */}
            <div className="text-center md:ml-6  md:text-left w-full md:w-1/2 z-10 pt-16 sm:pt-20 md:pt-24 lg:pt-28 pb-6 md:pb-24 lg:pb-28">
              <h2 className="text-2xl max-md:mt-[70px] sm:text-[32px] font-semibold max-lg:text-[26px] mb-3 md:mb-6">
                Packages & Feature Costs
              </h2>
              <p className="text-base max-md:max-w-[80%] max-md:my-4 mx-auto max-lg:text-[16px] text-[17px] text-secondary-600">
                Interview generations priced by question count;
                <br className="hidden sm:block" /> voice chat billed per minute.
              </p>
              <Link className="inline-block" href="#pricingTable">
                <button className="mt-4 md:mt-8 flex items-center gap-2 md:gap-3 bg-primary-400 hover:bg-primary-500 duration-300 transition-all hover:-translate-y-1 box-shadow text-white rounded-full py-1.5 md:py-2 px-4 md:px-5 text-sm md:text-[15px] font-semibold">
                  See Details
                  <Image
                    className="w-4 h-4 md:w-5 md:h-5 rotate-90"
                    src={arrowRight}
                    alt="arrowRight-svg"
                  />
                </button>
              </Link>
            </div>

            {/* Mobile image */}
            <div className="md:hidden w-full flex justify-center">
              <div className="relative transform translate-y-4">
                <Image
                  className="w-[240px] xs:w-[270px] sm:w-[300px] h-auto object-contain"
                  src={girlWithCoins}
                  alt="girl-with-coins-svg"
                  priority
                />
              </div>
            </div>

            {/* Desktop image */}
            <div className="hidden md:block md:w-1/2 h-full">
              <div className="relative h-full">
                <Image
                  className="absolute w-[280px] lg:w-[326px] xl:w-[360px] right-4 lg:right-12 top-[-81px] min-[1168px]:top-[-125px]  xl:-top-[160px]"
                  src={girlWithCoins}
                  alt="girl-with-coins-svg"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing section */}
      <div className="w-full flex flex-col max-w-[1300px] mx-auto px-4">
        {/* Buy coins section */}
        <div className="flex justify-center mt-16 sm:mt-20 md:mt-24 mb-8 sm:mb-10 md:mb-12 items-center">
          <div
            className="hidden md:block w-0 md:w-[160px] lg:w-[240px] xl:w-[300px] h-px bg-secondary-100 transition-all duration-300"
            style={{
              maskImage:
                "linear-gradient(to right, transparent, white 80%, white 20%, transparent)",
            }}
          />

          <div className="border flex gap-2 sm:gap-3 items-center border-secondary-100 text-sm sm:text-[15px] px-2 sm:px-3 py-1 rounded-full">
            <Image
              src={coin}
              className="w-[16px] sm:w-[20px] h-[16px] sm:h-[20px]"
              alt="coin-svg"
            />
            <p>Buy Coins</p>
          </div>

          <div
            className="hidden md:block w-0 md:w-[160px] lg:w-[240px] xl:w-[300px] h-px bg-secondary-100 transition-all duration-300"
            style={{
              maskImage:
                "linear-gradient(to right, transparent, white 40%, white 60%, transparent)",
            }}
          />
        </div>

        {/* Pricing dashboard */}
        <div className="w-full">
          <PricingDashboard />
        </div>

        {/* Pricing table */}
        <div
          id="pricingTable"
          className="overflow-x-auto w-full mt-8 sm:mt-12 md:mt-16"
        >
          <PricingTable />
        </div>
      </div>
    </section>
  );
}
