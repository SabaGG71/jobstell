import Header from "../_components/Header";
import whiteCall from "../../public/phoneBlack.svg";
import Image from "next/image";
import email from "../../public/email.svg";
import linkedIn from "../../public/linkedin.svg";
import message from "../../public/message.svg";
import arrowRight from "../../public/arrowRightBlack.svg";
import arrowRight2 from "../../public/arrowPurple.svg";
import circular from "../../public/circular.svg";

export default function ContactPage() {
  return (
    <section className="min-h-screen flex flex-col items-center">
      <Header />
      <div className="bg-gradient-to-b overflow-hidden relative from-white to-primary-50 max-[1500px]:max-w-[90%] max-sm:max-w-full rounded-br-[60px] rounded-bl-[60px] max-w-[1400px] mx-auto w-full pb-[120px]">
        <Image
          className="absolute right-[-27%] min-[1900px]:right-[-24%] opacity-30 bottom-[-40%] max-lg:hidden max-xl:right-[-35%] max-xl:bottom-[-50%]"
          src={circular}
          alt="circular-svg"
        />
        <Image
          className="absolute left-[-27%] min-[1900px]:left-[-24%] opacity-30 bottom-[-40%] max-lg:hidden max-xl:left-[-35%] max-xl:bottom-[-50%]"
          src={circular}
          alt="circular-svg"
        />
        <div className="flex flex-col items-center justify-center pt-[250px] max-md:pt-[200px] px-4">
          <div className="flex items-center justify-center w-full">
            <div className="hidden md:block w-0 md:w-[200px] lg:w-[300px] h-[1px] bg-secondary-100 transform transition-all duration-300 [mask-image:linear-gradient(to_right,transparent,white_40%,white_80%,transparent)]" />
            <div className="border max-sm:text-sm flex gap-1 items-center border-secondary-200 text-[15px] px-4 py-1 rounded-full">
              <Image
                className="w-[15px] max-sm:w-[14px] max-sm:h-[14px] h-[15px] mr-2"
                src={whiteCall}
                alt="whiteCall-svg"
              />
              Contact
            </div>
            <div className="hidden md:block w-0 md:w-[200px] lg:w-[300px] h-[1px] bg-secondary-100 transform transition-all duration-300 [mask-image:linear-gradient(to_right,transparent,white_40%,white_80%,transparent)]" />
          </div>

          <h1 className="text-center max-md:max-w-[95%] mx-auto justify-center items-center text-[34px] text-secondary-700 mt-[25px] max-sm:text-[24px] max-md:text-[28px] max-sm:max-w-[70%]">
            <span className="font-[600] text-secondary-900">Contact Us </span> –
            We're Here to Help!
          </h1>
          <p className="text-secondary-600 text-center leading-7 max-sm:text-[15px] max-sm:max-w-[90%] max-sm:leading-6 text-[17px] max-lg:text-[16px]  max-md:text-[16px]  lg:max-w-[53%] max-md:max-w-[70%] max-lg:max-w-[60%] xl:max-w-[46%] mx-auto mt-4">
            Have a question or need assistance? Our support team is here to
            help! Reach out to us, and we'll get back to you as soon as
            possible.
          </p>
        </div>
      </div>

      <div className="container relative z-40 mx-auto px-4 -mt-[70px]">
        <div className="grid max-xl:max-w-[90%] lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 max-sm:gap-6 max-w-5xl max-md:max-w-[80%] max-sm:max-w-[75%] max-sm:mt-[0px] mx-auto">
          <div className="py-10 max-sm:py-8 max-sm:px-8 px-9 group cursor-pointer hover:-translate-y-[3px] bg-gradient-to-b from-white to-secondary-50 box-shadow border border-secondary-100 rounded-[35px] box-shadow-black duration-300">
            <div className="flex relative items-center justify-between">
              <span className="mb-[20px] inline-block bg-primary-500 box-shadow-black z-30 relative p-[12px] max-sm:p-[10px] rounded-2xl">
                <Image
                  className="w-[26px] max-md:w-[24px] max-md:h-[24px] z-30 relative h-[26px]"
                  src={email}
                  alt="email-svg"
                />
              </span>
              <div className="absolute w-full h-[1px] bg-gradient-to-r from-white to-primary-100 top-[40%] z-0"></div>
              <Image
                className="w-[43px] group-hover:rotate-[-15deg] duration-300 transition-all z-30 relative h-[43px] rounded-full bg-primary-50 box-shadow-black py-[5px] px-[10px] mt-[-12px]"
                src={arrowRight2}
                alt="arrowRight-white-svg"
              />
            </div>
            <h3 className="text-[20px] font-semibold mb-1 text-secondary-800 max-sm:text-base">
              Email Us
            </h3>
            <p className="text-secondary-700 max-sm:text-[15px]">
              JobstellOfficial
            </p>
          </div>

          <div className="py-10 px-9 max-sm:py-8 max-sm:px-8 group hover:-translate-y-[3px] cursor-pointer bg-gradient-to-b from-white to-secondary-50 box-shadow border border-secondary-100 rounded-[35px] box-shadow-black duration-300">
            <div className="flex relative items-center justify-between">
              <span className="mb-[20px] relative z-30 inline-block bg-primary-400 box-shadow p-[12px] rounded-2xl">
                <Image
                  className="w-[24px] h-[24px] max-md:w-[20px] max-md:h-[20px]"
                  src={linkedIn}
                  alt="email-svg"
                />
              </span>
              <div className="absolute w-full h-[1px] bg-gradient-to-r from-white to-primary-100 top-[40%] z-0"></div>
              <Image
                className="w-[43px] duration-300 transition-all group-hover:rotate-[-15deg] relative z-30 h-[43px] rounded-full bg-secondary-100 group-hover:bg-primary-50 box-shadow-black py-[5px] px-[10px] mt-[-12px]"
                src={arrowRight}
                alt="arrowRight-svg"
              />
            </div>
            <h3 className="text-[20px] font-semibold mb-1 text-secondary-800 max-sm:text-base">
              LinkedIn
            </h3>
            <p className="text-secondary-700 max-sm:text-[15px]">
              Follow <span>Jobstell</span> On LinkedIn
            </p>
          </div>
          <div className="py-10 max-sm:py-8 max-sm:px-8 group hover:-translate-y-[3px] cursor-pointer px-9 bg-gradient-to-b from-white to-secondary-50 box-shadow border border-secondary-100 rounded-[35px] box-shadow-black duration-300">
            <div className="flex relative items-center justify-between">
              <span className="mb-[20px] relative z-30 inline-block bg-primary-400 box-shadow p-[12px] rounded-2xl">
                <Image
                  className="w-[24px] h-[24px] max-md:w-[20px] max-md:h-[20px]"
                  src={message}
                  alt="message-svg"
                />
              </span>
              <div className="absolute w-full h-[1px] bg-gradient-to-r from-white to-primary-100 top-[40%] z-0"></div>
              <Image
                className="w-[43px] group-hover:rotate-[-15deg] relative group-hover:bg-primary-50 z-30 h-[43px] rounded-full bg-secondary-100 box-shadow-black py-[5px] px-[10px] mt-[-12px]"
                src={arrowRight}
                alt="arrowRight-svg"
              />
            </div>
            <h3 className="text-[20px] font-semibold mb-1 text-secondary-800 max-sm:text-base">
              Chat With AI
            </h3>
            <p className="text-secondary-700 max-sm:text-[15px]">
              Start Chat with AI Now
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
