import Navbar from "@/components/Home/Navbar";
import type { Metadata } from "next";
import { Josefin_Sans } from "next/font/google";

import Footer from "@/components/Home/Footer";
import ThemeProvider from "@/components/Home/ThemeProvider";
import { Toaster } from "sonner";
import "./globals.css";

const josefinSans = Josefin_Sans({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Together We Can App",
  description: "This is a social event manager next app",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${josefinSans.className} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <ThemeProvider>
           <Navbar />

          <main className="flex-1">{children}</main>

          <Footer />

          <Toaster position="bottom-right" richColors />
       
        </ThemeProvider>
         
      </body>
    </html>
  );
}
