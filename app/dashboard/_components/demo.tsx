import { PricingTable } from "./pricing-table";

const features = [
  { name: "Basic Analytics", planType: "starter", duration: "all" },
  { name: "Up to 5 team members", planType: "starter", duration: "all" },
  { name: "Basic support", planType: "starter", duration: "all" },
  { name: "Advanced Analytics", planType: "pro", duration: "all" },
  { name: "Up to 20 team members", planType: "pro", duration: "all" },
  { name: "Priority support", planType: "pro", duration: "all" },
  { name: "Custom integrations", planType: "all", duration: "all" },
  { name: "Unlimited team members", planType: "all", duration: "all" },
  { name: "24/7 phone support", planType: "all", duration: "all" },
];

const plans = [
  {
    name: "Starter",
    price: { monthly: 15, yearly: 144 },
    level: "starter",
    icon: "/icons/starter-icon.svg", // Add a path to your icon
    description: "Perfect for individuals and small teams getting started.",
  },
  {
    name: "Pro",
    price: { monthly: 49, yearly: 470 },
    level: "pro",
    popular: true,
    icon: "/icons/pro-icon.svg", // Add a path to your icon
    description: "Advanced features for growing businesses and teams.",
  },
  {
    name: "Enterprise",
    price: { monthly: 99, yearly: 990 },
    level: "all",
    icon: "/icons/enterprise-icon.svg", // Add a path to your icon
    description: "Complete solution for large organizations with custom needs.",
  },
];

function PricingTableDemo() {
  return (
    <PricingTable
      features={features}
      plans={plans}
      defaultPlan="pro"
      defaultInterval="monthly"
      onPlanSelect={(plan) => console.log("Selected plan:", plan)}
      containerClassName="py-12"
      buttonClassName="bg-primary hover:bg-primary/90"
    />
  );
}

export { PricingTableDemo };
