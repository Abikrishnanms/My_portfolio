import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Abikrishnan M S | AI Engineer & Data Analyst Portfolio",
  description: "Personal Portfolio & Personal Brand of Abikrishnan M S - MSc Computer Science (Data Analytics), Python Developer, AI Engineer, and Data Analyst.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
