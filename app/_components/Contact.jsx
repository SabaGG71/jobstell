import Image from "next/image";
import checkbox from "../../public/checkbox.svg";
import leftContactSvg from "../../public/left-contact-svg.svg";
import rightContactSvg from "../../public/right-contact-svg.svg";
import phone from "../../public/phone.svg";
import circular from "../../public/circular.svg";
import Link from "next/link";

export default function Contact() {
  return (
    <section className="max-w-[1200px] mx-auto overflow-hidden relative mb-[300px]">
      <div className="bg-[#F9F4FF] max-xl:max-w-[90%] overflow-hidden max-md:max-w-[90%] mx-auto relative rounded-[42px] max-sm:h-[400px] h-[440px] w-full">
        <Image
          className="absolute max-sm:w-[160px] max-xl:w-[250px] max-lg:w-[200px] right-[-1%] bottom-0"
          src={leftContactSvg}
          alt="leftContactSvg-svg"
        />
        <Image
          className="absolute max-sm:top-[-80%] left-1/2 -translate-x-1/2 max-md:opacity-15 top-[-105%] opacity-30"
          src={circular}
          alt="circular-svg"
        />
        <Image
          className="absolute max-sm:w-[160px] max-lg:w-[200px]  max-xl:w-[250px] left-[-1%] bottom-0"
          src={rightContactSvg}
          alt="leftContactSvg-svg"
        />
        <div className="text-center max-xl:mt-[50px] mt-[70px] justify-center items-center">
          <h2 className="text-center relative z-30 mx-auto leading-[1.4] text-2xl md:text-[35px] max-md:text-[30px] font-[600] text-secondary-900 mb-4">
            Join Us Today
          </h2>
          <p className="text-secondary-600 leading-7 max-sm:text-[15px] max-sm:max-w-[80%] max-sm:leading-6 text-[17px] max-lg:text-[16px]  lg:max-w-[40%] max-md:max-w-[70%] max-lg:max-w-[60%] xl:max-w-[40%] mx-auto mt-4 max-xl:mt-0">
            Have questions or need assistance? We&apos;re here to help! Reach
            out to us and let&apos;s take your productivity to the next level.
          </p>
          <div className="items-center max-md:hidden mt-[35px] sm:mt-[44px] justify-center gap-4 flex flex-row max-md:flex-col">
            <div>
              <div className="flex px-3 sm:px-4 border border-[#e5d1ff]  py-[7px] rounded-full items-center justify-center gap-[11px]">
                <Image
                  className="w-[20px] h-[20px] max-sm:w-[18px] max-sm:h-[18px]"
                  src={checkbox}
                  alt="checkbox"
                />
                <p className="text-secondary-800 max-sm:text-[14px] max-xl:text-[14px] text-[15px]">
                  Fast Support
                </p>
              </div>
            </div>

            <div>
              <div className="flex px-3 sm:px-4 border border-[#e5d1ff] py-[7px] rounded-full items-center justify-center gap-[11px]">
                <Image
                  className="w-[20px] h-[20px] max-sm:w-[18px] max-sm:h-[18px]"
                  src={checkbox}
                  alt="checkbox"
                />
                <p className="text-secondary-800 max-xl:text-[14px] text-[15px]">
                  Personalized Assistance
                </p>
              </div>
            </div>
            <div>
              <div className="flex px-3 sm:px-4 border border-[#e5d1ff] py-[7px] rounded-full items-center justify-center gap-[11px]">
                <Image
                  className="w-[20px] h-[20px]"
                  src={checkbox}
                  alt="checkbox"
                />
                <p className="text-secondary-800 max-xl:text-[14px] text-[15px]">
                  Reliable Solutions
                </p>
              </div>
            </div>
          </div>
          <div className="text-center flex items-center justify-center relative mt-10">
            <div className="hidden md:block w-0 md:w-[120px]  xl:w-[200px] h-px bg-primary-200 transform transition-all duration-300 [mask-image:linear-gradient(to_right,transparent,white_80%,white_20%,transparent)]" />
            <Link
              href="/"
              className="flex max-sm:mt-[-10px] max-sm:mb-[10px] items-center justify-center gap-3 bg-primary-500 hover:bg-primary-400 duration-300 transition-all hover:-translate-y-[2px] text-white rounded-full box-shadow px-5 max-md:text-[15px] max-sm:px-4 text-[16px]"
            >
              <Image
                src={phone}
                className="w-[15px] h-[15px]"
                alt="phone-svg"
              />
              <button className="h-[42px] max-lg:h-[40px] max-sm:h-[35px]">
                Get In Touch
              </button>
            </Link>
            <div className="hidden md:block w-0 md:w-[120px]  xl:w-[200px] h-px bg-primary-200 transform transition-all duration-300 [mask-image:linear-gradient(to_right,transparent,white_80%,white_20%,transparent)]" />
          </div>
        </div>
      </div>
    </section>
  );
}
