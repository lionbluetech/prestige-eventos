import type { Metadata } from "next";
import "./globals.css";
import { EventProvider } from "../context/EventContext";

export const metadata: Metadata = {
  title: "Prestige Bar",
  description: "Calculador de barras para eventos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-black">
        <EventProvider>
          {children}
        </EventProvider>
      </body>
    </html>
  );
}