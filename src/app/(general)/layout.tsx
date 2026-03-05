import React from "react";
import Navbar from "../components/Navbar";

export default function GeneralLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="general-section-wrapper">
      {/* Example: A header that ONLY shows on /general routes */}
     <Navbar />

      {/* The pages inside the /general folder will be rendered here */}
      <main className="general-content">
        {children}
      </main>
    </div>
  );
}