import type { Metadata } from "next";
import { GameStateProvider } from "@/hooks/useGameState";
import "./globals.css";

export const metadata: Metadata = {
  title: "Commander Tracker",
  description: "Track life, commander damage, and more for Magic: The Gathering Commander games",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <GameStateProvider>
          {children}
        </GameStateProvider>
      </body>
    </html>
  );
}
