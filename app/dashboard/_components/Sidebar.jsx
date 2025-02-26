"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  User,
  Video,
  FileQuestion,
  Award,
  Coins,
  MessageSquare,
  Users,
  LogOut,
  PanelLeftClose,
  PanelLeftOpen,
  ChevronDown,
  Bell,
  Settings,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import profile from "../../../public/portraitHr.png";
import { usePathname, useRouter } from "next/navigation";

// Styles remain the same...
const styles = `
.ios-scrollbar::-webkit-scrollbar {
  width: 8px;
  background: transparent;
}

.ios-scrollbar::-webkit-scrollbar-button {
  display: none;
}

.ios-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.ios-scrollbar::-webkit-scrollbar-track-piece {
  background: transparent;
}

.ios-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.2);
  border: 2px solid transparent;
  border-radius: 100vh;
  background-clip: padding-box;
  transition: background-color 0.2s ease;
}

.ios-scrollbar:hover::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.3);
  border: 2px solid transparent;
  background-clip: padding-box;
}

.ios-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.4);
  border: 2px solid transparent;
  background-clip: padding-box;
}

@supports (scrollbar-width: thin) {
  .ios-scrollbar {
    scrollbar-width: thin;
    scrollbar-color: rgba(0, 0, 0, 0.2) transparent;
  }
}

@supports (overflow: overlay) {
  .ios-scrollbar {
    overflow-y: overlay;
  }
}
`;

const MOBILE_BREAKPOINT = 1024;
const TABLET_BREAKPOINT = 768;
const DEFAULT_PATH = "/dashboard/myAccount";

const navigationConfig = {
  quickActions: [
    { icon: <Bell size={18} />, title: "Alerts", path: "/alerts" },
    { icon: <Settings size={18} />, title: "Settings", path: "/settings" },
  ],
  mainMenu: [
    {
      icon: <User size={20} />,
      title: "My Account",
      path: "/dashboard/myAccount",
    },
    {
      icon: <Video size={20} />,
      title: "Interview Simulation",
      path: "/dashboard",
    },
    { icon: <FileQuestion size={20} />, title: "Quiz", path: "/quiz" },
    {
      icon: <Award size={20} />,
      title: "Get Certificate",
      path: "/certificate",
    },
    {
      icon: <Coins size={20} />,
      title: "Buy Coins",
      path: "/dashboard/pricing",
    },
    { icon: <Users size={20} />, title: "HR List", path: "/hr-list" },
  ],
  voiceChat: [
    { title: "Learning English", path: "/voice-chat/english" },
    { title: "HR Training", path: "/voice-chat/hr" },
    { title: "Interview Simulation", path: "/voice-chat/interview" },
    { title: "History", path: "/voice-chat/history" },
  ],
};

const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [isVoiceChatOpen, setIsVoiceChatOpen] = useState(false);

  // Handle initial redirect only once
  useEffect(() => {
    const isFirstVisit = !sessionStorage.getItem("hasVisited");
    if (isFirstVisit && pathname === "/") {
      sessionStorage.setItem("hasVisited", "true");
      router.push(DEFAULT_PATH);
    }
  }, [pathname, router]);

  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);
    return () => styleSheet.remove();
  }, []);

  const handleResize = useCallback(() => {
    if (typeof window !== "undefined") {
      const width = window.innerWidth;
      setIsMobile(width < MOBILE_BREAKPOINT);
      setIsTablet(width >= TABLET_BREAKPOINT && width < MOBILE_BREAKPOINT);
      setIsOpen(width >= MOBILE_BREAKPOINT);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      handleResize();
      let resizeTimer;
      const debouncedResize = () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(handleResize, 100);
      };

      window.addEventListener("resize", debouncedResize);
      return () => {
        window.removeEventListener("resize", debouncedResize);
        clearTimeout(resizeTimer);
      };
    }
  }, [handleResize]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      const sidebar = document.getElementById("sidebar");
      const toggleButton = document.getElementById("sidebar-toggle");

      if (
        isMobile &&
        isOpen &&
        sidebar &&
        !sidebar.contains(event.target) &&
        toggleButton &&
        !toggleButton.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    if (typeof window !== "undefined") {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isMobile, isOpen]);

  const handleMobileClick = () => {
    if (isMobile) {
      setIsOpen(false);
    }
  };

  const isPathActive = (path) => {
    if (path === "/") {
      return pathname === "/";
    }
    return pathname === path;
  };

  return (
    <div className="flex h-[100%] relative bg-gray-50">
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-[3px] z-40 transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div
        id="sidebar"
        className={`fixed left-0 top-0 h-screen ${
          isOpen ? "w-80" : "w-0 lg:w-80"
        } bg-white border-r border-secondary-50 transition-all duration-300 z-50
        ${isMobile && !isOpen ? "-translate-x-full" : "translate-x-0"}
        ${isTablet ? "w-72" : ""}
        overflow-hidden`}
        style={{ height: "100vh" }}
      >
        <div className="h-20 flex items-center px-8 border-b border-gray-100">
          <Link href="/" className="relative w-32 h-8">
            <Image
              src="/logo.svg"
              alt="logo"
              fill
              className="object-contain"
              priority
            />
          </Link>
          {(isMobile || isTablet) && (
            <button
              onClick={() => setIsOpen(false)}
              className="ml-auto p-2 hover:bg-gray-50 rounded-2xl transition-all duration-200 text-gray-500"
            >
              <PanelLeftClose size={20} />
            </button>
          )}
        </div>

        <div className="flex flex-col h-[calc(100vh-5rem)]">
          <div
            className="flex-1 p-6 ios-scrollbar overflow-y-auto"
            style={{
              paddingRight: "12px",
              height: "calc(100vh - 5rem - 96px)", // Subtracting header height and footer height
            }}
          >
            <div className="flex gap-3 mb-8">
              {navigationConfig.quickActions.map((action, index) => (
                <Link
                  key={index}
                  href={action.path}
                  className={`flex-1 flex items-center justify-center gap-2 rounded-2xl py-3 transition-all duration-200 group
                    ${
                      isPathActive(action.path)
                        ? "bg-gradient-to-r from-primary-400 via-primary-500 to-primary-400 text-white"
                        : "bg-gray-50 hover:bg-gray-100 text-gray-700"
                    }`}
                  onClick={handleMobileClick}
                >
                  <span
                    className={
                      isPathActive(action.path)
                        ? "text-white"
                        : "group-hover:text-gray-900"
                    }
                  >
                    {action.icon}
                  </span>
                  <span className="text-sm">{action.title}</span>
                </Link>
              ))}
            </div>

            <div>
              <p className="px-3 mb-3 text-xs font-medium text-gray-400 uppercase tracking-wider">
                Main Menu
              </p>
              <nav className="space-y-1">
                {navigationConfig.mainMenu.map((item) => (
                  <NavItem
                    key={item.path}
                    icon={item.icon}
                    title={item.title}
                    path={item.path}
                    isActive={isPathActive(item.path)}
                    onClick={handleMobileClick}
                  />
                ))}
              </nav>
            </div>

            <div className="mb-8">
              <div className="relative">
                <button
                  onClick={() => setIsVoiceChatOpen(!isVoiceChatOpen)}
                  className={`w-full flex items-center px-4 py-3 rounded-2xl transition-all duration-200
                    ${
                      pathname.startsWith("/voice-chat")
                        ? "bg-gradient-to-r from-primary-400 via-primary-500 to-primary-400 text-white shadow-sm"
                        : "hover:bg-gray-50 text-gray-700"
                    }`}
                >
                  <MessageSquare size={20} />
                  <span className="ml-3 text-sm">AI Voice Chat</span>
                  <ChevronDown
                    size={18}
                    className={`ml-auto transition-transform duration-200 ${
                      isVoiceChatOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isVoiceChatOpen && (
                  <div className="mt-1 ml-8 space-y-1">
                    {navigationConfig.voiceChat.map((option, index) => (
                      <Link
                        key={index}
                        href={option.path}
                        onClick={handleMobileClick}
                        className={`block w-full text-left px-4 py-2.5 text-sm rounded-lg transition-colors duration-200
                          ${
                            isPathActive(option.path)
                              ? "bg-gradient-to-r from-primary-400 via-primary-500 to-primary-400 text-white"
                              : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                          }`}
                      >
                        {option.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white pt-6 px-6 pb-6 border-t border-gray-100">
            <div className="p-4 relative rounded-2xl bg-gray-50 hover:bg-gray-100 transition-all duration-200 group">
              <div className="flex items-center gap-3">
                <div className="relative bg-white rounded-full overflow-hidden flex-shrink-0">
                  <Image
                    src={profile}
                    alt="User Profile"
                    className="w-[45px] relative bottom-[-5px] h-[45px] object-cover rounded-full"
                  />
                </div>
                <div className="absolute bottom-[15px] left-[50px] w-2.5 h-2.5 bg-green-500 rounded-full ring-2 ring-white"></div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    Sophie Stella
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    simmons@gmail.com
                  </p>
                </div>
                <button className="p-2 rounded-2xl text-gray-400 hover:text-gray-600 hover:bg-white/80 transition-colors duration-200">
                  <LogOut size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {(isMobile || isTablet) && !isOpen && (
        <button
          id="sidebar-toggle"
          onClick={() => setIsOpen(true)}
          className="fixed left-6 top-6 z-50 p-2 bg-white rounded-2xl shadow-lg text-gray-700 hover:bg-gray-50 transition-all duration-200"
        >
          <PanelLeftOpen size={22} />
        </button>
      )}

      <div
        className={`flex-1 transition-all duration-300
          ${!isMobile && !isTablet ? "ml-80" : ""}
          ${isTablet && isOpen ? "ml-72" : ""}
        `}
      >
        {" "}
      </div>
    </div>
  );
};

const NavItem = ({ icon, title, path, isActive, onClick }) => (
  <Link
    href={path}
    onClick={onClick}
    className={`w-full flex items-center px-4 py-3 rounded-2xl transition-all duration-200 group
      ${
        isActive
          ? "bg-gradient-to-r from-primary-400 via-primary-500 to-primary-400 text-white shadow-sm"
          : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
      }`}
  >
    <span
      className={`transition-colors ${
        isActive ? "text-white" : "group-hover:text-gray-900"
      }`}
    >
      {icon}
    </span>
    <span className={`ml-3 text-sm ${isActive ? "font-medium" : ""}`}>
      {title}
    </span>
  </Link>
);

export default Sidebar;
