"use client";

import * as React from "react";
import { Button } from "./button";
import { cn } from "../../../utils/cn";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import coins from "../../../public/coinOrange.svg";
import {
  MicIcon,
  MessageSquareIcon,
  CheckIcon,
  SparklesIcon,
  CoinsIcon,
  CircleDollarSign,
  Banknote,
  Landmark,
  Coins,
} from "lucide-react";
import Image from "next/image";

export type PlanLevel = "interview" | "voice" | string;

export interface PricingFeature {
  name: string;
  duration: string;
  planType: PlanLevel;
}

export interface PricingPlan {
  name: string;
  level: PlanLevel;
  icon: React.ReactNode;
  description: string;
}

export interface PricingTableProps
  extends React.HTMLAttributes<HTMLDivElement> {
  features?: PricingFeature[];
  plans?: PricingPlan[];
  onPlanSelect?: (plan: PlanLevel) => void;
  defaultPlan?: PlanLevel;
  defaultInterval?: "monthly" | "yearly";
  containerClassName?: string;
  buttonClassName?: string;
}

// Plan data with descriptions
const defaultPlans: PricingPlan[] = [
  {
    name: "Interview",
    level: "interview",
    description: "Practice with our AI for job interviews and skill assessment",
    icon: <MessageSquareIcon className="w-5 h-5 text-purple-500" />,
  },
  {
    name: "AI Voice Chat",
    level: "voice",
    description: "Natural voice conversations to improve communication skills",
    icon: <MicIcon className="w-5 h-5 text-purple-500" />,
  },
];

// Features with durations and associated plan type
const defaultFeatures: PricingFeature[] = [
  {
    name: "20 Questions",
    duration: "25 Coins",
    planType: "interview",
  },
  { name: "40 Questions", duration: "50 Coins", planType: "interview" },
  { name: "60 Questions", duration: "70 Coins", planType: "interview" },
  { name: "15 Minutes", duration: "50 Coins", planType: "voice" },
  { name: "30 Minutes", duration: "100 Coins", planType: "voice" },
  { name: "45 Minutes", duration: "140 Coins", planType: "voice" },
];

export function PricingTable({
  features = defaultFeatures,
  plans = defaultPlans,
  onPlanSelect,
  defaultPlan = "interview",
  defaultInterval = "monthly",
  className,
  containerClassName,
  buttonClassName,
  ...props
}: PricingTableProps) {
  const [selectedPlan, setSelectedPlan] =
    React.useState<PlanLevel>(defaultPlan);

  const handlePlanSelect = (plan: PlanLevel) => {
    setSelectedPlan(plan);
    onPlanSelect?.(plan);
  };

  // Filter features by selected plan
  const filteredFeatures = features.filter(
    (feature) => feature.planType === selectedPlan
  );

  return (
    <section
      className={cn(
        "bg-white text-foreground",
        "py-12 sm:py-16 px-4",
        "overflow-hidden",
        className
      )}
    >
      <div
        className={cn("w-full max-w-5xl mx-auto px-4", containerClassName)}
        {...props}
      >
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          {plans.map((plan) => (
            <button
              key={plan.name}
              type="button"
              onClick={() => handlePlanSelect(plan.level)}
              className={cn(
                "flex-1 p-6 rounded-2xl transition-all",
                "border shadow-sm",
                selectedPlan === plan.level
                  ? "border-purple-100 bg-gradient-to-br from-purple-50 to-white shadow-md"
                  : "border-secondary-100 bg-white hover:border-purple-200 hover:shadow-md",
                "group relative overflow-hidden"
              )}
            >
              {selectedPlan === plan.level && (
                <div className="absolute top-0 left-0 w-2 h-full bg-purple-500"></div>
              )}

              <div className="absolute top-4 right-4">
                {selectedPlan === plan.level ? (
                  <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center shadow-md">
                    <CheckIcon className="w-4 h-4 text-white" />
                  </div>
                ) : (
                  <div className="w-6 h-6 rounded-full border-2 border-purple-100 group-hover:border-purple-200"></div>
                )}
              </div>

              <div className="flex flex-col items-start gap-4 mt-2">
                <div
                  className={cn(
                    "w-14 h-14 rounded-full flex items-center justify-center",
                    "transition-colors",
                    selectedPlan === plan.level
                      ? "bg-purple-100 shadow-sm"
                      : "bg-purple-50 group-hover:bg-purple-100/70"
                  )}
                >
                  {plan.icon}
                </div>
                <div className="text-left">
                  <h3 className="text-xl font-semibold text-secondary-800 mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-sm text-secondary-600 leading-relaxed">
                    {plan.description}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="rounded-3xl border border-secondary-50 overflow-hidden bg-white">
          {/* Header */}
          <div className="flex items-center p-6 bg-[#fbfbfb] border-b border-secondary-50">
            <div className="flex-1">
              <h3 className="text-[22px] font-medium text-secondary-800">
                {selectedPlan === "interview"
                  ? "Interview Sessions"
                  : "Voice Chat Sessions"}
              </h3>
              <p className="text-sm text-secondary-500 mt-1">
                Find the Right Interview Package
              </p>
            </div>
            <div className="flex items-center text-sm">
              <div className="w-[100px] text-center font-medium text-white bg-[#ff7328] box-shadow-black py-2 rounded-full flex items-center justify-center gap-1.5">
                <Coins className="w-4 h-4 text-white" />
                <span>Coins</span>
              </div>
            </div>
          </div>

          {/* Features List */}
          <div className="divide-y divide-secondary-50">
            {filteredFeatures.map((feature) => (
              <div
                key={feature.name}
                className="flex items-center justify-between p-6 transition-colors cursor-pointer hover:bg-[#fefefe]"
              >
                <div className="flex-1">
                  <span className="font-[400] text-[16px] text-secondary-800">
                    {feature.name}
                  </span>
                </div>
                <div className="px-3 py-2 flex items-center gap-2 bg-[#f8f8f8] text-secondary-900 border border-secondary-50 font-[600] rounded-full text-base">
                  <Image
                    className="w-[20px] h-[20px]"
                    src={coins}
                    alt="coins"
                  />
                  {feature.duration}
                </div>
              </div>
            ))}
          </div>

          <div className="p-6 bg-[#fbfbfb] border-t border-secondary-50">
            <div className="flex items-center gap-3 text-base text-secondary-600">
              <SparklesIcon className="w-5 h-5 text-primary-500" />
              <span>You can view your purchased coins on the sidebar</span>
            </div>
          </div>
        </div>

        <div className="mt-10 flex justify-center">
          <Button
            className={cn(
              "bg-purple-500 hover:bg-purple-600 transition-all px-8 py-5 rounded-xl text-white font-medium",
              "flex items-center gap-2 text-base",
              buttonClassName
            )}
          >
            Get started with {plans.find((p) => p.level === selectedPlan)?.name}
            <ArrowRightIcon className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}
