import { Geist, Geist_Mono } from "next/font/google";
import "@fontsource/fira-code/latin.css";
import "./globals.css";
import Navigation from "./components/Navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Vehicle Service Management System",
  description: "Complete vehicle service center management solution",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-fira antialiased`}
      >
        <div className="flex min-h-screen">
          <Navigation />
          <main className="flex-1 ml-56 px-8 py-6 min-h-screen bg-gradient-to-br from-blue-100 via-pink-100 to-yellow-100">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
