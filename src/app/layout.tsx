import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Swachh-Ayush AI Command Center",
  description: "Predict. Prevent. Protect. AI-powered municipal intelligence platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${outfit.variable} antialiased`}>
        <div className="app-container">
          <Sidebar />
          <div className="main-content">
            <Topbar />
            <main className="content-area">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
