import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Nav } from "@/components/Nav";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// TODO(patricio): confirm final title/description copy.
export const metadata: Metadata = {
  title: "Patricio Barreto",
  description:
    "Software engineer. Sole engineer on Soundboard, a multi-tenant tax and bookkeeping platform, including the AI agents built into it.",
  openGraph: {
    title: "Patricio Barreto",
    description:
      "Software engineer. Sole engineer on Soundboard, a multi-tenant tax and bookkeeping platform, including the AI agents built into it.",
    // TODO(patricio): add public/og.png (1200x630).
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
      suppressHydrationWarning
    >
      <body
        className="min-h-full flex flex-col bg-background text-foreground"
        suppressHydrationWarning
      >
        <Nav />
        {children}
      </body>
    </html>
  );
}
