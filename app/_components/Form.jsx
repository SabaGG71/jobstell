"use client";

import { useState, useEffect } from "react";
import { DotBackgroundDemo2 } from "./DotBackgroundDemo2";
import send from "../../public/send.svg";
import checkbox from "../../public/checkbox.svg";
import Image from "next/image";

export default function Form() {
  const [status, setStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const MAX_RETRIES = 1;
  const RETRY_DELAY = 2000;

  useEffect(() => {
    if (status) {
      const timer = setTimeout(() => {
        setStatus(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  const submitWithRetry = async (formData, attempt = 0) => {
    try {
      const response = await fetch("https://formspree.io/f/mjkgjlyb", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
        timeout: 10000,
      });

      if (response.ok) {
        return { success: true };
      }

      throw new Error(await response.text());
    } catch (error) {
      console.error(`Attempt ${attempt + 1} failed:`, error);

      if (attempt < MAX_RETRIES) {
        await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
        setRetryCount(attempt + 1);
        return submitWithRetry(formData, attempt + 1);
      }

      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setRetryCount(0);

    try {
      const formData = new FormData(e.target);
      const data = Object.fromEntries(formData);

      const result = await submitWithRetry(data);

      if (result.success) {
        setStatus("success");
        e.target.reset();
      }
    } catch (error) {
      console.error("Form submission failed:", error);
      setStatus("error");
    } finally {
      setIsSubmitting(false);
      setRetryCount(0);
    }
  };

  return (
    <section className="xl:w-[630px] max-xl:max-w-[100%] mx-auto relative mb-20 px-4 sm:px-6 lg:px-8">
      {/* <div className="absolute overflow-hidden right-[-5%] bottom-[20%] rounded-[70px] rotate-45 bg-primary-100 w-[300px] h-[300px]">
        <DotBackgroundDemo2 />
      </div>
      <div className="absolute overflow-hidden left-[-5%] rotate-[45deg] bottom-[8%] rounded-[70px] bg-primary-100 w-[300px] h-[300px]">
        <DotBackgroundDemo2 />
      </div> */}
      <div className="relative bg-[#f7f7f7] border border-secondary-100  rounded-[32px]">
        {/* Background decorative elements */}
        <div className="absolute -left-12 -top-12 w-48 h-48 bg-secondary-50 rounded-full blur-3xl" />

        <form
          id="contact-form"
          onSubmit={handleSubmit}
          className="relative space-y-6 rounded-[22px] z-10 p-12 max-sm:p-7 overflow-hidden"
        >
          <DotBackgroundDemo2 />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2 mb-2">
              <label className="inline-block text-secondary-700 rounded-full text-[17px] max-sm:text-[15px] font-[600] mb-[3px]">
                Name
              </label>
              <input
                className="w-full px-4 py-[10px] bg-white rounded-[18px]  border border-secondary-100 text-secondary-900 text-[15px] placeholder-secondary-500 focus:ring-1 focus:ring-primary-300 max-sm:text-[14px]  focus:bg-[#faf5ff] outline-none transition duration-200"
                type="text"
                id="name"
                required
                name="name"
                placeholder="Your Name"
                disabled={isSubmitting}
              />
            </div>
            <div className="space-y-2">
              <label className="inline-block  text-secondary-700 rounded-full text-[18px] max-sm:text-[15px] font-[600] mb-[3px]">
                Email
              </label>
              <input
                className="w-full px-4 max-sm:text-[14px]  py-[10px] border border-secondary-100 text-[15px] 
  outline-none bg-white rounded-[18px] focus:bg-purple-50 
  placeholder-secondary-500 focus:ring-1 focus:ring-purple-300 
  focus:border-purple-300 transition duration-200
  [&:-webkit-autofill]:bg-purple-50
  [&:-webkit-autofill]:hover:bg-purple-50
  [&:-webkit-autofill]:focus:bg-purple-50
  [&:-webkit-autofill]:active:bg-purple-50"
                type="email"
                id="email"
                required
                name="email"
                placeholder="Your Email"
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="inline-block text-secondary-700 rounded-full text-[18px] max-sm:text-[15px] font-[600] mb-[3px]">
              Message
            </label>
            <textarea
              className="w-full px-4 border outline-none border-secondary-100 py-3 focus:bg-[#faf5ff] bg-white rounded-[18px] text-[15px]  text-secondary-900 placeholder-secondary-500 max-sm:text-[14px] focus:ring-1 focus:ring-primary-300 transition duration-200 min-h-[150px] max-h-[300px]"
              id="message"
              name="message"
              required
              placeholder="Enter your message"
              disabled={isSubmitting}
            />
          </div>

          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="w-full flex hover:-translate-y-[3px] duration-300 transition-all text-center justify-center items-center sm:w-auto px-6 box-shadow py-[10px] bg-primary-400 hover:bg-primary-500 text-white text-[16px] font-[600] rounded-full disabled:opacity-50 disabled:cursor-not-allowed mt-5 max-sm:mt-0 max-sm:text-[15px]"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  {retryCount > 0
                    ? `Retrying... (${retryCount}/${MAX_RETRIES})`
                    : "Sending..."}
                </>
              ) : (
                <div className="flex items-center gap-3">
                  <Image
                    className="w-[16px] h-[16px] max-sm:w-[14px] max-sm:h-[14px]"
                    src={send}
                    alt="send-svg"
                  />
                  <p> Send Your Message</p>
                </div>
              )}
            </button>
          </div>
        </form>

        {status === "success" && (
          <div className="flex items-center mt-[-15px] pb-9 justify-center gap-3">
            <Image src={checkbox} alt="checkbox-svg" />
            <p className="text-primary-400 font-[600]">
              Your message has been sent successfully!
            </p>
          </div>
        )}
        {status === "error" && (
          <div className="flex items-center mt-[-15px] pb-9 justify-center gap-[9px]">
            <p className="text-red-500 text-center font-[600]">
              Oops! Something went wrong. Please try again.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
