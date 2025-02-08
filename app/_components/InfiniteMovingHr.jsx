"use client";

import React from "react";
import { InfiniteMovingHrs } from "../_components/InfiniteMovingHrs";
import arrowRight from "../../public/arrowRight.svg";
import Image from "next/image";

export function InfiniteMovingHr() {
  return (
    <>
      <div className="rounded-md max-w-full flex flex-col antialiased  items-center justify-center relative overflow-hidden">
        <InfiniteMovingHrs
          items={testimonials}
          direction="right"
          speed="slow"
        />
      </div>
      <div className="text-center justify-center flex items-center">
        <button className="mt-6 mb-[120px] rounded-full text-secondary-800 box-shadow hover:-translate-y-[3px] text-[15px] font-[600] py-[11px] max-md:text-[14px] max-md:px-4 duration-300 transition-all hover:bg-primary-200 px-6 box-shadow-black flex gap-4 items-center bg-primary-100">
          See All HR Experts
          <Image
            className="w-[18px] h-[18px]"
            src={arrowRight}
            alt="arrowRight-svg"
          />
        </button>
      </div>
    </>
  );
}

const testimonials = [
  {
    src: "/human1.jpg",
    title: "Julieta Montes",
    national: "Argentina",
    jobExp: "7 years experience",
    text: "I'm a Video Editor. I love to tell brand stories and create engaging content that connects.",
    skill1: "Interviewing",
    skill2: "HR Strategy",
    skill3: "HR Policies",
    icon: "/arrowTopDown.svg",
  },
  {
    src: "/human2.jpg",
    title: "Sara Mendoza",
    national: "New Mexico",
    jobExp: "4 years experience",
    text: "I'm a Video Editor. I love to tell brand stories and create engaging content that connects.",
    skill1: "Interviewing",
    skill2: "HR Strategy",
    skill3: "HR Policies",
    icon: "/arrowTopDown.svg",
  },
  {
    src: "/human3.jpg",
    title: "Felipe Souza",
    national: "France",
    jobExp: "2 years experience",
    text: "I'm a Video Editor. I love to tell brand stories and create engaging content that connects.",
    skill1: "Interviewing",
    skill2: "HR Strategy",
    skill3: "HR Policies",
    icon: "/arrowTopDown.svg",
  },
  {
    src: "/human4.jpg",
    title: "Pablo Huerta",
    national: "Germany",
    jobExp: "1 years experience",
    text: "I'm a Video Editor. I love to tell brand stories and create engaging content that connects.",
    skill1: "Interviewing",
    skill2: "HR Strategy",
    skill3: "HR Policies",
    icon: "/arrowTopDown.svg",
  },
  {
    src: "/human1.jpg",
    title: "Moby-Dick",
    national: "Georgia",
    jobExp: "5 years experience",
    text: "I'm a Video Editor. I love to tell brand stories and create engaging content that connects.",
    skill1: "Interviewing",
    skill2: "HR Strategy",
    skill3: "HR Policies",
    icon: "/arrowTopDown.svg",
  },
];
