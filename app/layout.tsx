import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rash Fit App",
  description: "Personal Gym & VO2 Max Tracker",
  applicationName: "Rash Fit App",
  appleWebApp: {
    capable: true,
    title: "Rash Fit",
    statusBarStyle: "black-translucent",
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#020617",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-[#020617]">
      <body
        className={`${inter.className} bg-slate-950 text-white overscroll-none min-h-[100dvh]`}
      >
        {children}
      </body>
    </html>
  );
}