import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://dm-insufflaggio.it"),
  title: "DM Insufflaggio - Isolamento termico",
  description:
    "Isolamento termico e acustico professionale in Sardegna. Insufflaggio per case e condomini, sopralluogo gratuito e intervento rapido.",
  openGraph: {
    title: "DM Insufflaggio - Isolamento termico",
    description:
      "Isolamento termico e acustico professionale in Sardegna. Insufflaggio per case e condomini.",
    images: ["/images/logo.png"],
    locale: "it_IT",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="it"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <Script
          src="https://embeds.iubenda.com/widgets/610f2845-18da-4a1a-9639-c9264a1a8fc3.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
