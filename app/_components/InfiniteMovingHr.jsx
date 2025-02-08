"use client";

import React from "react";
import { InfiniteMovingHrs } from "../_components/InfiniteMovingHrs";

export function InfiniteMovingHr() {
  return (
    <div className="rounded-md max-w-full mb-[200px] flex flex-col antialiased  items-center justify-center relative overflow-hidden">
      <InfiniteMovingHrs items={testimonials} direction="right" speed="slow" />
    </div>
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
