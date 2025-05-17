import type { Metadata } from "next";
import "./globals.css";
import { MantineProvider } from "@mantine/core";

export const metadata: Metadata = {
  title: "Multistep Form",
  description: "Multistep Form",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <MantineProvider>
        <body>{children}</body>
      </MantineProvider>
    </html>
  );
}
