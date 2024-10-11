import type { Metadata } from "next";
import "./globals.css";
import { sans } from "./fonts";

export const metadata: Metadata = {
  title: "Render Markdown",
  description: "Renders markdown files passed to the site.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`dark:dark ${sans.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
