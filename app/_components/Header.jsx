"use client";

import { twMerge } from "tailwind-merge";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useUser, useClerk } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import callWhite from "../../public/call-white.svg";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import logo from "../../public/logo.svg";
import contactSVG from "../../public/contact-svg.svg";
import signIn from "../../public/sign-in.svg";
import logout from "../../public/logout.svg";
import userSVG from "../../public/userSvg.svg";
import down from "../../public/downArrow.svg";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { isSignedIn, user } = useUser();
  const { signOut } = useClerk();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const getDisplayName = () => {
    if (!user) return "User";
    if (user.fullName) return user.fullName;
    if (user.firstName && user.lastName)
      return `${user.firstName} ${user.lastName}`;
    if (user.firstName) return user.firstName;
    if (user.lastName) return user.lastName;
    if (user.emailAddresses && user.emailAddresses[0]) {
      return user.emailAddresses[0].emailAddress.split("@")[0];
    }
    return "User";
  };

  const getAvatarFallback = () => {
    if (!user) return "U";
    if (user.firstName) return user.firstName.charAt(0);
    if (user.lastName) return user.lastName.charAt(0);
    if (user.emailAddresses && user.emailAddresses[0]) {
      return user.emailAddresses[0].emailAddress.charAt(0).toUpperCase();
    }
    return "U";
  };

  const navigationLinks = [
    { href: "/dashboard", label: "Dashboard", desktopKey: "desktop-dashboard" },
    {
      href: "/how-it-works",
      label: "How It Works?",
      desktopKey: "desktop-how-it-works",
    },
    { href: "/features", label: "Features", desktopKey: "desktop-features" },
    { href: "/pricing", label: "Pricing", desktopKey: "desktop-pricing" },
    { href: "/faq", label: "FAQ", desktopKey: "desktop-faq" },
  ];

  const LoadingSkeleton = () => (
    <header className="py-[19px] max-xl:max-w-[100%] border-b border-[#adadad2c] bg-white/65 backdrop-blur px-4 fixed w-full top-0 z-50">
      <div className="container">
        <div className="flex justify-between py-2 px-3 items-center sm:pr-3">
          <div className="w-[128px] h-[40px] bg-gray-200 rounded animate-pulse" />
          <div className="animate-pulse flex gap-4">
            <div className="h-8 w-24 bg-gray-200 rounded-full" />
            <div className="h-8 w-24 bg-gray-200 rounded-full" />
          </div>
        </div>
      </div>
    </header>
  );

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  return (
    <header
      className={`py-[12px] ${
        isOpen ? "border-none" : "border-b"
      } border-[#adadad2c] bg-white/65 backdrop-blur px-4 fixed w-full top-0 z-50 transition-all duration-300`}
    >
      <div className="container">
        <div>
          {/* Main Header Content */}
          <div className="flex justify-between py-2 px-3 items-center sm:pr-3">
            {/* Logo */}
            <Link href="/">
              <Image
                quality={100}
                width={126}
                height={126}
                src={logo}
                alt="logo"
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="lg:flex flex-1 justify-left text-sm items-center hidden">
              <ul className="flex flex-1 text-secondary-900 gap-6 font-[400] mt-[2px] text-[15px] ml-10">
                {navigationLinks.map((item) => (
                  <li key={item.desktopKey}>
                    <Link
                      href={item.href}
                      className="hover:text-primary-500 duration-300 transition-all"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex justify-end gap-2 lg:mr-[-6px]">
              {isSignedIn ? (
                <div className="lg:hidden flex items-center gap-2">
                  <Image
                    className="w-[28px] block box-shadow bg-primary-500 pt-[3px] pb-[4px] rounded-full h-[28px]"
                    src={userSVG}
                    alt="user"
                  />
                  <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="focus:outline-none"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#212121"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="ml-2 cursor-pointer"
                    >
                      <line x1="3" y1="12" x2="21" y2="12"></line>
                      <line x1="3" y1="6" x2="21" y2="6"></line>
                      <line x1="3" y1="18" x2="21" y2="18"></line>
                    </svg>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="focus:outline-none lg:hidden"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#212121"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather cursor-pointer feather-menu"
                  >
                    <line
                      x1="3"
                      y1="6"
                      x2="21"
                      y2="6"
                      className={twMerge(
                        "origin-left transition",
                        isOpen && "rotate-45 -translate-y-1"
                      )}
                    ></line>
                    <line
                      x1="3"
                      y1="12"
                      x2="21"
                      y2="12"
                      className={twMerge("transition", isOpen && "opacity-0")}
                    ></line>
                    <line
                      x1="3"
                      y1="18"
                      x2="21"
                      y2="18"
                      className={twMerge(
                        "origin-left transition",
                        isOpen && "-rotate-45 translate-y-1"
                      )}
                    ></line>
                  </svg>
                </button>
              )}

              {/* Desktop Menu */}
              <div className="lg:flex hidden items-center">
                {/* Contact Button */}
                <span
                  className={`${
                    isSignedIn
                      ? "flex box-shadow-black bg-gradient-to-b from-primary-400 to-primary-500 items-center gap-[11px] hover:bg-primary-600 pr-5 text-white mr-2 py-[7px] px-4 rounded-full font-[400] text-[15px] cursor-pointer duration-200 transition-all"
                      : "flex box-shadow-black border border-secondary-300  items-center gap-[11px] pr-5 hover:bg-secondary-50 text-secondary-900 py-[6px] px-4  rounded-full font-[400] text-[15px] cursor-pointer duration-200 transition-all"
                  }  hover:-translate-y-[2px] duration-300`}
                >
                  {isSignedIn ? (
                    <Image
                      src={callWhite}
                      className={`${"w-[15px] h-[15px]"}`}
                      alt="callWhite-svg"
                      priority
                    />
                  ) : (
                    <Image
                      src={contactSVG}
                      className={`${"w-[15px] h-[15px]"}`}
                      alt="contact-svg"
                      priority
                    />
                  )}
                  Contact
                </span>

                {isSignedIn ? (
                  <div className="flex items-center">
                    <Popover>
                      <PopoverTrigger asChild>
                        <div className="flex border border-secondary-200 box-shadow-black  hover:bg-secondary-50 duration-300 transition-all h-[38px] pl-[6px] px-4 gap-3 overflow-hidden rounded-full items-center cursor-pointer">
                          <div className="overflow-hidden rounded-full block bg-transparent">
                            <Image
                              className="w-[25px] mt-[2px] block box-shadow-black bg-secondary-700 pt-[3px] pb-[4px] rounded-full h-[25px]"
                              src={userSVG}
                              alt="user"
                            />
                          </div>
                          <span className="text-[15px] font-[600] text-secondary-900">
                            {getDisplayName()}
                          </span>
                          <Image
                            src={down}
                            className="w-[10px] max-xl:ml-[3px] ml-[4px] h-[10px] opacity-80"
                            alt="down-arrow"
                            priority
                          />
                        </div>
                      </PopoverTrigger>
                      <PopoverContent className="flex flex-col p-4 border shadow-sm rounded-3xl mt-3 border-secondary-200">
                        <div className="flex outline-none border-none focus:border-none focus:outline-none flex-col gap-3 items-start">
                          <div className="flex focus:border-none focus:outline-none outline-none mb-[5px] w-full rounded-full mt-1 gap-3 items-center">
                            <Image
                              className="w-[30px] block box-shadow bg-primary-500 pt-[3px] pb-[4px] rounded-full h-[30px]"
                              src={userSVG}
                              alt="user"
                            />
                            <span className="text-[16px] font-[600] text-second">
                              {getDisplayName()}
                            </span>
                          </div>
                          <Button
                            variant="outline"
                            onClick={() => signOut()}
                            className="text-[15px] focus:border-none focus:outline-none outline-none bg-red-500 box-shadow-black border-none text-white hover:bg-red-600 hover:text-white rounded-full w-full"
                          >
                            Sign Out
                            <Image
                              src={logout}
                              className="w-[19px] ml-1 h-[19px]"
                              alt="logout-svg"
                              priority
                            />
                          </Button>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                ) : (
                  <Link href="/sign-up">
                    <Button className="flex hover:translate-y-[-2px] duration-300 transition-all select-none items-center gap-2 bg-gradient-to-b from-primary-400 to-primary-500 box-shadow text-white px-[20px] rounded-full  font-[400] text-[15px] ml-2">
                      <Image
                        width={15}
                        height={15}
                        src={signIn}
                        alt="sign-in-svg"
                        priority
                      />
                      Sign Up
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: "auto" }}
                exit={{ height: 0 }}
                className="overflow-hidden"
              >
                <div className="grid grid-cols-1 justify-center text-center border border-[#000/80] md:mt-5 mt-[13px] rounded-xl bg-[#f5f5f5]/30 backdrop-blur flex-col lg:hidden items-center gap-4 py-4 pb-8 px-6">
                  {navigationLinks.map((item) => (
                    <Link
                      key={`mobile-${item.desktopKey}`}
                      href={item.href}
                      className="py-[3px] text-[15px] font-[500]"
                      onClick={() => setIsOpen(false)}
                    >
                      <span className="text-primary-500">✶</span> {item.label}
                    </Link>
                  ))}
                  {!isSignedIn ? (
                    <div>
                      <Button
                        className="bg-primary-500 text-[15px] text-white rounded-full box-shadow-mobile px-4 gap-3 font-[600]"
                        onClick={() => setIsOpen(false)}
                      >
                        <Link href="/sign-up">Sign Up</Link>
                      </Button>
                    </div>
                  ) : (
                    <Button
                      variant="outline"
                      onClick={() => {
                        setIsOpen(false);
                        signOut();
                      }}
                      className="text-[15px] focus:border-none focus:outline-none outline-none bg-red-500 box-shadow-black border-none text-white hover:bg-red-600 hover:text-white rounded-full w-full"
                    >
                      Sign Out
                      <Image
                        src={logout}
                        className="w-[19px] ml-1 h-[19px]"
                        alt="logout-svg"
                        priority
                      />
                    </Button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
