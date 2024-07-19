import type { Metadata } from "next";
import "./globals.css";
import  Providers  from "./providers";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Eveny",
  description: "Event Management",
};



export default function RootLayout({children}: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
          <Header/>
          {children}
          <Footer/>
          
      </body>
    </html>
  );
}
