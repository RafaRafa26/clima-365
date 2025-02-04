import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { Toaster } from "@/components/ui/toaster";
import type React from "react";
import { ThemeProvider } from "./components/theme-provider";
import { GeolocationProvider } from "./components/geolocation-provider";
import Navbar from "./components/navbar";
import Footer from "./components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ClimaPro",
  description: "Seu companheiro avançado de previsão do tempo",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <GeolocationProvider>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="container mx-auto px-4 py-8 flex-grow">
                {children}
              </main>
              <Footer />
            </div>
          </GeolocationProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
