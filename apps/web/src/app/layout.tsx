// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Eveny",
  description: "Event Management",
};

type LayoutProps = {
  children: ReactNode;
  auth: ReactNode;
};

export default function RootLayout({ children, auth }: LayoutProps) {
  return (
    <html lang="en">
      <body>{auth ||children}</body>
    </html>
  );
}
