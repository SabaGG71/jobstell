"use client";

import Image from "next/image";
import React, { useState } from "react";
import think from "../../public/think.svg";
import add from "../../public/add.svg";
import help from "../../public/help.svg";
import { Button } from "../../components/ui/button";

// FAQ data structure
const faqData = [
  {
    id: 1,
    question: "Is there a free trial or demo available to test out JobStell?",
    answer:
      " Yes, you can try the demo version after signing up. You’ll receive 10 interview questions with feedback on your answers. However, study materials (like YouTube videos and documentation) and quizzes are only available in the paid version.",
  },
  {
    id: 2,
    question:
      "Which professions are supported by JobStell's interview generation feature?",
    answer:
      "Our interview generator supports over 50 professions, covering nearly all of the world's most popular career paths. While it doesn't include every single niche role, it offers a comprehensive range that spans technical, creative, managerial, and many other fields to help you prepare for your interviews effectively.",
  },
  {
    id: 3,
    question: "Who do I contact if I need help or run into an issue?",
    answer:
      "You can ask our AI chatbot any questions you have about JobStell. If you have a very specific issue, you can also reach out to our support team through the contact page.",
  },
  {
    id: 4,
    question:
      "Are there options for both technical and behavioral interview questions within my field?",
    answer:
      "Yes, JobStell's interview generator includes both technical questions and general, HR-style questions to help you prepare comprehensively for your interviews.",
  },
];

const FAQItem = ({ question, answer, isOpen, onClick }) => (
  <div className="space-y-2 max-lg:max-w-[90%] mx-auto">
    <div
      className={`border  hover:bg-[#f8f2ff] duration-300 transition-all ${
        isOpen ? "bg-[#faf5ff]" : "bg-secondary-50"
      } ${
        isOpen ? "border-primary-100" : "border-secondary-100"
      } rounded-3xl overflow-hidden ${isOpen ? "pb-4" : ""}`}
    >
      <div
        className="flex items-center p-6 py-[18px] justify-between cursor-pointer"
        onClick={onClick}
      >
        <p className="flex-1 max-sm:text-[16px] font-[400] max-xl:text-[16px] text-[17px] leading-7 mr-5 max-sm:max-w-[80%] md:max-w-[80%] text-secondary-700">
          {question}
        </p>
        <div className="flex-shrink-0">
          <Image
            src={add}
            alt="add-svg"
            className={`w-[30px] h-[30px] max-sm:w-6 max-md:w-7 max-md:h-7 max-sm:h-6 cursor-pointer bg-secondary-800 box-shadow-black rounded-full transform transition-transform duration-300 ${
              isOpen ? "rotate-45" : ""
            }`}
          />
        </div>
      </div>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6">
          <div className="h-px bg-[#efe2ff] w-full my-2 mt-1"></div>
          <p className="text-secondary-700 max-xl:text-[15px]  max-sm:text-[14px] pb-3 leading-6 py-2">
            {answer}
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default function Faq() {
  const [activeItem, setActiveItem] = useState(null);

  const toggleItem = (id) => {
    setActiveItem((currentId) => (currentId === id ? null : id));
  };

  return (
    <section className="overflow-hidden max-md:mt-[150px] mt-[200px] relative max-sm:mb-[120px] mb-[170px]">
      <div className="flex container text-base mb-6 text-secondary-600 text-center justify-center items-center">
        <div className="hidden md:block w-0 md:w-[200px] lg:w-[300px] h-px bg-secondary-200 transform transition-all duration-300 [mask-image:linear-gradient(to_right,transparent,white_80%,white_20%,transparent)]" />
        <p className="border flex text-secondary-700 gap-2 items-center border-secondary-100 box-shadow-black text-[15px] px-4 py-[3px] rounded-full">
          <Image className="w-5 h-5" src={think} alt="think-svg" />
          FAQ
        </p>
        <div className="hidden md:block w-0 md:w-[200px] lg:w-[300px] h-px bg-secondary-100 transform transition-all duration-300 [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]" />
      </div>

      <h3 className="text-center mx-auto leading-[1.4] text-2xl sm:text-[34px] font-[400] text-secondary-900 mb-7 sm:mb-[65px]">
        Need Help?{" "}
        <span className="font-[400]">
          <span className="text-secondary-700 font-[600]">Jobstell</span> Is
          Here!
        </span>
      </h3>

      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {/* Left Column */}
          <div className="space-y-3">
            {faqData.slice(0, 2).map((faq) => (
              <FAQItem
                key={faq.id}
                question={faq.question}
                answer={faq.answer}
                isOpen={activeItem === faq.id}
                onClick={() => toggleItem(faq.id)}
              />
            ))}
          </div>

          {/* Right Column */}
          <div className="space-y-3">
            {faqData.slice(2, 4).map((faq) => (
              <FAQItem
                key={faq.id}
                question={faq.question}
                answer={faq.answer}
                isOpen={activeItem === faq.id}
                onClick={() => toggleItem(faq.id)}
              />
            ))}
          </div>
        </div>

        <div className="flex mt-12 gap-6 items-center justify-center">
          <div className="flex max-sm:flex-col max-sm:rounded-[30px] max-sm:p-5 bg-primary-50 border border-primary-100 py-[10px] px-[11px] rounded-full items-center gap-3">
            <Image
              className="w-6 h-6 max-md:w-5 max-md:h-5 mr-[2px] ml-[6px]"
              src={help}
              alt="help-svg"
            />
            <p className="text-secondary-700 max-md:text-[15px]">
              Still Have a Question
            </p>
            <Button className="sm:ml-4 max-md:text-[15px] max-md:h-[35px] max-md:px-3 text-[17px] h-[40px] px-5 font-[400]">
              Ask AI Chatbot
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
