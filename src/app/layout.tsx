import type { Metadata } from "next";

import { Providers } from "@/providers/providers";

import "./globals.css";

export const metadata: Metadata = {
  title: "Asset Management System",
  description: "Modern operational asset management platform.",
};

const themeBootScript = `
  (() => {
    try {
      const theme = localStorage.getItem("ams-theme");
      const dark = theme === "dark" || (!theme && matchMedia("(prefers-color-scheme: dark)").matches);
      document.documentElement.classList.toggle("dark", dark);
      document.documentElement.dataset.theme = dark ? "dark" : "light";
    } catch {}
  })();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootScript }} />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
