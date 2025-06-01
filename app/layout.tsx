import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";

import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { Navbar } from "@/components/layout/navbar";
import { GlobalBackground } from "@/components/background/global-background";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: "white",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          "min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100 font-sans antialiased",
          fontSans.variable,
        )}
      >
        <Providers>
          <GlobalBackground />
          <div className="relative flex flex-col min-h-screen z-10 pb-16">
            <Navbar />
            <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
              {children}
            </main>
          </div>
          <Footer />
        </Providers>
        <script src="https://code.iconify.design/iconify-icon/2.1.0/iconify-icon.min.js" />
      </body>
    </html>
  );
}
