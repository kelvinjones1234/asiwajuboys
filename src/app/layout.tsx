import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// IMPORT YOUR PROVIDER HERE
import { ToastProvider } from "./context/ToastContext";

const geist = Geist({ subsets: ["latin"] });
const geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Asiwaju Boys Movement",
  description:
    "A nationwide collective of progressive minds and grassroots mobilizers dedicated to advancing the Renewed Hope mandate.",
  // ADD YOUR LOGO METADATA HERE
  icons: {
    icon: "/logo2.jpeg", 
    apple: "/logo2.jpeg",
  },
  openGraph: {
    images: ["/logo2.jpeg"], 
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geist.className} ${geistMono.className}`}>
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}