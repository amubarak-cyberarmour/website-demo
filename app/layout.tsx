import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CyberArmour - AI Security Automation",
  description:
    "Next-generation AI automation systems, workflows, chatbots, analytics, and consulting for modern businesses.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
