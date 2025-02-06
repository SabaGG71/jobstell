import React from "react";
import { ChevronDown } from "lucide-react";

export function AccordionIcons() {
  const [openSection, setOpenSection] = React.useState(null);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className="w-[90%]">
      <div className="space-y-2">
        {/* Getting Started Section */}
        <div
          className={`
            border 
            ${
              openSection === "getting-started" ? "rounded-3xl" : "rounded-3xl"
            } 
            overflow-hidden 
            transition-[border-radius] 
            ease-out 
            duration-200
          `}
          onClick={() => toggleSection("getting-started")}
        >
          <div
            className={`
              flex justify-between items-center 
              px-4 py-3 
              cursor-pointer 
              bg-white 
              hover:bg-gray-50 
              transition-colors
            `}
          >
            <span className="font-medium">Personalized Coaching</span>
            <ChevronDown
              className={`
                h-5 w-5 
                transition-transform 
                ease-out 
                duration-200 
                ${openSection === "getting-started" ? "rotate-180" : ""}
              `}
            />
          </div>

          {openSection === "getting-started" && (
            <div className="p-4 bg-gray-50 text-gray-600">
              Receive instant feedback on your responses to improve clarity,
              confidence, and communication skills.
            </div>
          )}
        </div>

        {/* Animation Properties Section */}
        <div
          className={`
            border 
            ${
              openSection === "animation-properties"
                ? "rounded-3xl"
                : "rounded-3xl"
            } 
            overflow-hidden 
            transition-[border-radius] 
            ease-out 
            duration-200
          `}
          onClick={() => toggleSection("animation-properties")}
        >
          <div
            className={`
              flex justify-between items-center 
              px-4 py-3 
              cursor-pointer 
              bg-white 
              hover:bg-gray-50 
              transition-colors
            `}
          >
            <span className="font-medium">Interview Recording History</span>
            <ChevronDown
              className={`
                h-5 w-5 
                transition-transform 
                ease-out 
                duration-200 
                ${openSection === "animation-properties" ? "rotate-180" : ""}
              `}
            />
          </div>

          {openSection === "animation-properties" && (
            <div className="p-4 bg-gray-50 text-gray-600">
              Review past interview sessions with recorded responses and
              AI-generated feedback to track your improvement over time.
            </div>
          )}
        </div>

        {/* Advanced Usage Section */}
        <div
          className={`
            border 
            ${openSection === "advanced-usage" ? "rounded-3xl" : "rounded-3xl"} 
            overflow-hidden 
            transition-[border-radius] 
            ease-out 
            duration-200
          `}
          onClick={() => toggleSection("advanced-usage")}
        >
          <div
            className={`
              flex justify-between items-center 
              px-4 py-3 
              cursor-pointer 
              bg-white 
              hover:bg-gray-50 
              transition-colors
            `}
          >
            <span className="font-medium">HR Role-Playing Mode</span>
            <ChevronDown
              className={`
                h-5 w-5 
                transition-transform 
                ease-out 
                duration-200 
                ${openSection === "advanced-usage" ? "rotate-180" : ""}
              `}
            />
          </div>

          {openSection === "advanced-usage" && (
            <div className="p-4 bg-gray-50 text-gray-600">
              Step into the role of an HR assistant and practice conducting
              interviews with AI-generated candidates, enhancing your hiring and
              evaluation skills.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AccordionIcons;
