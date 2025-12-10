import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BodyFlow",
  description: "Seu app fitness inteligente",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>

      
        <div
          id="g_id_onload"
          data-client_id={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
          data-callback="handleGoogleResponse"
          data-auto_select="false"
          style={{ display: "none" }}
        ></div>

        <Script id="google-callback">
          {`
            window.handleGoogleResponse = (response) => {
              window.dispatchEvent(
                new CustomEvent("google-login", { detail: response })
              );
            };
          `}
        </Script>

        {/* 🔹 3. GSI Script */}
        <Script
          src="https://accounts.google.com/gsi/client"
          strategy="afterInteractive"
        />

        {children}
      </body>
    </html>
  );
}
