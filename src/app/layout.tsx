import Navbar from "@/components/Home/Navbar";
import type { Metadata } from "next";
import { Josefin_Sans } from "next/font/google";

import { Toaster } from "sonner";
import "./globals.css";
import Footer from "@/components/Home/Footer";

const josefinSans = Josefin_Sans({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Together We Can App",
  description: " This is a social event manager next app",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${josefinSans.className}  h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Navbar />
        {children}
        <Toaster position="bottom-right" richColors />
        <Footer />
      </body>
    </html>
  );
}
