"use client";

import { twMerge } from "tailwind-merge";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useUser, useClerk } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
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
import down from "../../public/downArrow.svg";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const { isSignedIn, user, isLoaded } = useUser();
  const { signOut } = useClerk();

  // Handle hydration
  useEffect(() => {
    setIsClient(true);
  }, []);

  const getDisplayName = () => {
    if (!user) return "";
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

  // Loading skeleton
  const LoadingSkeleton = () => (
    <header className="py-[19px] border-b border-[#adadad2c] bg-white/65 backdrop-blur px-4 fixed w-full top-0 z-50">
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

  // Show loading skeleton until both client-side rendering is ready and Clerk is loaded
  if (!isClient || !isLoaded) {
    return <LoadingSkeleton />;
  }

  return (
    <header
      className={`py-[19px] ${
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
                width={128}
                height={128}
                src={logo}
                alt="logo"
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="lg:flex flex-1 justify-left text-sm items-center hidden">
              <ul className="flex flex-1 text-secondary-900 gap-6 font-[400] mt-[3px] text-[15px] ml-10">
                <li>
                  <Link
                    href="/dashboard"
                    className="hover:text-primary-500 duration-300 transition-all"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    href="/"
                    className="hover:text-primary-500 duration-300 transition-all"
                  >
                    How It Works?
                  </Link>
                </li>
                <li>
                  <Link
                    href="/"
                    className="hover:text-primary-500 duration-300 transition-all"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    href="/"
                    className="hover:text-primary-500 duration-300 transition-all"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    href="/"
                    className="hover:text-primary-500 duration-300 transition-all"
                  >
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            <div className="flex justify-end gap-2 lg:mr-[-6px]">
              {isSignedIn ? (
                <div className="lg:hidden flex items-center gap-2">
                  <Avatar className="h-[32px] w-[32px] hover:scale-105 duration-300 transition-all">
                    <AvatarImage src={user?.imageUrl} alt={getDisplayName()} />
                    <AvatarFallback className="bg-muted text-muted-foreground">
                      {getAvatarFallback()}
                    </AvatarFallback>
                  </Avatar>
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
                <span className="flex items-center gap-3 text-secondary-900 py-[7px] px-5 rounded-full font-[600] text-[15px] cursor-pointer hover:text-secondary-600 duration-200 transition-all">
                  <Image
                    width={17}
                    height={17}
                    src={contactSVG}
                    alt="contact-svg"
                    priority
                  />
                  Contact
                </span>

                {/* User Menu / Sign Up Button */}
                {isSignedIn ? (
                  <div className="flex items-center">
                    <Popover>
                      <PopoverTrigger asChild>
                        <div className="flex gap-3 rounded-full items-center cursor-pointer">
                          <div className="w-[1px] h-[20px] rounded-full bg-secondary-100 mr-[10px]"></div>
                          <Avatar className="h-[30px] w-[30px] hover:scale-105 duration-300 transition-all">
                            <AvatarImage
                              src={user?.imageUrl}
                              alt={getDisplayName()}
                            />
                            <AvatarFallback className="bg-muted text-muted-foreground">
                              {getAvatarFallback()}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-[15px] font-[600] text-secondary-900">
                            {getDisplayName()}
                          </span>
                          <Image
                            src={down}
                            className="w-[11px] h-[11px] opacity-60 ml-[-4px]"
                            alt="down-arrow"
                            priority
                          />
                        </div>
                      </PopoverTrigger>
                      <PopoverContent className="flex flex-col p-4 border shadow-sm rounded-3xl mt-3 border-secondary-200">
                        <div className="flex outline-none border-none focus:border-none focus:outline-none flex-col gap-3 items-start">
                          <div className="flex focus:border-none focus:outline-none outline-none mb-[5px] w-full rounded-full mt-1 gap-3 items-center">
                            <Avatar className="cursor-pointer h-[33px] w-[33px] hover:scale-105 duration-300 transition-all outline-none">
                              <AvatarImage
                                src={user?.imageUrl}
                                alt={getDisplayName()}
                              />
                              <AvatarFallback className="bg-muted text-muted-foreground outline-none">
                                {getAvatarFallback()}
                              </AvatarFallback>
                            </Avatar>
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
                    <Button className="flex hover:translate-y-[-2px] duration-300 transition-all select-none items-center gap-2 bg-gradient-to-b from-primary-400 to-primary-500 box-shadow text-white py-[9px] px-[22px] rounded-full font-[400] text-[15px] ml-2">
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
                  <Link
                    href="/dashboard"
                    className="py-[3px] text-[15px] font-[500]"
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="text-primary-500">✶</span> Dashboard
                  </Link>
                  <Link
                    href="/"
                    className="py-[3px] text-[15px] font-[500]"
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="text-primary-500">✶</span> How It Works?
                  </Link>
                  <Link
                    href="/"
                    className="py-[3px] text-[15px] font-[500]"
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="text-primary-500">✶</span> Features
                  </Link>
                  <Link
                    href="/"
                    className="py-[3px] text-[15px] font-[500]"
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="text-primary-500">✶</span> Pricing
                  </Link>
                  <Link
                    href="/"
                    className="py-[3px] text-[15px] font-[500]"
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="text-primary-500">✶</span> FAQ
                  </Link>
                  {!isSignedIn ? (
                    <div>
                      <Button
                        className="bg-primary-500 text-[15px] text-white py-3 rounded-full box-shadow-mobile px-4 gap-3 font-[600]"
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
