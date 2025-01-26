import React from "react";

export function DotBackgroundDemo() {
  return (
    <div className="h-[60rem] masky-bg z-[-1] about-mask w-full absolute top-0 left-0 flex items-center justify-center">
      <div
        className="absolute inset-0"
        style={{
          opacity: 0.14,
          borderRadius: "50px",
          backgroundImage: `radial-gradient(#212121 1.5px, transparent 1px), radial-gradient(#212121 1.5px, transparent 1px)`,
          backgroundSize: "30px 30px",
          backgroundPosition: "0 0, 30px 30px",
        }}
      />
    </div>
  );
}
