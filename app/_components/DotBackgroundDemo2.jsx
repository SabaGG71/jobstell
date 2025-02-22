import React from "react";

export function DotBackgroundDemo2() {
  return (
    <div className="h-[60rem] masky-bg z-[-1] about-mask w-full absolute top-0 left-0 flex overflow-hidden items-center justify-center">
      <div
        className="absolute masky rounded-full top-[-1%] h-[500px] w-full inset-0"
        style={{
          opacity: 0.1,
          borderRadius: "50px",
          backgroundImage: `radial-gradient(#212121 1px, transparent 1px)`,
          backgroundSize: "9px 9px",
          backgroundPosition: "0 0, -5px -5px",
        }}
      />
    </div>
  );
}
