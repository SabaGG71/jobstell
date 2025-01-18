import React from "react";
import DashboardHeader from "../_components/DashboardHeader";

export default function DashboardLayout({ children }) {
  return (
    <div>
      <DashboardHeader />
      {children}
    </div>
  );
}
