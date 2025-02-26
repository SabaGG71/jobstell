import Sidebar from "./_components/Sidebar";
import React from "react";

export default function DashboardLayout({ children }) {
  return (
    <div>
      <Sidebar />
      {children}
    </div>
  );
}
