"use client";
import React, { useState, useEffect } from "react";
import { SparklesCore } from "./Sparkles";

export function SparklesPreview() {
  const [isClient, setIsClient] = useState(false);
  const [sparklesKey, setSparklesKey] = useState(0);

  useEffect(() => {
    setIsClient(true);
    const timer = setTimeout(() => {
      setSparklesKey((prev) => prev + 1);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <div className="h-[30rem] spark-mask absolute w-full transparent flex flex-col items-center justify-center overflow-hidden rounded-md">
      <div className="absolute inset-0 h-screen">
        <SparklesCore
          key={sparklesKey}
          id={`tsparticlesfullpage-${sparklesKey}`}
          background="transparent"
          minSize={0.1}
          maxSize={0.1}
          particleDensity={230}
          className="w-full h-full absolute"
          particleColor="#FFFFFF"
          animation={{
            direction: "bottom",
            speed: 1,
            loop: true,
            easing: "linear",
          }}
        />
      </div>
    </div>
  );
}
