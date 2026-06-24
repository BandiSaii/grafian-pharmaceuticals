import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Grafian Pharmaceuticals | Premium Pharmaceutical Company in Hyderabad",
  description:
    "Grafian Pharmaceuticals manufactures WHO-GMP and ISO 9001:2015 certified formulations across cardiac care, diabetic care, antibiotics, PPIs, multivitamins and general care. Trusted by doctors, distributors and healthcare professionals across India.",
  keywords: [
    "Grafian Pharmaceuticals",
    "pharmaceutical company Hyderabad",
    "cardiac care medicines",
    "diabetic care medicines",
    "TERYN",
    "ROJUTRI",
    "GUNAA",
    "SIPIN",
    "MONALIN",
    "STROBIC",
    "VITRONURV",
    "WHO-GMP certified pharma",
    "ISO 9001 pharma India",
    "antibiotic manufacturer",
    "PPI manufacturer",
    "multivitamin manufacturer",
    "anti-allergic medicines",
  ],
  authors: [{ name: "Grafian Pharmaceuticals" }],
  creator: "Grafian Pharmaceuticals",
  publisher: "Grafian Pharmaceuticals",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "Grafian Pharmaceuticals | Premium Pharmaceutical Company",
    description:
      "WHO-GMP & ISO 9001:2015 certified pharmaceutical manufacturer. Cardiac, diabetic, antibiotics, PPIs, multivitamins & general care formulations trusted by doctors across India.",
    url: "https://grafianpharma.com",
    siteName: "Grafian Pharmaceuticals",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Grafian Pharmaceuticals",
    description: "Premium pharmaceutical company — committed to quality healthcare.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport = {
  themeColor: "#0c4a6e",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
