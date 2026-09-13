import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import headerData from "@/data/header.json";

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"]
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600"]
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "600"]
});

export const metadata: Metadata = {
  title: "Sanket Borade — Software Engineer",
  description:
    "Software Engineer focused on building scalable backend systems, distributed services, and reliable cloud-native applications.",
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: "Sanket Borade — Software Engineer",
    description:
      "Software Engineer focused on building scalable backend systems, distributed services, and reliable cloud-native applications.",
    type: "website"
  },
  twitter: {
    card: "summary",
    title: "Sanket Borade — Software Engineer",
    description:
      "Software Engineer focused on building scalable backend systems, distributed services, and reliable cloud-native applications.Software Engineer focused on building scalable backend systems, distributed services, and reliable cloud-native applications."
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${display.variable} ${body.variable} ${mono.variable} font-body antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
