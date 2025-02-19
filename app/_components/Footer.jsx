import React from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../../public/logo.svg";
import arrowRight from "../../public/arrowRight.svg";
import circular from "../../public/circular.svg";

const Footer = () => {
  return (
    <div className="w-full">
      <footer className="pt-12 overflow-hidden mt-[150px] bg-gray-50 relative mx-auto">
        {/* Background circular decoration */}
        <Image
          src={circular}
          alt="circular"
          className="absolute left-[38%] -translate-x-1/2 top-[-51%] opacity-30 w-[400px] h-[400px] "
        />

        <div className="mx-auto container px-4 pb-8 pt-16 sm:px-6 lg:px-8">
          {/* Main Grid Layout */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-[30px]">
            {/* Left Column - Logo and CTA */}
            <div className="lg:max-w-none max-md:ml-5">
              <div className="mb-5">
                <Image
                  className="w-[140px] max-md:mb-7 max-md:w-[130px]"
                  src={logo}
                  alt="saiberlogo-svg"
                />
              </div>
              <p className="mt-[30px] max-md:mt-[20px] leading-[1.55] max-w-full sm:max-w-[80%] lg:max-w-[60%] mb-[35px] max-md:mb-[25px] text-gray-600 text-[15px] max-md:max-w-[90%] lg:text-[16px]">
                Your expert guide to mastering every interview with confidence
                and success.
              </p>
              <button className="bg-purple-500 flex items-center gap-[10px] text-white hover:bg-purple-700 duration-300 transition-all hover:-translate-y-[3px] rounded-full text-[14px] lg:text-[15px] py-[6px] px-[17px] box-shadow font-[400]">
                Try It Now
                <Image
                  className="w-[18px] h-[18px]"
                  src={arrowRight}
                  alt="arrowRight-svg"
                />
              </button>
            </div>

            {/* Right Column - Navigation Links */}
            <div className="grid max-md:ml-5 max-lg:mt-9 grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-[15px] lg:grid-cols-3 text-left">
              {/* Navigation Section */}
              <div>
                <div className="relative list-none duration-300 transition-all cursor-pointer group">
                  <div className="hidden md:block w-[6px] group-hover:bg-purple-400 absolute h-[6px] bg-purple-300 rounded-full top-1/2 left-[-10%] -translate-y-1/2" />
                  <Link
                    href="/"
                    className="text-gray-800 text-[15px] lg:text-[16px] transition font-[400] group-hover:text-gray-700"
                  >
                    Navigation
                  </Link>
                </div>

                <ul className="mt-6 space-y-3">
                  {["Dashboard", "How It Works", "Pricing", "Contact"].map(
                    (item) => (
                      <li
                        key={item}
                        className="relative duration-300 transition-all cursor-pointer group"
                      >
                        <div className="hidden md:block w-[6px] group-hover:bg-purple-300 absolute h-[6px] bg-purple-100 rounded-full top-1/2 left-[-10%] -translate-y-1/2" />
                        <Link
                          href="/"
                          className="text-gray-600 text-[14px] lg:text-[15px] transition font-[400] group-hover:text-purple-500"
                        >
                          {item}
                        </Link>
                      </li>
                    )
                  )}
                </ul>
              </div>

              {/* Key Features Section */}
              <div className="max-sm:mt-0">
                <div className="relative list-none duration-300 transition-all cursor-pointer group">
                  <div className="hidden md:block w-[6px] group-hover:bg-purple-400 absolute h-[6px] bg-purple-300 rounded-full top-1/2 left-[-10%] -translate-y-1/2" />
                  <Link
                    href="/"
                    className="text-gray-800 text-[15px] lg:text-[16px] transition font-[400] group-hover:text-gray-700"
                  >
                    Key Features
                  </Link>
                </div>

                <ul className="mt-6 space-y-3">
                  {[
                    "AI Interviews",
                    "Feedback",
                    "AI Voice Chat",
                    "Quiz & Certificate",
                  ].map((item) => (
                    <li
                      key={item}
                      className="relative duration-300 transition-all cursor-pointer group"
                    >
                      <div className="hidden md:block w-[6px] group-hover:bg-purple-300 absolute h-[6px] bg-purple-100 rounded-full top-1/2 left-[-10%] -translate-y-1/2" />
                      <Link
                        href="/"
                        className="text-gray-600 text-[14px] lg:text-[15px] transition font-[400] group-hover:text-purple-500"
                      >
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Support & Policies Section */}
              <div className="max-sm:mt-0 sm:col-span-1">
                <div className="relative list-none duration-300 transition-all cursor-pointer group">
                  <div className="hidden md:block w-[6px] group-hover:bg-purple-400 absolute h-[6px] bg-purple-300 rounded-full top-1/2 left-[-10%] -translate-y-1/2" />
                  <Link
                    href="/"
                    className="text-gray-800 text-[15px] lg:text-[16px] transition font-[400] group-hover:text-gray-700"
                  >
                    Support & Policies
                  </Link>
                </div>

                <ul className="mt-6 space-y-3">
                  {["HR List", "Privacy Policy", "Terms & Conditions"].map(
                    (item) => (
                      <li
                        key={item}
                        className="relative duration-300 transition-all cursor-pointer group"
                      >
                        <div className="hidden lg:block w-[6px] group-hover:bg-purple-300 absolute h-[6px] bg-purple-100 rounded-full top-1/2 left-[-10%] -translate-y-1/2" />
                        <Link
                          href="/"
                          className="text-gray-600 text-[14px] lg:text-[15px] transition font-[400] group-hover:text-purple-500"
                        >
                          {item}
                        </Link>
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="block w-full max-md:mt-12 mt-16 mb-9 h-px bg-secondary-200 max-md:bg-p transform transition-all duration-300 [mask-image:linear-gradient(to_right,transparent,white_50%,white_40%,transparent)]" />

          {/* Footer Bottom */}
          <div className="flex pl-5 mb-1 flex-col md:flex-row items-start justify-start md:justify-center w-full md:gap-0">
            <div className="flex flex-col md:flex-row items-start md:items-center md:gap-[6px] w-full md:w-auto">
              {/* Mobile Layout - First Line */}
              <div className="flex items-center gap-2 mb-2 md:mb-0">
                <p className="text-gray-900 text-[14px] lg:text-base">
                  Made In &copy; 2025{" "}
                  <span className="ml-2 max-md:inline-block hidden">-</span>
                </p>
                <p className="font-[400] text-secondary-900 text-[14px] max-md:text-primary-500 mr-[6px] max-md:font-[600] lg:text-base">
                  Jobstell
                </p>
              </div>

              <div className="flex max-md:mb-6 md:flex-row items-center lg:gap-1 w-full md:w-auto">
                {/* Desktop Only Dot */}
                <span className="hidden lg:block w-[6px] h-[6px] bg-purple-300 rounded-full" />

                {/* Mobile Layout - Second Line */}
                <div className="flex items-center md:mb-0">
                  <p className="lg:mx-3 text-secondary-900  text-[14px] lg:text-base">
                    Created By
                  </p>
                  <span className="hidden lg:block w-[6px] h-[6px] bg-purple-300 rounded-full lg:mr-2" />
                </div>

                {/* Mobile Layout - Third Line */}
                <div className="flex flex-wrap gap-3 items-center">
                  <Link
                    href="https://saiber.vercel.app/"
                    target="_blank"
                    className="font-[400] md:bg-purple-500 md:hover:bg-purple-600 duration-300 transition-all box-shadow-desktop md:px-3 md:py-[3px] rounded-full max-md:ml-2 max-md:underline max-md:text-secondary-900 md:text-white text-[14px] lg:text-base"
                  >
                    Saiber
                  </Link>
                  <p className="font-[600] text-gray-900 md:bg-gray-100 md:border md:border-gray-200 md:py-[3px] md:px-[10px] rounded-full text-[14px] lg:text-base">
                    &
                  </p>
                  <Link
                    href="/"
                    className="font-[400] box-shadow-desktop  md:bg-purple-500 md:hover:bg-purple-600 duration-300 transition-all md:px-3 max-md:underline md:py-[3px] rounded-full max-md:text-secondary-900 md:text-white text-[14px] lg:text-base"
                  >
                    Alsphere
                  </Link>
                </div>
              </div>
            </div>
          </div>
          {/* end footerBottom */}
        </div>
      </footer>
    </div>
  );
};

export default Footer;
