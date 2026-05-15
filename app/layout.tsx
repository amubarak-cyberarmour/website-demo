import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CyberArmour",
  description:
    "Next-generation AI automation systems, workflows, chatbots, analytics, and consulting for modern businesses.",
  icons: {
    icon: "/cyberarmour-logo-mark.svg",
    shortcut: "/cyberarmour-logo-mark.svg",
    apple: "/cyberarmour-logo-mark.svg",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
