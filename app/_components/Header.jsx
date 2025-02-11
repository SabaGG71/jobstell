"use client";

import { memo, useMemo, useCallback, useState } from "react";
import { twMerge } from "tailwind-merge";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useUser, useClerk } from "@clerk/nextjs";
import { Button } from "../../components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/popover";
import logo from "../../public/logo.svg";
import callWhite from "../../public/call-white.svg";
import contactSVG from "../../public/contact-svg.svg";
import signIn from "../../public/sign-in.svg";
import logout from "../../public/logout.svg";
import userSVG from "../../public/userSvg.svg";
import down from "../../public/downArrow.svg";

// Pre-define navigation links outside the component.
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

function Header() {
  // Always call hooks at the top level.
  const { isSignedIn, user, isLoaded } = useUser();
  const { signOut } = useClerk();

  // Memoize display name so it doesn't re-calc on every render.
  const displayName = useMemo(() => {
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
  }, [user]);

  // Memoize avatar fallback.
  const avatarFallback = useMemo(() => {
    if (!user) return "U";
    if (user.firstName) return user.firstName.charAt(0);
    if (user.lastName) return user.lastName.charAt(0);
    if (user.emailAddresses && user.emailAddresses[0]) {
      return user.emailAddresses[0].emailAddress.charAt(0).toUpperCase();
    }
    return "U";
  }, [user]);

  // Manage mobile menu state using useState.
  const [menuOpen, setMenuOpen] = useState(false);

  // Toggle menu handler.
  const toggleMenu = useCallback(() => {
    setMenuOpen((prev) => !prev);
  }, []);

  // Handler to close mobile menu.
  const closeMobileMenu = useCallback(() => {
    setMenuOpen(false);
  }, []);

  // Handler for mobile sign-out.
  const handleMobileSignOut = useCallback(() => {
    closeMobileMenu();
    signOut();
  }, [closeMobileMenu, signOut]);

  // Now conditionally render the loading state,
  // but all hooks have already been called.
  if (!isLoaded) {
    return <LoadingSkeleton />;
  }

  return (
    <header
      className={twMerge(
        "py-[12px] bg-white/65 backdrop-blur px-4 fixed w-full top-0 z-50 transition-all duration-300",
        menuOpen ? "border-none" : "border-b border-[#adadad2c]"
      )}
    >
      <div className="container">
        <div>
          {/* Main Header Content */}
          <div className="flex justify-between py-2 px-3 items-center sm:pr-3">
            {/* Logo */}
            <Link href="/">
              <Image
                quality={100}
                width={125}
                height={125}
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
              {/* Mobile Menu Trigger for Signed In / Not Signed In */}
              {isSignedIn ? (
                <div className="lg:hidden flex items-center gap-2">
                  <Image
                    className="w-[28px] block box-shadow bg-primary-500 pt-[3px] pb-[4px] rounded-full h-[28px]"
                    src={userSVG}
                    alt="user"
                  />
                  <button onClick={toggleMenu} className="focus:outline-none">
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
                      <line x1="3" y1="12" x2="21" y2="12" />
                      <line x1="3" y1="6" x2="21" y2="6" />
                      <line x1="3" y1="18" x2="21" y2="18" />
                    </svg>
                  </button>
                </div>
              ) : (
                <button
                  onClick={toggleMenu}
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
                        menuOpen && "rotate-45 -translate-y-1"
                      )}
                    />
                    <line
                      x1="3"
                      y1="12"
                      x2="21"
                      y2="12"
                      className={twMerge("transition", menuOpen && "opacity-0")}
                    />
                    <line
                      x1="3"
                      y1="18"
                      x2="21"
                      y2="18"
                      className={twMerge(
                        "origin-left transition",
                        menuOpen && "-rotate-45 translate-y-1"
                      )}
                    />
                  </svg>
                </button>
              )}

              {/* Desktop Menu */}
              <div className="lg:flex hidden items-center">
                {/* Contact Button */}
                <span
                  className={twMerge(
                    isSignedIn
                      ? "flex box-shadow-black bg-gradient-to-b from-primary-400 to-primary-500 items-center gap-[11px] hover:bg-primary-700 pr-5 text-white mr-2 py-[6px] hover:-translate-y-[2px] duration-300 transition-all px-4 rounded-full font-[400] text-[15px] cursor-pointer"
                      : "flex box-shadow-black border border-secondary-300 items-center gap-[11px] pr-5 hover:bg-secondary-50 text-secondary-900 py-[5px] px-4 rounded-full font-[400] text-[15px] cursor-pointer hover:translate-y-[-2px] duration-300 transition-all"
                  )}
                >
                  {isSignedIn ? (
                    <Image
                      src={callWhite}
                      className="w-[15px] h-[15px]"
                      alt="callWhite-svg"
                      priority
                    />
                  ) : (
                    <Image
                      src={contactSVG}
                      className="w-[14.5px] h-[14.5px]"
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
                        <div className="flex border border-secondary-200 box-shadow-black hover:bg-secondary-50 duration-300 transition-all h-[35px] pl-[6px] px-4 gap-3 overflow-hidden rounded-full items-center cursor-pointer">
                          <div className="overflow-hidden rounded-full block bg-transparent">
                            <Image
                              className="w-[25px] mt-[2px] block box-shadow-black bg-secondary-700 pt-[3px] pb-[4px] rounded-full h-[25px]"
                              src={userSVG}
                              alt="user"
                            />
                          </div>
                          <span className="text-[15px] font-[600] text-secondary-900">
                            {displayName}
                          </span>
                          <Image
                            src={down}
                            className="w-[12px] ml-[1px] h-[12px] opacity-80"
                            alt="down-arrow"
                            priority
                          />
                        </div>
                      </PopoverTrigger>
                      <PopoverContent className="flex flex-col p-4 border shadow-sm rounded-3xl mt-3 border-secondary-200">
                        <div className="flex flex-col gap-3 items-start">
                          <div className="flex w-full rounded-full mt-1 gap-3 items-center">
                            <Image
                              className="w-[30px] block box-shadow bg-primary-500 pt-[3px] pb-[4px] rounded-full h-[30px]"
                              src={userSVG}
                              alt="user"
                            />
                            <span className="text-[16px] font-[600] text-second">
                              {displayName}
                            </span>
                          </div>
                          <Button
                            variant="outline"
                            onClick={signOut}
                            className="text-[15px] bg-red-500 box-shadow-black text-white hover:bg-red-600 rounded-full w-full"
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
                    <Button className="flex hover:translate-y-[-2px] duration-300 transition-all select-none items-center h-[34px] gap-2 bg-gradient-to-b from-primary-400 to-primary-500 box-shadow text-white px-[20px] rounded-full font-[400] text-[15px] ml-2">
                      <Image
                        width={14}
                        height={14}
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
            {menuOpen && (
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
                      onClick={closeMobileMenu}
                    >
                      <span className="text-primary-500">✶</span> {item.label}
                    </Link>
                  ))}
                  {!isSignedIn ? (
                    <div className="flex items-center justify-center">
                      <Button
                        className="bg-primary-500 flex flex-col text-center text-[15px] justify-center items-center text-white rounded-full box-shadow-mobile px-4 gap-3 font-[600]"
                        onClick={closeMobileMenu}
                      >
                        <Link href="/sign-up">Sign Up</Link>
                      </Button>
                    </div>
                  ) : (
                    <Button
                      variant="outline"
                      onClick={handleMobileSignOut}
                      className="text-[15px] bg-red-500 box-shadow-black text-white hover:bg-red-600 rounded-full w-full"
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

export default memo(Header);
